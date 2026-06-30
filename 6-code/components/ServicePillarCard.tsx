import type { ServicePillar } from "@/config/services";

type ServicePillarCardProps = {
  pillar: ServicePillar;
};

export function ServicePillarCard({ pillar }: ServicePillarCardProps) {
  return (
    <article
      id={`pillar-${pillar.id}`}
      className="rounded-lg bg-surface p-6 shadow-[0_2px_8px_rgba(27,58,75,0.08)]"
      data-testid={`pillar-${pillar.id}`}
    >
      <h2 className="font-heading text-2xl text-primary">{pillar.title}</h2>
      <p className="mt-4 text-base text-text-muted">{pillar.description}</p>
      <ul className="mt-4 space-y-2 text-base text-text">
        {pillar.offerings.map((offering) => (
          <li key={offering} className="flex gap-2">
            <span aria-hidden="true" className="text-accent">
              •
            </span>
            <span>{offering}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
