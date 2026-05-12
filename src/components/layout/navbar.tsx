"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Box,
  ChevronDown,
  Compass,
  Sparkles,
} from "lucide-react";
import { categoryData } from "@/data/service-categories";
import { blogPosts } from "@/data/blog-posts";

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

type NavbarProps = {
  scrollContainer?: React.RefObject<HTMLElement | null>;
};

export default function Navbar({ scrollContainer }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const [servicesOpen, setServicesOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  // Get featured blog
  const featuredBlog = blogPosts.find((post) => post.featured);

  // SCROLL DETECTION
  useEffect(() => {
    const target = scrollContainer?.current || window;

    const handleScroll = () => {
      const currentScrollY =
        scrollContainer?.current?.scrollTop || window.scrollY;

      // NAVBAR BACKGROUND
      setScrolled(currentScrollY > 20);

      // HIDE / SHOW NAVBAR
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    target.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      target.removeEventListener("scroll", handleScroll);
    };
  }, [scrollContainer]);

  // OUTSIDE CLICK + ESC
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
        setWorkOpen(false);
        setNewsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setWorkOpen(false);
        setNewsOpen(false);
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
        setNewsOpen(false);
      }}
      className={`fixed top-0 left-0 w-full z-[9999] will-change-transform transition-all duration-300 ease-in-out ${
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
              setNewsOpen(false);
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
              setNewsOpen(false);
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

          {/* NEWS & INSIGHTS */}
          <div
            className="relative"
            onMouseEnter={() => {
              setNewsOpen(true);
              setServicesOpen(false);
              setWorkOpen(false);
            }}
          >
            <button
              type="button"
              className="flex cursor-pointer items-center gap-1.5 text-white transition-opacity hover:opacity-80"
              onClick={() => setNewsOpen((open) => !open)}
            >
              News & Insights
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  newsOpen ? "rotate-180" : ""
                }`}
                strokeWidth={2}
              />
            </button>
          </div>

          <Link href="/careers">Careers</Link>

          <Link href="/contact-us">Contact Us</Link>
        </nav>
      </div>

      {/* SERVICES MENU */}
      <div
        id="services-mega-menu"
        className={`absolute left-1/2 top-full hidden w-[min(1110px,calc(100vw-3rem))] -translate-x-1/2 transition-all duration-200 md:block ${
          servicesOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        onMouseEnter={() => {
          setServicesOpen(true);
          setWorkOpen(false);
          setNewsOpen(false);
        }}
      >
        <div className="grid min-h-[320px] grid-cols-[1fr_1.05fr_1.25fr_280px] gap-12 bg-white px-12 py-12 text-[#777b84] shadow-[0_24px_70px_rgba(1,3,11,0.16)]">
          <MegaMenuColumn
            icon={<Box className="h-8 w-8 text-[#FD7624]" strokeWidth={3} />}
            title="Digital Services"
            href="/services/digital-services"
            onTitleClick={() => setServicesOpen(false)}
          >
            {/* FIXED: Changed from servicesData to categoryData to ensure slugs match perfectly! */}
            {categoryData["digital-services"].items.map((item) => (
              <Link
                key={item.slug}
                href={`/services/digital-services#service-${item.slug}`}
                className="block leading-5 transition-colors hover:text-[#0D54CA]"
                onClick={() => setServicesOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </MegaMenuColumn>

          <MegaMenuColumn
            icon={<Compass className="h-8 w-8 text-[#0D54CA]" strokeWidth={3} />}
            title="Digital Solutions"
            href="/services/digital-solutions"
            onTitleClick={() => setServicesOpen(false)}
          >
            {categoryData["digital-solutions"].items.map((item) => (
              <Link
                key={item.slug}
                href={`/services/digital-solutions#service-${item.slug}`}
                className="block leading-5 transition-colors hover:text-[#0D54CA]"
                onClick={() => setServicesOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </MegaMenuColumn>

          <MegaMenuColumn
            icon={<Sparkles className="h-8 w-8 text-[#92D9FF]" strokeWidth={3} />}
            title="Design & 3D Services"
            href="/services/design-and-3d-services"
            onTitleClick={() => setServicesOpen(false)}
          >
            {categoryData["design-and-3d-services"].items.map((item) => (
              <Link
                key={item.slug}
                href={`/services/design-and-3d-services#service-${item.slug}`}
                className="block leading-5 transition-colors hover:text-[#0D54CA]"
                onClick={() => setServicesOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </MegaMenuColumn>

          {/* RIGHT IMAGE */}
          <div className="relative h-full min-h-[320px] overflow-hidden">
            <Image
              src="https://res.cloudinary.com/dku9in8sb/image/upload/v1778480245/Rectangle_34625272_raelut.webp"
              alt="Spherehead digital services workshop"
              fill
              sizes="280px"
              className="object-cover lg:pb-12"
            />
          </div>
        </div>
      </div>

      {/* OUR WORK MENU */}
      <div
        className={`absolute left-1/2 top-full hidden w-[min(900px,calc(100vw-3rem))] -translate-x-1/2 transition-all duration-300 md:block ${
          workOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
        onMouseEnter={() => {
          setWorkOpen(true);
          setServicesOpen(false);
          setNewsOpen(false);
        }}
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

              <span className="body-small text-black">Portfolio</span>
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

              <span className="body-small text-black">Case Studies</span>
            </Link>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative h-[210px] overflow-hidden ">
            <Image
              src="https://res.cloudinary.com/dku9in8sb/image/upload/v1778480700/Rectangle_34625273_tiviz0.webp"
              alt="Portfolio preview"
              fill
              className="lg:pb-8"
            />
          </div>
        </div>
      </div>
      {/* NEWS & INSIGHTS MENU */}
      <div
        className={`absolute left-1/2 top-full hidden w-[min(1020px,calc(100vw-3rem))] -translate-x-1/2 transition-all duration-300 md:block ${
          newsOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        onMouseEnter={() => {
          setNewsOpen(true);
          setServicesOpen(false);
          setWorkOpen(false);
        }}
      >
        <div className="grid grid-cols-[1fr_340px] overflow-hidden rounded-sm bg-[#f3f3f3] shadow-[0_24px_70px_rgba(1,3,11,0.18)]">
          {/* LEFT SIDE */}
          <div className="flex items-start gap-8 px-12 pt-20">
            {/* NEWS */}
            <div>
              <Link href="/news" className="group block">
                {/* TOP */}
                <div className="mb-5 flex items-center gap-4">
                  {/* ICON */}
                  <div className="relative h-[26px] w-[26px]">
                    <div className="absolute bottom-0 left-0 h-[18px] w-[18px] border-b-[4px] border-l-[4px] border-[#0D54CA]" />

                    <div className="absolute left-[14px] top-0 h-[18px] w-[2px] bg-[#0D54CA]" />
                  </div>

                  <h3 className="text-[16px] font-medium text-[#111]">News</h3>
                </div>

                {/* LINE */}
                <div className="h-px w-[130px] bg-[#dbe3ee]" />

                {/* LINKS */}
                <div className="mt-5 space-y-2">
                  <p className="text-[13px] text-[#8d8d8d] transition-colors duration-300 group-hover:text-[#0D54CA]">
                    Latest & Trending News
                  </p>

                  <p className="text-[13px] text-[#8d8d8d] transition-colors duration-300 group-hover:text-[#0D54CA]">
                    All News
                  </p>
                </div>
              </Link>
            </div>

            {/* BLOGS */}
            <div>
              <Link href="/blogs" className="group block">
                {/* TOP */}
                <div className="mb-5 flex items-center gap-4">
                  {/* ICON */}
                  <div className="grid grid-cols-3 gap-[2px]">
                    <div className="h-[4px] w-[4px] bg-[#92D9FF]" />
                    <div className="h-[4px] w-[4px] bg-[#92D9FF]" />
                    <div className="h-[4px] w-[4px] bg-[#92D9FF]" />

                    <div className="h-[4px] w-[4px] bg-[#92D9FF]" />
                    <div className="h-[4px] w-[4px] bg-[#92D9FF]" />
                    <div className="h-[4px] w-[4px] bg-transparent" />

                    <div className="h-[4px] w-[4px] bg-[#92D9FF]" />
                    <div className="h-[4px] w-[4px] bg-transparent" />
                    <div className="h-[4px] w-[4px] bg-transparent" />
                  </div>

                  <h3 className="text-[16px] font-medium text-[#111]">Blogs</h3>
                </div>

                {/* LINE */}
                <div className="h-px w-[130px] bg-[#dbe3ee]" />

                {/* LINKS */}
                <div className="mt-5 space-y-2">
                  <p className="text-[13px] text-[#8d8d8d] transition-colors duration-300 group-hover:text-[#0D54CA]">
                    Featured Blogs
                  </p>

                  <p className="text-[13px] text-[#8d8d8d] transition-colors duration-300 group-hover:text-[#0D54CA]">
                    All Blogs
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE CARD */}
          {featuredBlog && (
            <Link
              href={`/blogs/${featuredBlog.slug}`}
              className="group relative block h-[240px] overflow-hidden"
            >
              <Image
                src={featuredBlog.image}
                alt={featuredBlog.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

              {/* ARROW */}
              <div className="absolute right-5 top-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* TEXT */}
              <div className="absolute bottom-5 left-5 max-w-[280px]">
                <h3 className="text-[17px] font-light leading-[1.45] text-white">
                  {featuredBlog.title}
                </h3>
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

// UPDATE: Added href and onTitleClick props, and wrapped the header in a Link
function MegaMenuColumn({
  icon,
  title,
  href,
  onTitleClick,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  href: string;
  onTitleClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Link 
        href={href} 
        onClick={onTitleClick}
        className="mb-5 flex items-center gap-3 text-[#01030B] transition-colors hover:text-[#0D54CA]"
      >
        {icon}
        <h3 className="text-[16px] font-medium leading-none">{title}</h3>
      </Link>

      <div className="mb-3 h-px w-full bg-[#dbe6f5]" />

      <div className="space-y-2 text-[12px] font-light">{children}</div>
    </div>
  );
}