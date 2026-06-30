import Link from "next/link";

export function NotFoundContent() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="font-heading text-3xl text-primary md:text-5xl">404</p>
      <p className="mt-4 text-base text-text-muted">Страница не найдена</p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md border border-primary px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-text-inverse focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
      >
        На главную
      </Link>
    </div>
  );
}
