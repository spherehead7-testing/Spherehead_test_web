import Head from "next/head";
import ServicesHeroSection from "@/components/services/services-hero-section";
import ServicesIntroSection from "@/components/services/services-intro-section";
import ServicesApproachSection from "@/components/services/services-approach-section";
import ServicesListSection from "@/components/services/services-list-section";
import TechStackCarousel from "@/components/ui/tech-stack-carousel";
import Footer from "@/components/layout/footer";
import { categoryData } from "@/data/service-categories";

export default function ServicesPage() {
  const data = categoryData["digital-services"];

  return (
    <main className="w-full">
      <Head>
        <title>{data.metaTitle} | Spherehead Technologies</title>
      </Head>

      <ServicesHeroSection data={data.hero} />
      <ServicesIntroSection data={data.intro} />
      <ServicesApproachSection />
      <ServicesListSection data={data} />

      <div className="w-full bg-white py-6">
        <TechStackCarousel />
      </div>

      <div className="w-full shrink-0">
        <Footer />
      </div>
    </main>
  );
}
