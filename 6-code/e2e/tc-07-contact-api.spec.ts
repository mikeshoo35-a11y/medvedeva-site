import { expect, test } from "@playwright/test";

function validPayload(overrides: Record<string, unknown> = {}) {
  return {
    name: "Иван Петров",
    email: "ivan@example.com",
    phone: "+7 900 000-00-00",
    message: "Интересует запуск клиники.",
    website: "",
    ...overrides,
  };
}

async function resetTestState(request: import("@playwright/test").APIRequestContext) {
  await request.delete("/api/test/contact");
}

async function getSentNotifications(request: import("@playwright/test").APIRequestContext) {
  const response = await request.get("/api/test/contact");
  expect(response.ok()).toBeTruthy();
  const body = (await response.json()) as {
    notifications: Array<{
      inquiry: {
        name: string;
        email: string;
        phone?: string;
        message: string;
        submittedAt: string;
      };
      to: string;
      subject: string;
      text: string;
    }>;
  };
  return body.notifications;
}

test.describe("TC-07: Contact API, notification, and anti-abuse", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeEach(async ({ request }) => {
    await resetTestState(request);
  });

  test("accepts valid inquiry and notifies owner with EVT-01 fields", async ({ request }) => {
    const response = await request.post("/api/contact", {
      headers: { "x-forwarded-for": "203.0.113.1" },
      data: validPayload(),
    });

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ ok: true });

    const notifications = await getSentNotifications(request);
    expect(notifications).toHaveLength(1);

    const sent = notifications[0]!;
    expect(sent.to).toBe("medvedeva19889@gmail.com");
    expect(sent.inquiry.name).toBe("Иван Петров");
    expect(sent.inquiry.email).toBe("ivan@example.com");
    expect(sent.inquiry.phone).toBe("+7 900 000-00-00");
    expect(sent.inquiry.message).toBe("Интересует запуск клиники.");
    expect(sent.inquiry.submittedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(sent.text).toContain("Иван Петров");
    expect(sent.text).toContain("ivan@example.com");
    expect(sent.text).toContain("+7 900 000-00-00");
    expect(sent.text).toContain("Интересует запуск клиники.");
    expect(sent.text).toContain(sent.inquiry.submittedAt);
  });

  test("accepts inquiry without phone", async ({ request }) => {
    const { phone: _phone, ...withoutPhone } = validPayload();
    const response = await request.post("/api/contact", {
      headers: { "x-forwarded-for": "203.0.113.2" },
      data: withoutPhone,
    });

    expect(response.status()).toBe(200);
    const notifications = await getSentNotifications(request);
    expect(notifications[0]!.inquiry.phone).toBeUndefined();
    expect(notifications[0]!.text).toContain("Телефон: —");
  });

  test("rejects honeypot without sending email", async ({ request }) => {
    const response = await request.post("/api/contact", {
      headers: { "x-forwarded-for": "203.0.113.3" },
      data: validPayload({ website: "https://spam.example" }),
    });

    expect(response.status()).toBe(400);
    const notifications = await getSentNotifications(request);
    expect(notifications).toHaveLength(0);
  });

  test("rate limits repeated submissions from same IP", async ({ request }) => {
    const ip = "203.0.113.50";

    for (let i = 0; i < 5; i++) {
      const response = await request.post("/api/contact", {
        headers: { "x-forwarded-for": ip },
        data: validPayload({ email: `user${i}@example.com` }),
      });
      expect(response.status()).toBe(200);
    }

    const limited = await request.post("/api/contact", {
      headers: { "x-forwarded-for": ip },
      data: validPayload({ email: "overflow@example.com" }),
    });
    expect(limited.status()).toBe(429);

    const notifications = await getSentNotifications(request);
    expect(notifications).toHaveLength(5);
  });
});
