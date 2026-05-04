import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import Footer from "@/components/layout/footer";

// Expanded Mock Data - In a real app, you would fetch this from an API/CMS based on the slug
const CASE_STUDY_DETAILS = [
  {
    slug: "transforming-ecommerce",
    title: "Transforming E-Commerce: From Concept to 300% Growth",
    category: "E-commerce",
    heroImage: "https://res.cloudinary.com/dku9in8sb/image/upload/v1777463708/agri_1_jdpgi6.png",
    overview: "Our client, a growing retail business, needed a comprehensive e-commerce platform to expand their online presence and increase sales. The existing system was outdated, slow, and couldn't handle the growing customer base.\n\nWe developed a modern, scalable e-commerce platform that transformed their business operations and significantly improved their online sales performance.",
    challenges: [
      "Legacy System Limitations - The existing platform was built on outdated technology and couldn't scale with business growth.",
      "Poor User Experience - Slow loading times and confusing navigation were driving customers away.",
      "Inventory Management Issues - Manual processes led to stock discrepancies and order fulfillment delays.",
      "Mobile Responsiveness - The platform wasn't optimized for mobile devices, missing a significant portion of potential customers."
    ],
    architectureImage: "https://res.cloudinary.com/dku9in8sb/image/upload/v1777544551/fruits_4_va0qkf.png",
  },
  {
    slug: "revolutionizing-healthcare",
    title: "Revolutionizing Patient Care Through Integrated Healthcare Systems",
    category: "Healthcare",
    heroImage: "https://res.cloudinary.com/dku9in8sb/image/upload/v1777462586/medi_2_cnmr4x.png",
    overview: "A leading healthcare provider approached us to modernize their patient management system. They needed a comprehensive solution to streamline operations, improve patient care, and ensure compliance with healthcare regulations.\n\nWe developed an integrated healthcare platform that connected all aspects of patient care, from appointment scheduling to medical records and billing.",
    challenges: [
      "Fragmented Systems - Multiple disconnected systems made it difficult to get a complete picture of patient health.",
      "Inefficient Paperwork - Manual processes were time-consuming and prone to errors.",
      "Poor Patient Communication - Lack of automated messaging led to missed appointments and confusion.",
      "Data Security Concerns - Protecting sensitive patient data while meeting HIPAA requirements."
    ],
    architectureImage: "https://res.cloudinary.com/dku9in8sb/image/upload/v1777544551/fruits_4_va0qkf.png",
  },
  {
    slug: "transforming-factory-operations",
    title: "Transforming Factory Operations Through IoT and Analytics",
    category: "Supply Chain",
    heroImage: "https://res.cloudinary.com/dku9in8sb/image/upload/v1777462587/fac_operations_3_k9enyp.png",
    overview: "A leading manufacturing company approached us to transform their factory operations through IoT and analytics. They needed real-time visibility into their production processes to improve efficiency and reduce downtime.\n\nWe implemented a comprehensive IoT platform that connected all factory equipment and provided real-time analytics.",
    challenges: [
      "Lack of Real-Time Visibility - No way to monitor production processes in real-time.",
      "Equipment Downtime - Frequent unplanned downtime was costing significant revenue.",
      "Data Silos - Production data was scattered across different systems.",
      "Predictive Maintenance - Unable to predict when equipment needed maintenance."
    ],
    architectureImage: "https://res.cloudinary.com/dku9in8sb/image/upload/v1777544551/fruits_4_va0qkf.png",
  },
];

export default function CaseStudyDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [activeSection, setActiveSection] = useState("overview");

  // Find the correct case study based on the URL slug
  const study = CASE_STUDY_DETAILS.find((s) => s.slug === slug);

  // Simple scroll spy to highlight the active sidebar link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "challenges", "solution", "implementation"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!study) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{study.title} | Spherehead</title>
      </Head>

      <main className="w-full bg-white min-h-screen font-sans">
        
        {/* 1. BLUE HERO SECTION */}
        <section className="w-full bg-[#0A2F76] pt-32 pb-48 lg:pb-64 px-6 lg:px-16 text-white relative">
          <div className="max-w-[1400px] mx-auto">
            <Link 
              href="/case-studies" 
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors w-fit mb-12"
            >
              <FiArrowLeft /> Back to Case Studies
            </Link>
            
            <h1 className="heading-2 lg:!text-5xl max-w-4xl">
              {study.title}
            </h1>
          </div>
        </section>

        {/* 2. OVERLAPPING HERO IMAGE */}
        <section className="max-w-[1400px] mx-auto px-6 lg:px-16 -mt-32 lg:-mt-48 relative z-10">
          <div className="w-full relative">
            
            {/* Top Right Category Pill */}
            <div className="absolute top-6 right-6 bg-white px-4 py-1.5 text-sm font-semibold text-[#0A2F76] shadow-sm rounded-sm z-20">
              {study.category}
            </div>
            
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={study.heroImage} 
              alt={study.title} 
              className="w-full h-[300px] lg:h-[600px] object-cover shadow-xl rounded-[2xl]"
            />

            <div className="absolute bottom-0 right-0 bg-white pt-6 pl-8 rounded-tl-[2.5rem] z-20">
              <button className="bg-[#0A2F76] text-white px-8 py-3.5 font-medium hover:bg-[#184aa3] transition-colors rounded-sm">
                Contact Us
              </button>
            </div>
            
          </div>
        </section>

        {/* 3. CONTENT GRID (Sticky Sidebar + Text content) */}
        <section className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-24 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            
            {/* LEFT: STICKY SIDEBAR */}
            <div className="hidden lg:block lg:col-span-3 sticky top-32">
              <div className="flex flex-col border-l-2 border-gray-100">
                <SidebarLink href="#overview" label="Project Overview" isActive={activeSection === "overview"} />
                <SidebarLink href="#challenges" label="Challenges" isActive={activeSection === "challenges"} />
                <SidebarLink href="#solution" label="Our Solution" isActive={activeSection === "solution"} />
                <SidebarLink href="#implementation" label="Implementation" isActive={activeSection === "implementation"} />
                <SidebarLink href="#results" label="Results & Impact" isActive={activeSection === "results"} />
              </div>
            </div>

            {/* RIGHT: TEXT CONTENT */}
            <div className="lg:col-span-9 flex flex-col gap-20 text-[#333]">
              
              <div id="overview" className="scroll-mt-32">
                <h3 className="text-2xl font-semibold text-[#0A2F76] mb-6 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#0A2F76] text-white flex items-center justify-center text-xs">1</span>
                  Project Overview
                </h3>
                <p className="whitespace-pre-wrap leading-relaxed text-gray-600">
                  {study.overview}
                </p>
              </div>

              <div id="challenges" className="scroll-mt-32">
                <h3 className="text-2xl font-semibold text-[#0A2F76] mb-6 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#0A2F76] text-white flex items-center justify-center text-xs">2</span>
                  Challenges
                </h3>
                <p className="mb-6 text-gray-600">The project faced several critical challenges:</p>
                <ul className="flex flex-col gap-4">
                  {study.challenges.map((challenge, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <span className="text-[#0A2F76] mt-1">➔</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div id="solution" className="scroll-mt-32">
                <h3 className="text-2xl font-semibold text-[#0A2F76] mb-6 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#0A2F76] text-white flex items-center justify-center text-xs">3</span>
                  Our Solution
                </h3>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={study.architectureImage} alt="Architecture Diagram" className="max-w-2xl w-full mx-auto border border-gray-200 shadow-sm mb-6" />
                <p className="text-gray-600 leading-relaxed">
                  We designed and implemented a comprehensive solution that addressed all the identified challenges using modern architecture and real-time data synchronization.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 4. FOOTER */}
        <div className="bg-[#0A2F76]">
            <Footer />
        </div>

      </main>
    </>
  );
}

// Small helper component for the sidebar links
function SidebarLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  return (
    <a 
      href={href} 
      className={`py-3 pl-6 -ml-[2px] border-l-2 transition-colors duration-300 ${
        isActive 
        ? "border-[#0D54CA] text-[#0D54CA] font-medium" 
        : "border-transparent text-gray-500 hover:text-gray-900"
      }`}
    >
      {label}
    </a>
  );
}