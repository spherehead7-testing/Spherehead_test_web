"use client";

import RotatingDots from "../ui/rotating-dots";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import ContactCard from "@/components/forms/contact-form";
import SiteContainer from "./site-container";

export default function Footer() {
  return (
    <section className="flex items-start">
      <SiteContainer>
      <div className="grid grid-cols-2 gap-10 pt-16 ">
        {/* LEFT SIDE */}
        <div className="text-white flex flex-col justify-between h-[85vh]">
          {/* TOP CONTENT */}
          <div className="mb-5">
            <div className="heading-1">
              <h1>Let’s Build Something</h1>

              <div className="flex items-center gap-2">
                <span>Awesome together</span>

                <div className="translate-x-2 translate-y-2">
                  <RotatingDots />
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div>
            {/* SOCIAL LINKS */}
            <div className="flex gap-6 mt-16 text-[15px] text-white/90">
              <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition">
                <FaInstagram />
              </a>
              <a href="https://twitter.com/yourpage" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition">
                <FaXTwitter />
              </a>
              <a href="https://linkedin.com/company/yourpage" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition">
                <FaLinkedinIn />
              </a>
            </div>

            <p className="text-[8px] opacity-50 mb-2 mt-3">
              Legal Policies / Terms of Services / Privacy Policies
            </p>

            <p className="text-[8px] opacity-50">
              © 2026 All Rights Reserved. Designed and Developed by Spherehead
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex justify-end items-end h-[85vh] mr-10 ml-1">
          {/* THE FIX: Tell the component to use the "card" design instead of "flat" */}
          <ContactCard variant="card" />
        </div>


      </div>
      </SiteContainer>
    </section>
  );
}