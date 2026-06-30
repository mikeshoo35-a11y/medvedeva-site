import type { AudienceSegment, ServicePillar } from "@/config/services";
import { getPillarById } from "@/config/services";

type AudienceSegmentBlockProps = {
  segment: AudienceSegment;
  pillars: ServicePillar[];
};

export function AudienceSegmentBlock({ segment, pillars }: AudienceSegmentBlockProps) {
  const linkedPillars = segment.linkedPillarIds
    .map((id) => getPillarById(pillars, id))
    .filter((pillar): pillar is ServicePillar => pillar !== undefined);

  const isPrimary = segment.prominence === "primary";

  return (
    <article
      className={`rounded-lg border border-accent-muted bg-surface-alt p-6 ${
        isPrimary ? "border-l-4 border-l-accent" : "border-l-2 border-l-accent/60"
      }`}
      data-testid={`segment-${segment.id}`}
      data-prominence={segment.prominence}
    >
      <h2
        className={`font-heading text-primary ${
          isPrimary ? "text-2xl" : "text-xl"
        }`}
      >
        {segment.title}
      </h2>
      <p className="mt-4 text-base text-text">{segment.profile}</p>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-text">Типичные задачи</h3>
        <ul className="mt-2 space-y-2 text-base text-text-muted">
          {segment.painPoints.map((pain) => (
            <li key={pain} className="flex gap-2">
              <span aria-hidden="true">—</span>
              <span>{pain}</span>
            </li>
          ))}
        </ul>
      </div>
      {linkedPillars.length > 0 ? (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-text">Релевантные направления</h3>
          <ul className="mt-2 flex flex-wrap gap-3">
            {linkedPillars.map((pillar) => (
              <li key={pillar.id}>
                <a
                  href={`#pillar-${pillar.id}`}
                  className="text-sm font-medium text-primary underline decoration-accent underline-offset-4 transition-colors hover:text-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                >
                  {pillar.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}
