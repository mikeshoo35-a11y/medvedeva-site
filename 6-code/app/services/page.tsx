import type { Metadata } from "next";
import { AudienceSegmentBlock } from "@/components/AudienceSegmentBlock";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ServicePillarCard } from "@/components/ServicePillarCard";
import { servicesPageContent } from "@/config/services";

export const metadata: Metadata = {
  title: "Услуги",
};

export default function ServicesPage() {
  const primarySegments = servicesPageContent.segments.filter(
    (segment) => segment.prominence === "primary",
  );
  const supportingSegments = servicesPageContent.segments.filter(
    (segment) => segment.prominence === "supporting",
  );

  return (
    <>
      <section aria-labelledby="services-heading" className="pb-8">
        <h1 id="services-heading" className="font-heading text-3xl text-primary">
          {servicesPageContent.pageTitle}
        </h1>
        <p className="mt-6 max-w-prose text-lg text-text-muted">{servicesPageContent.intro}</p>
      </section>

      <section aria-labelledby="pillars-heading" className="pb-12">
        <h2 id="pillars-heading" className="sr-only">
          Направления консалтинга
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {servicesPageContent.pillars.map((pillar) => (
            <ServicePillarCard key={pillar.id} pillar={pillar} />
          ))}
        </div>
      </section>

      <section aria-labelledby="segments-heading" className="space-y-8 pb-12">
        <h2 id="segments-heading" className="sr-only">
          Для кого
        </h2>
        <div
          className="grid gap-8 md:grid-cols-2"
          data-testid="primary-segments-grid"
        >
          {primarySegments.map((segment) => (
            <AudienceSegmentBlock
              key={segment.id}
              segment={segment}
              pillars={servicesPageContent.pillars}
            />
          ))}
        </div>
        {supportingSegments.map((segment) => (
          <AudienceSegmentBlock
            key={segment.id}
            segment={segment}
            pillars={servicesPageContent.pillars}
          />
        ))}
      </section>

      <section aria-labelledby="services-cta-heading" className="pb-8">
        <h2 id="services-cta-heading" className="sr-only">
          Связаться
        </h2>
        <PrimaryButton href={servicesPageContent.ctaContact.path}>
          {servicesPageContent.ctaContact.label}
        </PrimaryButton>
      </section>
    </>
  );
}
