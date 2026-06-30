import type { ContactInquiryInput } from "@/lib/contact/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isHoneypotFilled(website: unknown): boolean {
  return typeof website === "string" && website.trim().length > 0;
}

export function parseContactInquiryInput(
  body: ContactInquiryInput,
): { ok: true; data: { name: string; email: string; phone?: string; message: string } } | { ok: false } {
  if (typeof body.name !== "string" || !body.name.trim()) {
    return { ok: false };
  }

  if (typeof body.email !== "string" || !body.email.trim()) {
    return { ok: false };
  }

  if (!EMAIL_PATTERN.test(body.email.trim())) {
    return { ok: false };
  }

  if (typeof body.message !== "string" || !body.message.trim()) {
    return { ok: false };
  }

  let phone: string | undefined;
  if (body.phone !== undefined && body.phone !== null && body.phone !== "") {
    if (typeof body.phone !== "string") {
      return { ok: false };
    }
    phone = body.phone.trim() || undefined;
  }

  return {
    ok: true,
    data: {
      name: body.name.trim(),
      email: body.email.trim(),
      phone,
      message: body.message.trim(),
    },
  };
}
