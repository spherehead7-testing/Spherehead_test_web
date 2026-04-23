"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`className="w-full z-50" transition-all duration-300 ${
        scrolled
          ? "bg-[#0b2a5b]/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div className="text-white font-semibold text-lg tracking-wide">
          SPHEREHEAD
        </div>

        {/* MENU */}
        <nav className="hidden md:flex items-center gap-8 text-white text-sm">
          <Link href="/about-us">About Us</Link>

          <div className="flex items-center gap-1 cursor-pointer">
            Services
            <span className="text-xs">⌄</span>
          </div>

          <div className="flex items-center gap-1 cursor-pointer">
            Our Work
            <span className="text-xs">⌄</span>
          </div>

          <Link href="#">Pricing</Link>
          <Link href="#">Industries</Link>

          <div className="flex items-center gap-1 cursor-pointer">
            News & Insights
            <span className="text-xs">⌄</span>
          </div>

          <Link href="#">Careers</Link>
          <Link href="#">Contact Us</Link>
        </nav>
      </div>
    </header>
  );
}
