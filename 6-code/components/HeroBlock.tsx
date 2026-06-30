import type { HomePageContent } from "@/config/home";
import { PortraitFrame } from "@/components/PortraitFrame";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";

type HeroBlockProps = {
  content: Pick<
    HomePageContent,
    | "consultantName"
    | "headline"
    | "subhead"
    | "geography"
    | "portraitUrl"
    | "ctaPrimary"
    | "ctaSecondary"
  >;
};

export function HeroBlock({ content }: HeroBlockProps) {
  return (
    <section aria-labelledby="home-headline" className="py-16">
      <div className="grid items-start gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <p className="font-heading text-xl text-primary">{content.consultantName}</p>
          <h1
            id="home-headline"
            className="mt-2 font-heading text-[1.75rem] leading-tight text-primary md:text-4xl"
          >
            {content.headline}
          </h1>
          <p className="mt-4 text-lg text-text-muted">{content.subhead}</p>
          <p className="mt-2 text-base text-text-muted">{content.geography}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <PrimaryButton href={content.ctaPrimary.path}>
              {content.ctaPrimary.label}
            </PrimaryButton>
            {content.ctaSecondary.map((cta) => (
              <SecondaryButton key={cta.path} href={cta.path}>
                {cta.label}
              </SecondaryButton>
            ))}
          </div>
        </div>
        <PortraitFrame
          portraitUrl={content.portraitUrl}
          consultantName={content.consultantName}
          className="md:justify-self-end"
        />
      </div>
    </section>
  );
}
