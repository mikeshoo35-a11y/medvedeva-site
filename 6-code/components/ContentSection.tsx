import type { ReactNode } from "react";

type ContentSectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  variant?: "default" | "alt";
};

export function ContentSection({
  id,
  title,
  children,
  variant = "default",
}: ContentSectionProps) {
  return (
    <section
      aria-labelledby={id}
      className={variant === "alt" ? "bg-surface-alt py-12 md:py-16" : "py-8 md:py-12"}
    >
      <div className={variant === "alt" ? "mx-auto max-w-content px-0" : ""}>
        <h2 id={id} className="font-heading text-3xl text-primary">
          {title}
        </h2>
        <div className="mt-6 max-w-prose break-words text-base leading-relaxed text-text [&_p+p]:mt-4">
          {children}
        </div>
      </div>
    </section>
  );
}
