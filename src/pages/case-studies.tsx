import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Head from "next/head";
import CaseStudiesHero from "@/components/case-studies/case-studies-hero";
import CaseStudiesSlider from "@/components/case-studies/case-studies-slider";
import ClientsSection from "@/components/common-sections/testimonial-section/testimonial-section";
import Footer from "@/components/layout/footer";

// Safely use useLayoutEffect in Next.js without throwing server-side warnings
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function CaseStudies() {
  const scrollRef = useRef<HTMLElement>(null);
  
  // State to control when smooth scrolling is turned on
  const [isSmooth, setIsSmooth] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // 1. Read the saved position
    const savedScrollPos = sessionStorage.getItem("caseStudiesScrollPos");
    
    if (savedScrollPos) {
      // 2. Instantly jump to the saved position BEFORE the browser even paints the screen
      scrollContainer.scrollTop = parseInt(savedScrollPos, 10);
    }

    // 3. Turn smooth scrolling back on AFTER the instant jump is complete
    requestAnimationFrame(() => {
      setIsSmooth(true);
    });

    // 4. Save position whenever the user manually scrolls
    const handleScroll = () => {
      sessionStorage.setItem("caseStudiesScrollPos", scrollContainer.scrollTop.toString());
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Case Studies | Spherehead Technologies</title>
        <meta name="description" content="Explore our success stories." />
      </Head>

      <main 
        ref={scrollRef}
        // FIX: The 'scroll-smooth' class is only added after the initial instant jump
        className={`relative w-full h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory bg-transparent ${
          isSmooth ? "scroll-smooth" : "auto"
        }`}
      >
        
        {/* === THE CURTAIN TRACK === */}
        <div className="relative w-full z-0">
          
          {/* SCROLL ZONE 1: STICKY HERO BACKGROUND */}
          <div className="sticky snap-start top-0 left-0 w-full h-screen z-0">
            <CaseStudiesHero />
          </div>

          {/* SCROLL ZONE 2: THE CURTAIN CARD */}
          <div className="snap-start relative z-10 w-full bg-white rounded-t-xl lg:rounded-t-2xl shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.5)] min-h-screen -mt-32 lg:-mt-48">
            
            <section className="w-full pt-16 lg:pt-20 pb-16">
              <CaseStudiesSlider />
            </section>

            <section className="snap-start w-full flex items-center min-h-screen">
              <ClientsSection />
            </section>
          </div>

        </div> 

        {/* === SCROLL ZONE 3: THE TRANSPARENT FOOTER === */}
        <div className="snap-start relative w-full z-0">
          <Footer />
        </div>

      </main>
    </>
  );
}