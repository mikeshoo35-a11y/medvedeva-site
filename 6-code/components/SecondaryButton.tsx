import Link from "next/link";
import type { ComponentProps } from "react";

type SecondaryButtonProps = ComponentProps<typeof Link>;

export function SecondaryButton({ className = "", children, ...props }: SecondaryButtonProps) {
  return (
    <Link
      className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-primary bg-transparent px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
