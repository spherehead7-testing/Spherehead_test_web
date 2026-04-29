import React, { useEffect } from "react";
import Head from "next/head";

import ContactHero from "@/components/contact-us/contact-hero";
import ContactIntro from "@/components/contact-us/contact-intro";
import ContactImage from "@/components/contact-us/contact-image";
import ContactForm from "@/components/contact-us/contact-form";
import ContactFooter from "@/components/contact-us/contact-footer";

export default function ContactUsPage() {
  useEffect(() => {
    // Enable scroll snapping for full-page sections
    document.documentElement.classList.add("snap-y", "snap-mandatory");
    return () => {
      document.documentElement.classList.remove("snap-y", "snap-mandatory");
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