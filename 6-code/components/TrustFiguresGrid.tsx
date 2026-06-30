import type { TrustFigure } from "@/config/about";

type TrustFiguresGridProps = {
  figures: TrustFigure[];
};

export function TrustFiguresGrid({ figures }: TrustFiguresGridProps) {
  return (
    <section
      aria-labelledby="trust-figures-heading"
      className="bg-surface-alt py-12 md:py-16"
      data-testid="trust-figures-block"
    >
      <h2 id="trust-figures-heading" className="sr-only">
        Ключевые показатели
      </h2>
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
        {figures.map((figure) => (
          <li key={figure.label} className="min-w-0 break-words" data-testid="trust-figure">
            <p className="font-heading text-3xl text-accent">{figure.label}</p>
            <p className="mt-2 text-sm text-text-muted">{figure.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
