import { HeroBlock } from "@/components/HeroBlock";
import { SegmentTeaserPair } from "@/components/SegmentTeaserPair";
import { homePageContent } from "@/config/home";

export default function HomePage() {
  return (
    <>
      <HeroBlock content={homePageContent} />
      <SegmentTeaserPair
        investorTeaser={homePageContent.investorTeaser}
        clinicOwnerTeaser={homePageContent.clinicOwnerTeaser}
      />
    </>
  );
}
