"use client";

import React from "react";
import SiteContainer from "@/components/layout/site-container";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function ContactFooter() {
  return (
    <footer className="w-full bg-transparent text-white pt-0 pb-6 flex flex-col justify-end">
      <SiteContainer>
        
        {/* Bottom Bar: Copyright & Links */}
        <div className="w-full flex flex-col md:flex-row justify-between items-end gap-6 pt-6">
          <p className="body-extra-small text-white">
            © 2026 All Rights Reserved. Designed and Developed by Spherehead
          </p>

          <div className="flex flex-col items-end gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-5 text-white">
              <a href="#" className="hover:opacity-70 transition"><FaFacebookF size={16} /></a>
              <a href="#" className="hover:opacity-70 transition"><FaInstagram size={16} /></a>
              <a href="#" className="hover:opacity-70 transition"><FaXTwitter size={16} /></a>
              <a href="#" className="hover:opacity-70 transition"><FaLinkedinIn size={16} /></a>
            </div>

            {/* Legal Links */}
            <p className="body-extra-small opacity-60 text-white flex gap-2">
              <a href="#" className="hover:opacity-100 transition">Legal Policies</a> /
              <a href="#" className="hover:opacity-100 transition">Terms of Services</a> /
              <a href="#" className="hover:opacity-100 transition">Privacy Policies</a>
            </p>
          </div>
        </div>

      </SiteContainer>
    </footer>
  );
}