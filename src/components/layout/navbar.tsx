"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Handle background color change (turns dark after 20px)
      setScrolled(currentScrollY > 20);

      // Handle hide/show logic based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false); // Scrolling down -> Hide it
      } else {
        setIsVisible(true);  // Scrolling up -> Show it
      }

      // Update the last scroll position
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        // This is the magic line that slides it up and out of view
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        // If you want a transparent glass effect, use this:
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
