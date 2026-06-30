import { emitContactInquirySubmitted } from "@/lib/contact/emit-event";
import { getClientIp } from "@/lib/contact/client-ip";
import { isRateLimited } from "@/lib/contact/rate-limit";
import { sendOwnerNotification } from "@/lib/contact/send-owner-notification";
import type { ContactInquiryInput } from "@/lib/contact/types";
import { isHoneypotFilled, parseContactInquiryInput } from "@/lib/contact/validate";

export async function POST(request: Request) {
  let body: ContactInquiryInput;
  try {
    body = (await request.json()) as ContactInquiryInput;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (isHoneypotFilled(body.website)) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return Response.json({ ok: false }, { status: 429 });
  }

  const parsed = parseContactInquiryInput(body);
  if (!parsed.ok) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const inquiry = {
    ...parsed.data,
    submittedAt: new Date().toISOString(),
  };

  emitContactInquirySubmitted(inquiry);

  try {
    await sendOwnerNotification(inquiry);
  } catch {
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
