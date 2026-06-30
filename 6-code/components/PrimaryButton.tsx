import Link from "next/link";
import type { ComponentProps } from "react";

type PrimaryButtonProps = ComponentProps<typeof Link>;

export function PrimaryButton({ className = "", children, ...props }: PrimaryButtonProps) {
  return (
    <Link
      className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-text-inverse transition-colors hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
