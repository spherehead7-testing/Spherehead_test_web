import Head from "next/head";
import useAutoScroll from "@/hooks/useAutoScroll";
import ServicesHeroSection from "@/components/services/services-hero-section";
import ServicesIntroSection from "@/components/services/services-intro-section";
import ServicesApproachSection from "@/components/services/services-approach-section";
import ServicesListSection from "@/components/services/services-list-section";
import Footer from "@/components/layout/footer";

export default function ServicesPage() {
  useAutoScroll();

  return (
    <>
      <Head>
        <title>Digital Services | Spherehead Technologies</title>
      </Head>

      <ServicesHeroSection />
      <ServicesIntroSection />
      <ServicesApproachSection />
      <ServicesListSection />
      <Footer />
    </>
  );
}