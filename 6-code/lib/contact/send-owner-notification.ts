import { Resend } from "resend";
import { getOwnerNotificationEmail, getResendApiKey, getResendFromEmail } from "@/lib/contact/config";
import type { ContactInquiry } from "@/lib/contact/types";

export type OwnerNotificationRecord = {
  inquiry: ContactInquiry;
  to: string;
  subject: string;
  text: string;
};

const mockSentNotifications: OwnerNotificationRecord[] = [];

export function isMockEmailTransport(): boolean {
  return process.env.CONTACT_EMAIL_TRANSPORT === "mock";
}

export function getMockSentNotifications(): OwnerNotificationRecord[] {
  return [...mockSentNotifications];
}

export function clearMockSentNotifications(): void {
  mockSentNotifications.length = 0;
}

function buildEmailBody(inquiry: ContactInquiry): string {
  const lines = [
    "Новая заявка с сайта",
    "",
    `Имя: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Телефон: ${inquiry.phone ?? "—"}`,
    `Сообщение: ${inquiry.message}`,
    `Отправлено: ${inquiry.submittedAt}`,
  ];

  return lines.join("\n");
}

export async function sendOwnerNotification(inquiry: ContactInquiry): Promise<void> {
  const to = getOwnerNotificationEmail();
  const subject = `Новая заявка: ${inquiry.name}`;
  const text = buildEmailBody(inquiry);

  if (isMockEmailTransport()) {
    mockSentNotifications.push({ inquiry, to, subject, text });
    return;
  }

  const apiKey = getResendApiKey();
  const from = getResendFromEmail();

  if (!apiKey || !from) {
    throw new Error("Resend is not configured");
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject,
    text,
  });

  if (error) {
    throw new Error(error.message);
  }
}
