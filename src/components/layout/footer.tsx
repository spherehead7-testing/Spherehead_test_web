"use client";

import RotatingDots from "../ui/rotating-dots";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import ContactCard from "@/components/forms/contact-form";
import SiteContainer from "./site-container";

export default function Footer() {
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
                <h1 className="whitespace-nowrap">Let’s Build Something</h1>

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
                © 2026 All Rights Reserved. Designed and Developed
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
