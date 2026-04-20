// pages/about-us.tsx

import AboutHero from "@/components/about/about-hero";
import AboutIntro from "@/components/about/about-intro";
import AboutFounder from "@/components/about/about-founder";
import CoreValues from "@/components/about/about-core-values";
import CommunitySection from "@/components/about/about-community";
import TestimonialsSection from "@/components/about/about-testimonial";
import ContactSection from "@/components/about/about-contact";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <AboutFounder />
      <CoreValues />
      <CommunitySection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
