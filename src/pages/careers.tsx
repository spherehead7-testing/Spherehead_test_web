import { useEffect, useRef } from "react";
import { useScrollContainerContext } from "@/context/ScrollContainerContext";
import CareersHero from "@/components/careers/careers-hero";
import OurCulture from "@/components/careers/careers-our-culture";
import StayConnected from "@/components/careers/careers-stay-connected";
import InternshipPrograms from "@/components/careers/careers-internship-programs";
import Footer from "@/components/layout/footer";
import { useIsMobile } from "@/hooks/use-is-mobile";

export default function CareersPage() {
  const isMobile = useIsMobile();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { setScrollContainerRef } = useScrollContainerContext();

  useEffect(() => {
    if (!isMobile) {
      setScrollContainerRef(scrollContainerRef);
    }
    return () => {
      setScrollContainerRef(null);
    };
  }, [scrollContainerRef, setScrollContainerRef, isMobile]);

  if (isMobile) {
    return (
      <main className="w-full overflow-x-hidden">
        <CareersHero />

        <div className="w-full bg-white text-[#01030B] z-10 relative">
          <OurCulture />
        </div>

        <StayConnected />
        <InternshipPrograms />

        <Footer />
      </main>
    );
  }

  return (
    <main
      ref={scrollContainerRef}
      className="w-full h-screen overflow-y-auto"
    >
      <CareersHero />

      <div className="w-full bg-white text-[#01030B] z-10 relative">
        <OurCulture />
      </div>

      <StayConnected />
      <InternshipPrograms />
      <div className="w-full shrink-0 snap-start">
        <Footer />
      </div>
    </main>
  );
}