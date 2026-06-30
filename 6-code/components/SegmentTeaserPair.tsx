import type { SegmentTeaser } from "@/config/home";

type SegmentTeaserPairProps = {
  investorTeaser: SegmentTeaser;
  clinicOwnerTeaser: SegmentTeaser;
};

function SegmentCard({ title, body }: SegmentTeaser) {
  return (
    <article className="rounded-lg border border-accent-muted bg-surface-alt p-6 shadow-[0_2px_8px_rgba(27,58,75,0.08)]">
      <h2 className="font-heading text-2xl text-primary">{title}</h2>
      <p className="mt-4 text-base text-text-muted">{body}</p>
    </article>
  );
}

export function SegmentTeaserPair({
  investorTeaser,
  clinicOwnerTeaser,
}: SegmentTeaserPairProps) {
  return (
    <section aria-labelledby="segment-teasers-heading" className="pb-8">
      <h2 id="segment-teasers-heading" className="sr-only">
        Для кого
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        <SegmentCard {...investorTeaser} />
        <SegmentCard {...clinicOwnerTeaser} />
      </div>
    </section>
  );
}
