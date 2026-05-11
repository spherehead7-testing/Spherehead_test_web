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

interface ServiceCategoryPageProps {
  data: ServiceCategoryData;
}

export default function ServiceCategoryPage({ data }: ServiceCategoryPageProps) {
  const router = useRouter();

  // Custom Magnetic "Fall-in" Scroll Logic with Hash Pause
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    let scrollTimeout: NodeJS.Timeout;
    let isAutoScrolling = false;

    // This temporarily disables the magnetic snap so link-clicks can scroll freely
    const disableMagneticSnapTemporarily = () => {
      isAutoScrolling = true;
      setTimeout(() => {
        isAutoScrolling = false;
      }, 2000); // Pauses magnetism for 2 seconds
    };

    // 1. Pause magnetism if the page first loads with a hash
    if (window.location.hash) {
      disableMagneticSnapTemporarily();
    }

    // 2. Pause magnetism whenever the user clicks a hash link
    router.events.on("hashChangeStart", disableMagneticSnapTemporarily);
    window.addEventListener("hashchange", disableMagneticSnapTemporarily);

    const handleScroll = () => {
      // If we are auto-scrolling to a link, ABORT the magnetic snap!
      if (isAutoScrolling) return;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const sections = document.querySelectorAll("section");
        let closestSection: HTMLElement | null = null;
        let minDistance = Infinity;

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const distanceToTop = Math.abs(rect.top);

          if (distanceToTop < minDistance && distanceToTop < window.innerHeight * 0.35) {
            minDistance = distanceToTop;
            closestSection = section;
          }
        });

        if (closestSection) {
          (closestSection as HTMLElement).scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", disableMagneticSnapTemporarily);
      router.events.off("hashChangeStart", disableMagneticSnapTemporarily);
      clearTimeout(scrollTimeout);
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, [router]);

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

  return {
    props: { data },
  };
};