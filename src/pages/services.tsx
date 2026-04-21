import Head from "next/head";
import useAutoScroll from "@/hooks/useAutoScroll";
import ServicesHeroSection from "@/components/services/services-hero-section";
import ServicesIntroSection from "@/components/services/services-intro-section";
import ServicesApproachSection from "@/components/services/services-approach-section";
import ServicesListSection from "@/components/services/services-list-section";

export default function ServicesPage() {
  useAutoScroll();

  return (
    <>
      <Head>
        <title>Digital Services | Spherehead Technologies</title>
      </Head>

      <div className="site-background-root">
        <div className="site-background-content flex flex-col">
          <ServicesHeroSection />
          <ServicesIntroSection />
          <ServicesApproachSection />
          <ServicesListSection />
        </div>
      </div>
    </>
  );
}