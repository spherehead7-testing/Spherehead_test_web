import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Head from "next/head";
import { useScrollContainerContext } from "@/context/ScrollContainerContext";
import CaseStudiesHero from "@/components/case-studies/case-studies-hero";
import CaseStudiesSlider from "@/components/case-studies/case-studies-slider";
import ClientsSection from "@/components/common-sections/testimonial-section";
import Footer from "@/components/layout/footer";
import { useIsMobile } from "@/hooks/use-is-mobile";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function CaseStudies() {
  const scrollRef = useRef<HTMLElement | null>(null);
  const { setScrollContainerRef } = useScrollContainerContext();
  const isMobile = useIsMobile();

  useEffect(() => {
    setScrollContainerRef(scrollRef);
    return () => {
      setScrollContainerRef(null);
    };
  }, [scrollRef, setScrollContainerRef]);

  const [isSmooth, setIsSmooth] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    if (isMobile) {
      setIsSmooth(false);
      return;
    }

    const savedScrollPos = sessionStorage.getItem("caseStudiesScrollPos");

    if (savedScrollPos) {
      scrollContainer.scrollTop = parseInt(savedScrollPos, 10);
    }

    requestAnimationFrame(() => {
      setIsSmooth(true);
    });

    const handleScroll = () => {
      sessionStorage.setItem(
        "caseStudiesScrollPos",
        scrollContainer.scrollTop.toString(),
      );
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  return (
    <>
      <Head>
        <title>Case Studies | Spherehead Technologies</title>
        <meta name="description" content="Explore our success stories." />
      </Head>

      <main
        ref={scrollRef}
        // Mobile: No snap. Desktop: Snap mandatory.
        className={`relative w-full overflow-x-hidden bg-transparent ${
          isMobile
            ? "h-auto min-h-screen overflow-y-visible snap-none"
            : "h-screen overflow-y-auto snap-y snap-mandatory"
        } ${isMobile ? "auto" : isSmooth ? "scroll-smooth" : "auto"}`}
      >
        <div className={isMobile ? "relative w-full flex flex-col" : "relative w-full z-0"}>
          
          {/* SCROLL ZONE 1: HERO BACKGROUND - Enforces 80svh on mobile */}
          <div
            className={
              isMobile
                ? "relative w-full h-[80svh] z-0"
                : "sticky top-0 left-0 w-full h-screen z-0 lg:snap-start"
            }
          >
            <CaseStudiesHero />
          </div>

          {/* SCROLL ZONE 2: THE CURTAIN CARD SLIDER */}
          <div
            className={`relative z-10 w-full bg-white lg:rounded-t-2xl min-h-screen ${
              isMobile
                ? "rounded-t-[6px] -mt-16 pt-4"
                : "-mt-32 lg:-mt-48 lg:snap-start"
            }`}
          >
            <section className="w-full pt-8 lg:pt-20 pb-8 lg:pb-16">
              <CaseStudiesSlider />
            </section>

            <section className={isMobile ? "w-full" : "snap-start w-full flex items-center min-h-screen lg:min-h-screen"}>
              <div className="w-full min-w-0">
                <div className="lg:-mt-0">
                  <ClientsSection />
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* === SCROLL ZONE 3: THE TRANSPARENT FOOTER === */}
        <div className={isMobile ? "relative w-full bg-transparent z-0" : "snap-start relative w-full z-0"}>
          <Footer />
        </div>
      </main>
    </>
  );
}