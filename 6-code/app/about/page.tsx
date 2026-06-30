import type { Metadata } from "next";
import { AboutPositioning } from "@/components/AboutPositioning";
import { ContentSection } from "@/components/ContentSection";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { TrustFiguresGrid } from "@/components/TrustFiguresGrid";
import { aboutPageContent } from "@/config/about";

export const metadata: Metadata = {
  title: "Обо мне",
};

export default function AboutPage() {
  return (
    <>
      <AboutPositioning content={aboutPageContent} />
      <TrustFiguresGrid figures={aboutPageContent.trustFigures} />
      <ContentSection id="about-background-heading" title={aboutPageContent.backgroundTitle}>
        <p>{aboutPageContent.backgroundNarrative}</p>
      </ContentSection>
      <ContentSection id="about-mission-heading" title={aboutPageContent.missionTitle}>
        <p>{aboutPageContent.missionStatement}</p>
      </ContentSection>
      <ContentSection id="about-geography-heading" title={aboutPageContent.geographyTitle}>
        <p>{aboutPageContent.geography}</p>
      </ContentSection>
      <section aria-labelledby="about-ctas-heading" className="pb-8 pt-4">
        <h2 id="about-ctas-heading" className="sr-only">
          Дальнейшие шаги
        </h2>
        <div className="flex flex-wrap gap-4">
          <SecondaryButton href={aboutPageContent.ctaServices.path}>
            {aboutPageContent.ctaServices.label}
          </SecondaryButton>
          <PrimaryButton href={aboutPageContent.ctaContact.path}>
            {aboutPageContent.ctaContact.label}
          </PrimaryButton>
        </div>
      </section>
    </>
  );
}
