"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, ChevronDown, Compass, Sparkles } from "lucide-react";
import { servicesData } from "@/data/services-list-data";

const digitalSolutions = [
  "Enterprise Resource Planning (ERP)",
  "Smart CRM & POS Solutions",
  "Digital Commerce Solutions",
  "Business Process Outsourcing (BPO) Services",
  "Augmented Reality (AR) Solutions",
  "eLearning Solutions",
  "SEO Optimization",
  "Virtual Reality (VR) Solutions",
];

const designServices = [
  "Free Design Thinking Workshops",
  "UI UX Services",
  "Graphic Design Services",
  "3D Rendering & Post Production",
  "3D Modeling & Texturing",
  "Storyboarding & Concept Development",
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const [servicesOpen, setServicesOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
        setWorkOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setWorkOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      onMouseLeave={() => {
        setServicesOpen(false);
        setWorkOpen(false);
      }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled
          ? "bg-[#0b2a5b]/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      {/* NAVBAR */}
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
        <nav className="body-extra-small hidden md:flex items-center gap-8 text-white">
          <Link href="/">Home</Link>

          <Link href="/about-us">About Us</Link>

          {/* SERVICES */}
          <div
            className="relative"
            onMouseEnter={() => {
              setServicesOpen(true);
              setWorkOpen(false);
            }}
          >
            <button
              type="button"
              className="flex cursor-pointer items-center gap-1.5 text-white transition-opacity hover:opacity-80"
              onClick={() => setServicesOpen((open) => !open)}
            >
              Services
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  servicesOpen ? "rotate-180" : ""
                }`}
                strokeWidth={2}
              />
            </button>
          </div>

          {/* OUR WORK */}
          <div
            className="relative"
            onMouseEnter={() => {
              setWorkOpen(true);
              setServicesOpen(false);
            }}
          >
            <button
              type="button"
              className="flex cursor-pointer items-center gap-1.5 text-white transition-opacity hover:opacity-80"
              onClick={() => setWorkOpen((open) => !open)}
            >
              Our Work
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  workOpen ? "rotate-180" : ""
                }`}
                strokeWidth={2}
              />
            </button>
          </div>

          <Link href="/pricing">Pricing</Link>

          <Link href="/industries">Industries</Link>

          <Link href="/blogs">News & Insights</Link>

          <Link href="/careers">Careers</Link>

          <Link href="/contact-us">Contact Us</Link>
        </nav>
      </div>

      {/* SERVICES MEGA MENU */}
      <div
        id="services-mega-menu"
        className={`absolute left-1/2 top-full hidden w-[min(1110px,calc(100vw-3rem))] -translate-x-1/2 transition-all duration-200 md:block ${
          servicesOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        onMouseEnter={() => setServicesOpen(true)}
      >
        <div className="grid min-h-[320px] grid-cols-[1fr_1.05fr_1.25fr_280px] gap-12 bg-white px-12 py-12 text-[#777b84] shadow-[0_24px_70px_rgba(1,3,11,0.16)]">
          <MegaMenuColumn
            icon={<Box className="h-8 w-8 text-[#FD7624]" strokeWidth={3} />}
            title="Digital Services"
          >
            {servicesData.map((service) => (
              <Link
                key={service.slug}
                href={`/services#service-${service.slug}`}
                className="block leading-5 transition-colors hover:text-[#0D54CA]"
                onClick={() => setServicesOpen(false)}
              >
                {service.title}
              </Link>
            ))}
          </MegaMenuColumn>

          <MegaMenuColumn
            icon={
              <Compass className="h-8 w-8 text-[#0D54CA]" strokeWidth={3} />
            }
            title="Digital Solutions"
          >
            {digitalSolutions.map((item) => (
              <Link
                key={item}
                href="/services"
                className="block leading-5 transition-colors hover:text-[#0D54CA]"
                onClick={() => setServicesOpen(false)}
              >
                {item}
              </Link>
            ))}
          </MegaMenuColumn>

          <MegaMenuColumn
            icon={
              <Sparkles className="h-8 w-8 text-[#92D9FF]" strokeWidth={3} />
            }
            title="Design & 3D Services"
          >
            {designServices.map((item) => (
              <Link
                key={item}
                href="/services"
                className="block leading-5 transition-colors hover:text-[#0D54CA]"
                onClick={() => setServicesOpen(false)}
              >
                {item}
              </Link>
            ))}
          </MegaMenuColumn>

          <div className="relative min-h-[260px] overflow-hidden">
            <Image
              src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776313260/Services_y83dyy.png"
              alt="Spherehead digital services workshop"
              fill
              sizes="280px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* OUR WORK MEGA MENU */}
      <div
        className={`absolute left-1/2 top-full hidden w-[min(900px,calc(100vw-3rem))] -translate-x-1/2 transition-all duration-300 md:block ${
          workOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
        onMouseEnter={() => setWorkOpen(true)}
      >
        <div className="grid grid-cols-[1fr_290px] overflow-hidden rounded-sm bg-[#f5f5f5] shadow-[0_24px_70px_rgba(1,3,11,0.18)]">
          {/* LEFT */}
          <div className="flex items-center gap-16 px-12">
            {/* PORTFOLIO */}
            <Link href="/portfolio" className="group flex items-center gap-4">
              <div className="transition-transform duration-300 group-hover:scale-90">
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                  <path d="M17 0L34 8.5L17 17L0 8.5L17 0Z" fill="#FD7624" />
                  <path d="M17 12L34 20.5L17 29L0 20.5L17 12Z" fill="#FD7624" />
                  <path d="M17 24L34 32.5L17 41L0 32.5L17 24Z" fill="#FD7624" />
                </svg>
              </div>

              <span className="text-[22px] font-light text-[#111]">
                Portfolio
              </span>
            </Link>

            {/* CASE STUDIES */}
            <Link
              href="/case-studies"
              className="group flex items-center gap-4"
            >
              <div className="transition-transform duration-300 group-hover:scale-90">
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                  <rect width="14" height="14" fill="#0D54CA" />
                  <rect x="20" width="14" height="14" fill="#0D54CA" />
                  <rect y="20" width="14" height="14" fill="#0D54CA" />
                  <rect x="20" y="20" width="14" height="14" fill="#0D54CA" />
                </svg>
              </div>

              <span className="text-[22px] font-light text-[#111]">
                Case Studies
              </span>
            </Link>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative h-[210px] overflow-hidden">
            <Image
              src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776313260/Services_y83dyy.png"
              alt="Portfolio preview"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function MegaMenuColumn({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-3 text-[#01030B]">
        {icon}

        <h3 className="text-[16px] font-medium leading-none">{title}</h3>
      </div>

      <div className="mb-3 h-px w-full bg-[#dbe6f5]" />

      <div className="space-y-2 text-[12px] font-light">{children}</div>
    </div>
  );
}
