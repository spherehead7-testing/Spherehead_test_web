import React from "react";  
import CareersHero from "@/components/careers/careers-hero";
import OurCulture from "@/components/careers/our-culture";
import StayConnected from "@/components/careers/stay-connected";
import InternshipPrograms from "@/components/careers/internship-programs";
import Footer from "@/components/layout/footer";
import useAutoScroll from "@/hooks/useAutoScroll"; 


export default function CareersPage() {
  useAutoScroll();
  return (
    <main className="w-full flex flex-col bg-transparent">
      {/* Hero section on the global animated background */}
      <CareersHero />

      {/* White background section */}
      <div className="w-full bg-white text-[#01030B] z-10 relative">
        <OurCulture isAfterHero={true}/>
      </div>

      {/* Transparent background to show global gradient */}
      <StayConnected />
      <InternshipPrograms />
      <Footer />   
    </main>
  );
}