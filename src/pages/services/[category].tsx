import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useEffect } from "react";
import ServicesHeroSection from "@/components/services/services-hero-section";
import ServicesIntroSection from "@/components/services/services-intro-section";
import ServicesApproachSection from "@/components/services/services-approach-section";
import ServicesListSection from "@/components/services/services-list-section";
import Footer from "@/components/layout/footer";
import { categoryData, ServiceCategoryData } from "@/data/service-categories";

interface ServiceCategoryPageProps {
  data: ServiceCategoryData;
}

export default function ServiceCategoryPage({ data }: ServiceCategoryPageProps) {
  useEffect(() => {
    document.documentElement.classList.add("snap-y", "snap-mandatory");
    return () => {
      document.documentElement.classList.remove("snap-y", "snap-mandatory");
    };
  }, []);

  if (!data) return null;

  return (
    <main className="w-full">
      <Head>
        <title>{data.metaTitle} | Spherehead Technologies</title>
      </Head>

      <ServicesHeroSection data={data.hero} />
      <ServicesIntroSection data={data.intro} />
      <ServicesApproachSection />
      <ServicesListSection data={data} />
      
      <div className="w-full shrink-0 snap-start">
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

  return {
    props: { data },
  };
};