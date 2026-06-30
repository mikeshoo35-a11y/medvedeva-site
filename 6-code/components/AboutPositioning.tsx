import type { AboutPageContent } from "@/config/about";
import { PortraitFrame } from "@/components/PortraitFrame";

type AboutPositioningProps = {
  content: Pick<
    AboutPageContent,
    | "consultantName"
    | "positioningHeadline"
    | "positioningSubhead"
    | "specialization"
    | "portraitUrl"
  >;
};

export function AboutPositioning({ content }: AboutPositioningProps) {
  return (
    <section aria-labelledby="about-positioning-heading" className="pb-8">
      <div className="grid items-start gap-8 md:grid-cols-[240px_1fr] md:gap-12">
        <PortraitFrame
          portraitUrl={content.portraitUrl}
          consultantName={content.consultantName}
          className="md:max-w-60"
        />
        <div>
          <p className="font-heading text-xl text-primary">{content.consultantName}</p>
          <h1
            id="about-positioning-heading"
            className="mt-2 break-words font-heading text-3xl text-primary md:text-[2rem]"
          >
            {content.positioningHeadline}
          </h1>
          <p className="mt-4 text-base text-text-muted">{content.positioningSubhead}</p>
          <p className="mt-2 text-base text-text-muted">{content.specialization}</p>
        </div>
      </div>
    </section>
  );
}
