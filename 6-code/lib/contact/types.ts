export type ContactInquiryInput = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  website?: unknown;
};

export type ContactInquiry = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt: string;
};
