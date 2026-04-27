import Footer from "@/components/layout/footer";
import IndustriesHero from "@/components/industries/industries-hero";
import IndustriesIntro from "@/components/industries/industries-intro";
import IndustriesList from "@/components/industries/industries-list";
import DesignStack from "@/components/industries/industries-design-stack";
import TechScrollSection from "@/components/industries/industries-tech-scroll";



export default function IndustriesPage() {
  return (
    <>
      <IndustriesHero />
      <IndustriesIntro />
      <IndustriesList />
      <DesignStack />
      <TechScrollSection />
    </>
  );
}
