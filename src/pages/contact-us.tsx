import React, { useEffect } from "react";
import Head from "next/head";

import ContactHero from "@/components/contact-us/contact-hero";
import ContactIntro from "@/components/contact-us/contact-intro";
import ContactImage from "@/components/contact-us/contact-image";
import ContactForm from "@/components/contact-us/contact-form";
import ContactFooter from "@/components/contact-us/contact-footer";

export default function ContactUsPage() {
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return;

    // Enable scroll snapping for full-page sections on desktop only
    document.documentElement.classList.add("snap-y", "snap-proximity");
    return () => {
      document.documentElement.classList.remove("snap-y", "snap-proximity");
    };
  }, []);

  return (
    <main className="w-full">
      
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