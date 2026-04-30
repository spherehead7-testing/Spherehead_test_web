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

      <main className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory">
        
        <CaseStudiesHero />
        
        {/* THE FIX 1: Reduced padding to pt-12 lg:pt-16 */}
        {/* THE FIX 2: Changed h-screen to min-h-screen and removed overflow-hidden. 
            This allows the section to be taller than the screen, so the user can scroll normally through it! */}
        <section className="snap-start relative z-20 w-full min-h-screen bg-white pt-12 lg:pt-16 pb-16">
          <CaseStudiesSlider />
        </section>

        {/* Testimonials section remains constrained to exactly one screen height */}
        <section className="snap-start relative z-20 w-full h-screen bg-white flex items-center">
          <ClientsSection />
        </section>

        {/* Footer section remains constrained to exactly one screen height */}
        <div className="snap-start relative z-20 w-full h-screen">
          <Footer />
        </div>

      </main>
    </>
  );
}