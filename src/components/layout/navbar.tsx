"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

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
        setIsVisible(true); // Scrolling up -> Show it
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
        <Link href="/" className="flex items-center">
          <Image
            src="https://res.cloudinary.com/dku9in8sb/image/upload/v1778040542/Layer_1_lp72bj.png"
            alt="Spherehead Logo"
            width={140}
            height={40}
            priority
            className="h-auto"
          />
        </Link>

        {/* MENU */}
        <nav className="hidden md:flex items-center gap-8 text-white text-sm">
          <Link href="/">Home</Link>
          <Link href="/about-us">About Us</Link>
          <Link href="/services">Services</Link>
          <Link href="/portfolio">Our Work</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/industries">Industries</Link>
          <Link href="/blogs">News & Insights</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/contact-us">Contact Us</Link>
        </nav>
      </div>
    </header>
  );
}
