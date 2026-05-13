"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Box, ChevronDown, Compass, Sparkles } from "lucide-react";
import { servicesData } from "@/data/services-list-data";
import SiteContainer from "./site-container";

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
    const router = useRouter();

    const observerRef = useRef<IntersectionObserver | null>(null);
    const scrollHandlerRef = useRef<(() => void) | null>(null);

    // Re-run on route changes to handle sentinel presence per page
    useEffect(() => {
        // Clean up any previous observer
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }
        // Clean up any previous scroll listener
        if (scrollHandlerRef.current) {
            window.removeEventListener("scroll", scrollHandlerRef.current);
            scrollHandlerRef.current = null;
        }

        // Small delay to let the new page render its DOM (including sentinel)
        const timer = setTimeout(() => {
            const sentinel = document.getElementById("navbar-sentinel");

            if (sentinel) {
                // Home page: observe sentinel to show navbar only in hero section
                const scrollContainer = sentinel.closest("main");

                const observer = new IntersectionObserver(
                    ([entry]) => {
                        setIsVisible(entry.isIntersecting);
                        setScrolled(
                            !entry.isIntersecting ||
                                entry.intersectionRatio < 0.95,
                        );
                    },
                    {
                        root: scrollContainer || null,
                        threshold: [0, 0.1, 0.5, 0.95, 1],
                    },
                );

                observer.observe(sentinel);
                observerRef.current = observer;
            } else {
                setIsVisible(true);
                setScrolled(false);

                const handleScroll = () => {
                    const currentScrollY = window.scrollY;
                    const vh = window.innerHeight;
                    setIsVisible(currentScrollY < vh * 0.5);
                    setScrolled(currentScrollY > 20);
                };

                handleScroll();

                window.addEventListener("scroll", handleScroll, {
                    passive: true,
                });
                scrollHandlerRef.current = handleScroll;
            }
        }, 50);

        return () => {
            clearTimeout(timer);
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }
            if (scrollHandlerRef.current) {
                window.removeEventListener("scroll", scrollHandlerRef.current);
                scrollHandlerRef.current = null;
            }
        };
    }, [router.asPath]);

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
            <SiteContainer
                className={`transition-all duration-300 flex items-center justify-between ${scrolled ? "py-4" : "py-8"}`}
            >
                {/* LOGO */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="https://res.cloudinary.com/dku9in8sb/image/upload/v1778040542/Layer_1_lp72bj.png"
                        alt="Spherehead Logo"
                        width={180}
                        height={50}
                        priority
                        className="h-auto"
                    />
                </Link>

                {/* MENU */}
                <nav className="body-small !text-[15px] font-medium hidden md:flex items-center gap-10 text-white">
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
                                className={`h-4 w-4 transition-transform duration-200 ${
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
                                className={`h-4 w-4 transition-transform duration-200 ${
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
            </SiteContainer>

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
                        icon={
                            <Box
                                className="h-8 w-8 text-[#FD7624]"
                                strokeWidth={3}
                            />
                        }
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
                            <Compass
                                className="h-8 w-8 text-[#0D54CA]"
                                strokeWidth={3}
                            />
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
                            <Sparkles
                                className="h-8 w-8 text-[#92D9FF]"
                                strokeWidth={3}
                            />
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
                        <Link
                            href="/portfolio"
                            className="group flex items-center gap-4"
                        >
                            <div className="transition-transform duration-300 group-hover:scale-90">
                                <svg
                                    width="34"
                                    height="34"
                                    viewBox="0 0 34 34"
                                    fill="none"
                                >
                                    <path
                                        d="M17 0L34 8.5L17 17L0 8.5L17 0Z"
                                        fill="#FD7624"
                                    />
                                    <path
                                        d="M17 12L34 20.5L17 29L0 20.5L17 12Z"
                                        fill="#FD7624"
                                    />
                                    <path
                                        d="M17 24L34 32.5L17 41L0 32.5L17 24Z"
                                        fill="#FD7624"
                                    />
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
                                <svg
                                    width="34"
                                    height="34"
                                    viewBox="0 0 34 34"
                                    fill="none"
                                >
                                    <rect
                                        width="14"
                                        height="14"
                                        fill="#0D54CA"
                                    />
                                    <rect
                                        x="20"
                                        width="14"
                                        height="14"
                                        fill="#0D54CA"
                                    />
                                    <rect
                                        y="20"
                                        width="14"
                                        height="14"
                                        fill="#0D54CA"
                                    />
                                    <rect
                                        x="20"
                                        y="20"
                                        width="14"
                                        height="14"
                                        fill="#0D54CA"
                                    />
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

// UPDATE: Added href and onTitleClick props, and wrapped the header in a Link
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

                <h3 className="text-[16px] font-medium leading-none">
                    {title}
                </h3>
            </div>

            <div className="mb-3 h-px w-full bg-[#dbe6f5]" />

            <div className="space-y-2 text-[14px] font-light">{children}</div>
        </div>
    );
}
