import { useEffect, useRef } from "react";

type FormStatusMessageProps = {
  variant: "success" | "error";
  message: string;
};

export function FormStatusMessage({ variant, message }: FormStatusMessageProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const isSuccess = variant === "success";

  return (
    <p
      ref={ref}
      tabIndex={-1}
      role={isSuccess ? "status" : "alert"}
      data-testid={`form-status-${variant}`}
      className={`rounded-md px-4 py-4 text-base ${
        isSuccess
          ? "bg-[#ecfdf3] text-success"
          : "border border-error/20 bg-surface text-error"
      }`}
    >
      {message}
    </p>
  );
}
