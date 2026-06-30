import { expect, test } from "@playwright/test";

test.describe("TC-06: Contact form UI and client validation", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("renders intro, labels, and shell", async ({ page }) => {
    await page.goto("/contact");

    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Контакты", level: 1 })).toBeVisible();
    await expect(page.getByText(/заявку на консультацию/i)).toBeVisible();
    await expect(page.getByText(/инвесторов/i)).toBeVisible();
    await expect(page.getByText(/владельцев клиник/i)).toBeVisible();
    await expect(page.getByText(/ведущих врачей/i)).toBeVisible();

    await expect(page.getByLabel("Имя *")).toBeVisible();
    await expect(page.getByLabel("Email *")).toBeVisible();
    await expect(page.getByLabel("Телефон")).toBeVisible();
    await expect(page.getByLabel("Сообщение *")).toBeVisible();
    await expect(page.getByRole("button", { name: "Отправить" })).toBeVisible();
  });

  test("blocks empty submit and names required fields", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Отправить" }).click();

    await expect(page.getByText("Укажите имя")).toBeVisible();
    await expect(page.getByText("Укажите email")).toBeVisible();
    await expect(page.getByText("Укажите сообщение")).toBeVisible();
    await expect(page.getByTestId("form-status-success")).toHaveCount(0);
  });

  test("shows email validation error without submitting", async ({ page }) => {
    let apiCalled = false;
    await page.route("**/api/contact", async (route) => {
      apiCalled = true;
      await route.fulfill({ status: 200, body: "{}" });
    });

    await page.goto("/contact");
    await page.getByLabel("Имя *").fill("Иван");
    await page.getByLabel("Email *").fill("not-an-email");
    await page.getByLabel("Сообщение *").fill("Тестовое сообщение");
    await page.getByRole("button", { name: "Отправить" }).click();

    await expect(page.getByText("Укажите корректный email")).toBeVisible();
    await expect(page.getByTestId("form-status-success")).toHaveCount(0);
    expect(apiCalled).toBe(false);
  });

  test("shows success message on mocked API success", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto("/contact");
    await page.getByLabel("Имя *").fill("Иван Петров");
    await page.getByLabel("Email *").fill("ivan@example.com");
    await page.getByLabel("Телефон").fill("+7 900 000-00-00");
    await page.getByLabel("Сообщение *").fill("Интересует запуск клиники.");
    await page.getByRole("button", { name: "Отправить" }).click();

    await expect(page.getByTestId("form-status-success")).toBeVisible();
    await expect(page.getByText(/заявка отправлена/i)).toBeVisible();
    await expect(page.getByTestId("contact-form")).toHaveCount(0);
  });

  test("shows error and preserves field values on API failure", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "internal_server_error" }),
      });
    });

    await page.goto("/contact");
    await page.getByLabel("Имя *").fill("Мария");
    await page.getByLabel("Email *").fill("maria@example.com");
    await page.getByLabel("Телефон").fill("+7 901 111-22-33");
    await page.getByLabel("Сообщение *").fill("Нужна консультация по аудиту.");
    await page.getByRole("button", { name: "Отправить" }).click();

    await expect(page.getByTestId("form-status-error")).toBeVisible();
    await expect(page.getByText(/не удалось отправить заявку/i)).toBeVisible();
    await expect(page.getByLabel("Имя *")).toHaveValue("Мария");
    await expect(page.getByLabel("Email *")).toHaveValue("maria@example.com");
    await expect(page.getByLabel("Телефон")).toHaveValue("+7 901 111-22-33");
    await expect(page.getByLabel("Сообщение *")).toHaveValue("Нужна консультация по аудиту.");
  });
});
