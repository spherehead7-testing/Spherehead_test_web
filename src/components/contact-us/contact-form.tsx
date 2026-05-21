"use client";

import React from "react";
import SiteContainer from "@/components/layout/site-container";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import ContactCard from "@/components/forms/contact-form";

export default function ContactForm() {
  return (
    <section id="contact-form" className="w-full relative z-10 pt-8 lg:pt-12 pb-0 snap-start">
      {/* White background - covers form and map area on mobile */}
      <div className="lg:hidden absolute inset-x-0 top-0 -z-10 bg-white" style={{ bottom: "18%" }} />
      {/* Desktop white backgrounds */}
      <div className="hidden lg:flex absolute inset-0 -z-10 flex-row">
        <div className="w-1/2 h-[95%] bg-white rounded-b-[4px]" />
        <div className="w-1/2 h-[400px] bg-white rounded-br-[4px]" />
      </div>

      <SiteContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-24 items-start">
          {/* LEFT: Form Side */}
          <div className="flex flex-col gap-8 w-full max-w-lg pb-4 lg:pb-24 pt-10 lg:pt-24">
            <ContactCard variant="flat" />
          </div>

          {/* RIGHT: Map & Contact Info Side */}
          <div className="flex flex-col w-full">
            <div className="w-full h-[250px] lg:h-[300px] relative overflow-hidden bg-gray-100 rounded-sm mt-6 mb-6 lg:mt-0 lg:mb-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2831.870750612708!2d-106.94455072383755!3d44.78344027860213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5335f0099be92b1f%3A0x27e6c8e7587a9694!2s1309%20Coffeen%20Ave%20STE%201200%2C%20Sheridan%2C%20WY%2082801%2C%20USA!5e0!3m2!1sen!2slk!4v1778755740481!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 outline-none"
              />
            </div>

            <div className="flex flex-col gap-5 text-white lg:pl-4 pt-10 lg:pt-24 pb-8 lg:pb-0">
              <div className="flex items-center gap-4">
                <FiMapPin className="w-5 h-5 shrink-0" />
                <p className="body-small tracking-wide">
                  1309 Coffeen Avenue STE 1200 Sheridan, Wyoming 82801
                </p>
              </div>
              <div className="flex items-center gap-4">
                <FiPhone className="w-5 h-5 shrink-0" />
                <p className="body-small tracking-wide">
                  +94 76 666 6688
                </p>
              </div>
              <div className="flex items-center gap-4">
                <FiMail className="w-5 h-5 shrink-0" />
                <p className="body-small tracking-wide">
                  info@Spherehead.tech
                </p>
              </div>
            </div>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
