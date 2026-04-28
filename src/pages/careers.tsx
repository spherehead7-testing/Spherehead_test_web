import React from "react";  
import CareersHero from "@/components/careers/careers-hero";
import OurCulture from "@/components/careers/careers-our-culture";
import StayConnected from "@/components/careers/careers-stay-connected";
import InternshipPrograms from "@/components/careers/careers-internship-programs";
import Footer from "@/components/layout/footer";
// import useAutoScroll from "@/hooks/useAutoScroll"; 

export default function CareersPage() {
  // useAutoScroll();
  return (
    // <main className="w-full flex flex-col bg-transparent">
      <main className="w-full snap-y snap-mandatory h-screen overflow-y-auto">
      {/* Hero section on the global animated background */}
      <CareersHero />

      {/* White background section */}
      <div className="w-full bg-white text-[#01030B] z-10 relative">
        <OurCulture/>
      </div>

      {/* Transparent background to show global gradient */}
      <StayConnected />
      <InternshipPrograms />
      <div className="w-full shrink-0 snap-start">
        <Footer />
      </div> 
    </main>
  );
}