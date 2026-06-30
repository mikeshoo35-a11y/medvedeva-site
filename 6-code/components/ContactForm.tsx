"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import type { ContactPageContent } from "@/config/contact";
import { FormField } from "@/components/FormField";
import { FormStatusMessage } from "@/components/FormStatusMessage";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
  website: string;
};

type FieldErrors = Partial<Record<keyof Omit<FormValues, "website">, string>>;

type SubmitState = "idle" | "loading" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
  website: "",
};

type ContactFormProps = {
  content: ContactPageContent;
};

export function ContactForm({ content }: ContactFormProps) {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));

    if (name !== "website" && fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors((current) => {
        const next = { ...current };
        delete next[name as keyof FieldErrors];
        return next;
      });
    }
  }

  function validate(): FieldErrors {
    const errors: FieldErrors = {};

    if (!values.name.trim()) {
      errors.name = content.validation.nameRequired;
    }

    if (!values.email.trim()) {
      errors.email = content.validation.emailRequired;
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      errors.email = content.validation.emailInvalid;
    }

    if (!values.message.trim()) {
      errors.message = content.validation.messageRequired;
    }

    return errors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errors = validate();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setSubmitState("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim() || undefined,
          message: values.message.trim(),
          website: values.website,
        }),
      });

      if (!response.ok) {
        setSubmitState("error");
        return;
      }

      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    return (
      <FormStatusMessage variant="success" message={content.successMessage} />
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="space-y-6"
      data-testid="contact-form"
    >
      {submitState === "error" ? (
        <FormStatusMessage variant="error" message={content.errorMessage} />
      ) : null}

      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={handleChange}
        />
      </div>

      <FormField
        id="contact-name"
        name="name"
        label={content.fieldLabels.name}
        value={values.name}
        onChange={handleChange}
        error={fieldErrors.name}
        required
      />
      <FormField
        id="contact-email"
        name="email"
        type="email"
        label={content.fieldLabels.email}
        value={values.email}
        onChange={handleChange}
        error={fieldErrors.email}
        required
      />
      <FormField
        id="contact-phone"
        name="phone"
        type="tel"
        label={content.fieldLabels.phone}
        value={values.phone}
        onChange={handleChange}
      />
      <FormField
        id="contact-message"
        name="message"
        label={content.fieldLabels.message}
        value={values.message}
        onChange={handleChange}
        error={fieldErrors.message}
        required
        multiline
      />

      <button
        type="submit"
        disabled={submitState === "loading"}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-text-inverse transition-colors hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
      >
        {submitState === "loading" ? "Отправка…" : content.submitLabel}
      </button>
    </form>
  );
}
