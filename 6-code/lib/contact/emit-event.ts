import type { ContactInquiry } from "@/lib/contact/types";

export function emitContactInquirySubmitted(inquiry: ContactInquiry): void {
  console.info(
    JSON.stringify({
      event: "EVT-01",
      payload: inquiry,
    }),
  );
}
