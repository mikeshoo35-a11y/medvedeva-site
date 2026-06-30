import type { ChangeEvent } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  type?: "text" | "email" | "tel";
  multiline?: boolean;
};

export function FormField({
  id,
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  type = "text",
  multiline = false,
}: FormFieldProps) {
  const describedBy = error ? `${id}-error` : undefined;
  const inputClassName = `w-full rounded-sm border bg-surface px-3 py-3 font-body text-base text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring ${
    error ? "border-error" : "border-border"
  }`;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-text">
        {label}
        {required ? " *" : ""}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          aria-required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          rows={5}
          className={`${inputClassName} min-h-32 resize-y`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          aria-required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={inputClassName}
        />
      )}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
