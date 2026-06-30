export const DEFAULT_OWNER_NOTIFICATION_EMAIL = "medvedeva19889@gmail.com";

export const RATE_LIMIT_MAX_REQUESTS = 5;
export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

export function getOwnerNotificationEmail(): string {
  return process.env.OWNER_NOTIFICATION_EMAIL ?? DEFAULT_OWNER_NOTIFICATION_EMAIL;
}

export function getResendApiKey(): string | undefined {
  return process.env.RESEND_API_KEY;
}

export function getResendFromEmail(): string | undefined {
  return process.env.RESEND_FROM_EMAIL;
}
