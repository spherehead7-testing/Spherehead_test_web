import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import ServicesHeroSection from "@/components/services/services-hero-section";
import ServicesIntroSection from "@/components/services/services-intro-section";
import ServicesApproachSection from "@/components/services/services-approach-section";
import ServicesListSection from "@/components/services/services-list-section";
import Footer from "@/components/layout/footer";
import { categoryData, ServiceCategoryData } from "@/data/service-categories";
import TechStackCarousel from "@/components/ui/tech-stack-carousel";

interface ServiceCategoryPageProps {
  data: ServiceCategoryData;
}

export default function ServiceCategoryPage({ data }: ServiceCategoryPageProps) {
  if (!data) return null;

  return (
    <main className="w-full overflow-clip">
      <Head>
        <title>{data.metaTitle} | Spherehead Technologies</title>
      </Head>

      <div className="relative w-full">
        <ServicesHeroSection data={data.hero} />
        <ServicesIntroSection data={data.intro} />
      </div>

      <ServicesApproachSection />
      <ServicesListSection data={data} />

      <div className="hidden md:block w-full bg-white pb-15 z-50 rounded-b-[12px]">
        <TechStackCarousel />
      </div>

      <div className="w-full shrink-0">
        <Footer />
      </div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(categoryData).map((key) => ({
    params: { category: key },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category as string;
  const data = categoryData[category];
  return { props: { data } };
};
