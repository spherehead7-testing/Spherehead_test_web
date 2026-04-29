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

      <main>
          <CaseStudiesHero />
        <div className="relative z-20 w-full flex flex-col">
          <section className="bg-white pt-16 lg:pt-24">
            <CaseStudiesSlider />
          </section>
          <ClientsSection />
          <Footer />
        </div>
      </main>
    </>
  );
}
