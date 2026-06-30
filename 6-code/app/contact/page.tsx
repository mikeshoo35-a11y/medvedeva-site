import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { contactPageContent } from "@/config/contact";

export const metadata: Metadata = {
  title: contactPageContent.title,
};

export default function ContactPage() {
  return (
    <section aria-labelledby="contact-heading" className="max-w-prose">
      <h1 id="contact-heading" className="font-heading text-3xl text-primary">
        {contactPageContent.title}
      </h1>
      <p className="mt-4 text-lg text-text-muted">{contactPageContent.intro}</p>
      <div className="relative mt-8">
        <ContactForm content={contactPageContent} />
      </div>
    </section>
  );
}
