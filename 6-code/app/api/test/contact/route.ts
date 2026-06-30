import { clearMockSentNotifications, isMockEmailTransport } from "@/lib/contact/send-owner-notification";
import { resetRateLimitStore } from "@/lib/contact/rate-limit";

export async function DELETE() {
  if (!isMockEmailTransport()) {
    return new Response(null, { status: 404 });
  }

  clearMockSentNotifications();
  resetRateLimitStore();
  return Response.json({ ok: true });
}

export async function GET() {
  if (!isMockEmailTransport()) {
    return new Response(null, { status: 404 });
  }

  const { getMockSentNotifications } = await import("@/lib/contact/send-owner-notification");
  return Response.json({ notifications: getMockSentNotifications() });
}
