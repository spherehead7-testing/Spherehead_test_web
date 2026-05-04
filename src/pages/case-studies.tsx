import React from "react";
import Head from "next/head";
import CaseStudiesHero from "@/components/case-studies/case-studies-hero";
import CaseStudiesSlider from "@/components/case-studies/case-studies-slider";
import ClientsSection from "@/components/common-sections/testimonial-section/testimonial-section";
import Footer from "@/components/layout/footer";

export default function CaseStudies() {
  return (
    <>
      <Head>
        <title>Case Studies | Spherehead Technologies</title>
        <meta name="description" content="Explore our success stories." />
      </Head>

      <main className="relative w-full h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth">
        
        {/* === SCROLL ZONE 1: STICKY HERO === */}
        <div className="snap-start relative w-full">
          <div className="sticky top-0 left-0 w-full h-screen z-0 overflow-hidden">
            <CaseStudiesHero />
          </div>

          {/* === SCROLL ZONE 2: THE GIANT WHITE CARD === */}
          {/* Card is pulled up using negative margins (-mt-32 mobile, -mt-48 desktop) */}
          <div className="relative z-10 w-full bg-white rounded-t-xl lg:rounded-t-2xl shadow-[0_-15px_40px_-10px_rgba(0,0,0,0.3)] -mt-32 lg:-mt-48">
            
            <section className="w-full pt-16 lg:pt-20 pb-16">
              <CaseStudiesSlider />
            </section>

            {/* Testimonials section snaps into place but is NOT sticky. 
                It simply acts as the second half of the white card. */}
            <section className="snap-start w-full flex items-center min-h-screen">
              <ClientsSection />
            </section>

          </div>
        </div> 

        {/* === SCROLL ZONE 3: THE TRANSPARENT FOOTER === */}
        {/* Because the white card scrolls completely out of the way, 
            this Footer is 100% transparent and perfectly shows your global background! */}
        <div className="snap-start relative w-full z-0">
          <Footer />
        </div>

      </main>
    </>
  );
}