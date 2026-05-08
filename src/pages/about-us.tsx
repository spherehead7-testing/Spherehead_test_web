// pages/about-us.tsx

import AboutHero from "@/components/about/about-hero";
import AboutIntro from "@/components/about/about-intro";
import AboutFounder from "@/components/about/about-founder";
import CoreValues from "@/components/about/about-core-values";
import CommunitySection from "@/components/about/about-community";
import Footer from "@/components/layout/footer";


export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <AboutFounder />
      <CoreValues />
      <CommunitySection />
      <Footer />
    </>
  );
}
