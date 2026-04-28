"use client";

import React from "react";
import SiteContainer from "@/components/layout/site-container";

export default function ContactForm() {
  return (
    <section className="w-full bg-white pt-20 lg:pt-32 pb-24 snap-start">
      <SiteContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Form Side */}
          <div className="flex flex-col gap-8 w-full max-w-lg">
            <form className="flex flex-col gap-6 w-full">
              <input 
                type="text" 
                placeholder="Name" 
                className="body-small w-full border-b border-[#E5E5E5] py-4 text-[#01030B] placeholder-[#808080] focus:outline-none focus:border-[#0D54CA] bg-transparent transition-colors" 
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="body-small w-full border-b border-[#E5E5E5] py-4 text-[#01030B] placeholder-[#808080] focus:outline-none focus:border-[#0D54CA] bg-transparent transition-colors" 
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                className="body-small w-full border-b border-[#E5E5E5] py-4 text-[#01030B] placeholder-[#808080] focus:outline-none focus:border-[#0D54CA] bg-transparent transition-colors" 
              />
              <textarea 
                placeholder="Message" 
                rows={3} 
                className="body-small w-full border-b border-[#E5E5E5] py-4 text-[#01030B] placeholder-[#808080] focus:outline-none focus:border-[#0D54CA] bg-transparent resize-none transition-colors" 
              />
              <button 
                type="submit" 
                className="inter-tight bg-[#0D54CA] text-white py-3 px-10 w-fit mt-6 rounded-[4px] hover:bg-[#0B46A8] transition-colors"
              >
                Submit
              </button>
            </form>
          </div>

          {/* THE FIX: Replaced the static Image with the interactive Google Maps iframe */}
          <div className="w-full aspect-[4/3] relative overflow-hidden bg-gray-100 rounded-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2831.8709373844777!2d-106.94455072369597!3d44.78343647107091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5335f0099be92b1f%3A0x27e6c8e7587a9694!2s1309%20Coffeen%20Ave%20STE%201200%2C%20Sheridan%2C%20WY%2082801%2C%20USA!5e0!3m2!1sen!2slk!4v1777367971333!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </div>

        </div>
      </SiteContainer>
    </section>
  );
}