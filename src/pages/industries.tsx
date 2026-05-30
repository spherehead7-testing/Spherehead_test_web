import IndustriesHero from "@/components/industries/industries-hero";
import IndustriesIntro from "@/components/industries/industries-intro";
import IndustriesList from "@/components/industries/industries-list";
import DesignStack from "@/components/industries/industries-design-stack";
import TechScrollSection from "@/components/industries/industries-advanced-technologies";
import Footer from "@/components/layout/footer";
import { useIsMobile } from "@/hooks/use-is-mobile";

export default function IndustriesPage() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <main className="w-full overflow-x-hidden">
        <IndustriesHero />
        <IndustriesIntro />
        <IndustriesList />
        <DesignStack />
        <TechScrollSection />
        <Footer />
      </main>
    );
  }

  return (
    <main className="w-full">
      <IndustriesHero />
      <IndustriesIntro />
      <IndustriesList />
      <DesignStack />
      <TechScrollSection />
      <Footer />
    </main>
  );
}