import React, { useRef, useEffect } from "react";
import Head from "next/head";
import { useScrollContainerContext } from "@/context/ScrollContainerContext";

import ContactHero from "@/components/contact-us/contact-hero";
import ContactIntro from "@/components/contact-us/contact-intro";
import ContactImage from "@/components/contact-us/contact-image";
import ContactForm from "@/components/contact-us/contact-form";
import ContactFooter from "@/components/contact-us/contact-footer";

export default function ContactUsPage() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { setScrollContainerRef } = useScrollContainerContext();

  useEffect(() => {
    setScrollContainerRef(scrollContainerRef);
    return () => {
      setScrollContainerRef(null);
    };
  }, [scrollContainerRef, setScrollContainerRef]);

  return (
    <main 
      ref={scrollContainerRef}
      // Added snap-y and snap-mandatory here instead of document.documentElement
      className="relative w-full h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
    >
      {/* Page SEO title */}
      <Head>
        <title>Contact Us | Spherehead Technologies</title>
      </Head>

      <ContactHero />
      <ContactIntro />
      <ContactImage />

      <section className="w-full snap-start">
        <ContactForm />
      </section>

      <section className="w-full snap-start">
        <ContactFooter />
      </section>
    </main>
  );
}