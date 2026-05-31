"use client";

import RotatingDots from "../ui/rotating-dots";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import ContactCard from "@/components/forms/contact-form";
import SiteContainer from "./site-container";
import { useIsMobile } from "@/hooks/use-is-mobile";

export default function Footer() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <section id="site-footer" className="relative z-10">
        <SiteContainer>
          {/* Heading */}
          <div className="text-white pt-12 pb-10">
            <h1
              className="heading-1"
            >
              Let&apos;s Build
              <br />
              Something
              <br />
              Awesome together
            </h1>
          </div>
        </SiteContainer>

        {/* Form card */}
        <div className="relative">
          <div className="w-full rounded-[5px] overflow-hidden">
            <ContactCard variant="card" />
          </div>
        </div>

        {/* Social + Legal */}
        <SiteContainer>
          <div className="text-white body-small pt-10 pb-8">
            <div className="flex gap-6">
              <FaFacebook className="hover:opacity-70 transition cursor-pointer" size={22} />
              <FaInstagram className="hover:opacity-70 transition cursor-pointer" size={22} />
              <FaXTwitter className="hover:opacity-70 transition cursor-pointer" size={22} />
              <FaLinkedin className="hover:opacity-70 transition cursor-pointer" size={22} />
            </div>

            <p className="mt-5 mb-4">
              Legal Policies / Terms of Services / Privacy Policies
            </p>

            <p>
              &copy; 2026 All Rights Reserved. Designed and Developed by Spherehead
            </p>
          </div>
        </SiteContainer>
      </section>
    );
  }

  return (
    <section id="site-footer" className="min-h-screen relative z-10">
      <SiteContainer>
        <div className="grid lg:grid-cols-2 gap-10 pt-16 min-h-screen">
          {/* LEFT SIDE */}
          <div className="text-white flex flex-col justify-between">
            {/* TOP CONTENT */}
            <div className="mb-5">
              <div className="heading-1">
                {/* LINE 1 */}
                <h1 className="whitespace-nowrap">Let's Build Something</h1>

                {/* LINE 2 */}
                <h1 className="flex items-center gap-6 whitespace-nowrap">
                  Awesome together
                  <div className="scale-170 relative top-[4px]">
                    <RotatingDots />
                  </div>
                </h1>
              </div>
            </div>

            {/* BOTTOM */}
            <div className="body-small lg:pb-[52px]">
              {/* SOCIAL LINKS */}
              <div className="flex gap-6 mt-16">
                <FaFacebook className="hover:opacity-70 transition cursor-pointer" size={24} />
                <FaInstagram className="hover:opacity-70 transition cursor-pointer" size={24} />
                <FaXTwitter className="hover:opacity-70 transition cursor-pointer" size={24} />
                <FaLinkedin className="hover:opacity-70 transition cursor-pointer" size={24} />
              </div>

              <p className="mb-5 mt-5">
                Legal Policies / Terms of Services / Privacy Policies
              </p>

              <p>
                &copy; 2026 All Rights Reserved. Designed and Developed
                <br />by Spherehead
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex justify-end items-end">
            {/* FORCE WIDTH OVERRIDE */}
            <div className="w-full lg:w-[600px] lg:-ml-20 [&>form]:max-w-none lg:mt-50">
              <ContactCard variant="card" />
            </div>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
