import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
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
  const router = useRouter();

  useEffect(() => {
    const html = document.documentElement;

    const enableSnap = () => html.classList.add("snap-y", "snap-proximity");
    const disableSnap = () => html.classList.remove("snap-y", "snap-proximity");

    // 1. Initially enable snapping and smooth scrolling
    enableSnap();
    html.style.scrollBehavior = "smooth";

    // 2. Temporarily disable CSS snapping when clicking a link
    const pauseSnapping = () => {
      disableSnap();

      setTimeout(() => {
        enableSnap();
      }, 1500);
    };

    if (window.location.hash) {
      pauseSnapping();
    }

    router.events.on("hashChangeStart", pauseSnapping);
    window.addEventListener("hashchange", pauseSnapping);

    return () => {
      disableSnap();
      html.style.scrollBehavior = "auto";
      router.events.off("hashChangeStart", pauseSnapping);
      window.removeEventListener("hashchange", pauseSnapping);
    };
  }, [router]);

  if (!data) return null;

  return (
    <main className="w-full">
      <Head>
        <title>{data.metaTitle} | Spherehead Technologies</title>
      </Head>

      <div className="relative w-full">
        <ServicesHeroSection data={data.hero} />
        <ServicesIntroSection data={data.intro} />
      </div>

      <ServicesApproachSection />
      <ServicesListSection data={data} />

      <div className="w-full snap-start bg-white py-6 z-50">
        <TechStackCarousel />
      </div>

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