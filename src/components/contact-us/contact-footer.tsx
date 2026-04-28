import React from "react";
import SiteContainer from "@/components/layout/site-container";

export default function ContactFooter() {
  return (
    <footer className="w-full bg-[#184aa3] text-white pt-16 pb-8 flex flex-col">
      <SiteContainer>
        
        {/* Contact Info Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 body-small font-light">
          <div className="flex items-start gap-4">
            <span className="text-xl">📍</span>
            <p>1234 Delaware Avenue, STE 5600<br />Wilmington, DE 19801</p>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-xl">📞</span>
            <p>+1 302 555 0123</p>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-xl">✉️</span>
            <p>info@spherehead.com</p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Links */}
        <div className="w-full border-t border-white/20 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6 body-Extrasmall text-white/80">
          <p>© 2026 All Rights Reserved. Designed and Developed by Spherehead.</p>
          
          <div className="flex items-center gap-6">
             <a href="#" className="hover:text-white transition-colors">Legal Notice</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
             <a href="#" className="hover:text-white transition-colors">Privacy Policies</a>
             
             {/* Social Mockup */}
             <div className="flex gap-4 ml-4 text-white">
               <span className="cursor-pointer hover:opacity-80 transition-opacity">FB</span>
               <span className="cursor-pointer hover:opacity-80 transition-opacity">IG</span>
               <span className="cursor-pointer hover:opacity-80 transition-opacity">X</span>
             </div>
          </div>
        </div>

      </SiteContainer>
    </footer>
  );
}