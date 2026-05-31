"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import Footer from "@/components/layout/footer";
import RotatingDots from "@/components/ui/rotating-dots";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { motion, useScroll, useTransform } from "framer-motion";

const CASE_STUDY_DETAILS = [
  {
    slug: "transforming-ecommerce",
    title: "Transforming E-Commerce: From Concept to 300% Growth",
    category: "E-commerce",
    heroImage:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1777463708/agri_1_jdpgi6.png",
    overview:
      "Our client, a growing retail business, needed a comprehensive e-commerce platform to expand their online presence and increase sales. The existing system was outdated, slow, and couldn't handle the growing customer base.\nWe developed a modern, scalable e-commerce platform that transformed their business operations and significantly improved their online sales performance.",
    challenges: [
      "Legacy System Limitations - The existing platform was built on outdated technology and couldn't scale with business growth.",
      "Poor User Experience - Slow loading times and confusing navigation were driving customers away.",
      "Inventory Management Issues - Manual processes led to stock discrepancies and order fulfillment delays.",
      "Mobile Responsiveness - The platform wasn't optimized for mobile devices, missing a significant portion of potential customers.",
    ],
    architectureImage:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1777544551/fruits_4_va0qkf.png",
    solutionIntro:
      "We designed and implemented a comprehensive e-commerce solution that addressed all the identified challenges.",
    solutionPoints: [
      "Modern Architecture - Built using React.js and Node.js for optimal performance and scalability. The platform can handle thousands of concurrent users without performance degradation.",
      "Enhanced User Experience - Implemented intuitive navigation, fast loading times, and responsive design that works seamlessly across all devices.",
      "Automated Inventory Management - Integrated real-time inventory tracking with automated reorder points and stock level alerts.",
    ],
    implementationIntro:
      "The project was executed in agile sprints over a 16-week timeline, ensuring continuous feedback and iterative improvements.",
    implementationPoints: [
      "Phase 1: Discovery & UI/UX Design - 3 weeks of wireframing and prototyping.",
      "Phase 2: Core Backend Development - Setting up microservices and database schemas.",
      "Phase 3: Frontend Integration & Testing - Connecting the React front-end with secure APIs.",
      "Phase 4: Deployment & Training - Seamless migration from the legacy system with zero downtime.",
    ],
    resultsIntro:
      "The new platform delivered immediate and measurable business value.",
    resultsPoints: [
      "Achieved a 300% increase in online sales within the first quarter.",
      "Reduced page load times by 75%, significantly decreasing bounce rates.",
      "Automated inventory management saved the team over 40 hours of manual work per week.",
    ],
    technologies: ["React.js", "Node.js", "MongoDB", "Redis", "AWS", "Docker"],
    conclusion:
      "By modernizing their technology stack and focusing on user experience, the client successfully transitioned from a struggling legacy system to an industry-leading e-commerce platform, setting the foundation for years of scalable growth.",
  },
  {
    slug: "revolutionizing-healthcare",
    title: "Revolutionizing Patient Care Through Integrated Healthcare Systems",
    category: "Healthcare",
    heroImage:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1777462586/medi_2_cnmr4x.png",
    overview:
      "A leading healthcare provider approached us to modernize their patient management system. They needed a comprehensive solution to streamline operations, improve patient care, and ensure compliance with healthcare regulations.\n\nWe developed an integrated healthcare platform that connected all aspects of patient care, from appointment scheduling to medical records and billing.",
    challenges: [
      "Fragmented Systems - Multiple disconnected systems made it difficult to get a complete picture of patient health.",
      "Inefficient Paperwork - Manual processes were time-consuming and prone to errors.",
      "Poor Patient Communication - Lack of automated messaging led to missed appointments and confusion.",
      "Data Security Concerns - Protecting sensitive patient data while meeting HIPAA requirements.",
    ],
    architectureImage:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1777544551/fruits_4_va0qkf.png",
    solutionIntro:
      "We designed and implemented a comprehensive healthcare solution that addressed all the identified challenges.",
    solutionPoints: [
      "Unified Health Records - Consolidated all patient data into a single, secure, and easily accessible digital platform.",
      "Automated Workflows - Streamlined administrative tasks, reducing paperwork and minimizing human error.",
      "Patient Portal - Developed an intuitive app for patients to book appointments, view records, and message doctors securely.",
    ],
    implementationIntro:
      "Security and compliance were our top priorities during the rollout of the unified platform.",
    implementationPoints: [
      "Conducted a comprehensive security audit of existing infrastructure.",
      "Developed a custom data migration script to securely transfer legacy patient records.",
      "Implemented role-based access control (RBAC) across all hospital departments.",
    ],
    resultsIntro:
      "The integrated system drastically improved both administrative efficiency and patient satisfaction.",
    resultsPoints: [
      "Reduced patient wait times by an average of 35%.",
      "Decreased no-show appointments by 50% through automated SMS reminders.",
      "Achieved 100% HIPAA compliance during the latest external audit.",
    ],
    technologies: ["Angular", "Spring Boot", "PostgreSQL", "Kafka", "OAuth2"],
    conclusion:
      "The digital transformation of this healthcare provider not only optimized their internal workflows but significantly enhanced the quality of care delivered to patients.",
  },
  {
    slug: "transforming-factory-operations",
    title: "Transforming Factory Operations Through IoT and Analytics",
    category: "Supply Chain",
    heroImage:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1777462587/fac_operations_3_k9enyp.png",
    overview:
      "A leading manufacturing company approached us to transform their factory operations through IoT and analytics. They needed real-time visibility into their production processes to improve efficiency and reduce downtime.\n\nWe implemented a comprehensive IoT platform that connected all factory equipment and provided real-time analytics.",
    challenges: [
      "Lack of Real-Time Visibility - No way to monitor production processes in real-time.",
      "Equipment Downtime - Frequent unplanned downtime was costing significant revenue.",
      "Data Silos - Production data was scattered across different systems.",
      "Predictive Maintenance - Unable to predict when equipment needed maintenance.",
    ],
    architectureImage:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1777544551/fruits_4_va0qkf.png",
    solutionIntro:
      "We designed and implemented a comprehensive IoT solution that addressed all the identified challenges.",
    solutionPoints: [
      "Real-time Dashboards - Created dynamic visualizations for floor managers to monitor equipment health continuously.",
      "Predictive Analytics - Deployed machine learning models to identify maintenance needs before machinery failures occurred.",
      "System Integration - Connected legacy factory software into a unified central command center.",
    ],
    implementationIntro:
      "Deploying hardware and software simultaneously required precise coordination with the factory floor managers.",
    implementationPoints: [
      "Installed customized IoT sensors on 50+ legacy manufacturing machines.",
      "Built a secure edge-computing network to process raw sensor data locally to reduce latency.",
      "Developed customized analytics dashboards tailored to different management tiers.",
    ],
    resultsIntro:
      "The introduction of predictive analytics transformed the factory from a reactive environment to a proactive one.",
    resultsPoints: [
      "Reduced unplanned equipment downtime by 40%.",
      "Increased overall equipment effectiveness (OEE) by 15%.",
      "Saved an estimated $1.2M annually in maintenance and lost production costs.",
    ],
    technologies: [
      "Vue.js",
      "Python",
      "TensorFlow",
      "AWS IoT Core",
      "Time-Series Databases",
    ],
    conclusion:
      "By bridging the gap between physical machinery and digital analytics, the manufacturing plant now operates with unprecedented efficiency and foresight, proving the immense value of Industry 4.0 integrations.",
  },
];

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function CaseStudyDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [activeSection, setActiveSection] = useState("overview");
  const [isExiting, setIsExiting] = useState(false);

  const { scrollY } = useScroll();
  const isMobile = useIsMobile();

  const blueBarY = useTransform(scrollY, [0, 300], [0, isMobile ? 0 : -400]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "overview",
        "challenges",
        "solution",
        "implementation",
        "results",
        "technologies",
        "conclusion",
      ];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
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

  const studyIndex = CASE_STUDY_DETAILS.findIndex((s) => s.slug === slug);
  const study = CASE_STUDY_DETAILS[studyIndex];

  useEffect(() => {
    if (studyIndex >= 0) {
      sessionStorage.setItem("spherehead_slider_page", studyIndex.toString());
    }
  }, [studyIndex]);

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isExiting) return;
    setIsExiting(true);

    if (studyIndex >= 0) {
      sessionStorage.setItem("spherehead_slider_page", studyIndex.toString());
    }

    // Go immediately back so layout transition fires instantly
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/case-studies");
    }
  };

  if (!study) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="heading-2 text-[#0A2F76]">Case Study Not Found</h1>
        <Link href="/case-studies" className="text-[#0D54CA] hover:underline">
          Return to Case Studies
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{study.title} | Spherehead</title>
      </Head>

      <main className="w-full bg-white min-h-screen">
        {isMobile ? (
          <div key="page-content" className="w-full">
            {/* ── 1. BLUE HERO SECTION ── */}
            <section
              className={`w-full bg-[#0A2F76] px-6 lg:px-16 text-white relative z-0 flex flex-col justify-end lg:justify-start lg:block h-[88svh] pb-28 pt-24`}
            >
              <div className="max-w-[1400px] mx-auto w-full flex flex-col">
                <div className="w-full h-[1px] bg-white mb-8 block lg:hidden order-1" />
                <button
                  onClick={handleBackClick}
                  className="flex items-center gap-2 text-white hover:text-white transition-colors w-fit mt-8 lg:mt-0 mb-0 lg:mb-12 cursor-pointer order-3 lg:order-1"
                >
                  <FiArrowLeft /> Back to Case Studies
                </button>

                <h1 className="heading-1 max-w-4xl border-none outline-none order-2 lg:order-2">
                  {study.title}
                </h1>
              </div>
            </section>

            {/* ── 2. HERO IMAGE ── */}
            <div className="relative z-10 pointer-events-none -mt-24">
              <section className="max-w-[1400px] mx-auto px-6 lg:px-16">
                <div
                  className="w-full relative pointer-events-auto"
                  style={{ transformOrigin: "left top" }}
                >
                  <div className="absolute top-6 right-6 bg-white px-4 py-1.5 body-extra-small !text-[#0A2F76] rounded-sm z-20">
                    {study.category}
                  </div>

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={study.heroImage}
                    alt={study.title}
                    className="w-full h-[300px] lg:h-[600px] object-cover rounded-[4px]"
                  />

                  <div className="hidden lg:block absolute bottom-0 right-0 bg-white pt-6 pl-8 pr-6 rounded-tl-[0.50rem] z-20 border-0 shadow-none outline-none ring-0">
                    <Link
                      href="/contact-us"
                      className="group relative inline-flex h-[44px] items-center justify-center overflow-hidden rounded-sm bg-animated-gradient px-6 !text-white transition duration-300"
                    >
                      <span className="invisible body-medium whitespace-nowrap">
                        Contact Us
                      </span>
                      <div className="absolute top-0 left-0 flex w-full flex-col transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-1/2">
                        <span className="flex h-[44px] w-full items-center justify-center body-medium whitespace-nowrap">
                          Contact Us
                        </span>
                        <span className="flex h-[44px] w-full items-center justify-center body-medium whitespace-nowrap">
                          Contact Us
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </section>
            </div>

            {/* ── 3. CONTENT GRID ── */}
            <div className="relative z-20 bg-white max-w-[1400px] mx-auto px-6 lg:px-16 pb-12 lg:pb-32 pt-12 lg:pt-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                <div className="hidden lg:block lg:col-span-3 sticky top-32 self-start">
                  <div className="flex items-center gap-8 mb-10">
                    <div className="w-5 h-5">
                      <RotatingDots variant="light" />
                    </div>
                    <span className="body-small font-semibold !text-[#01030B] tracking-wider">
                      Project Key Information
                    </span>
                  </div>

                  <div className="flex flex-col pl-8">
                    <SidebarLink
                      href="#overview"
                      label="Project Overview"
                      isActive={activeSection === "overview"}
                    />
                    <SidebarLink
                      href="#challenges"
                      label="Challenges"
                      isActive={activeSection === "challenges"}
                    />
                    <SidebarLink
                      href="#solution"
                      label="Our Solution"
                      isActive={activeSection === "solution"}
                    />
                    <SidebarLink
                      href="#implementation"
                      label="Implementation"
                      isActive={activeSection === "implementation"}
                    />
                    <SidebarLink
                      href="#results"
                      label="Results & Impact"
                      isActive={activeSection === "results"}
                    />
                    <SidebarLink
                      href="#technologies"
                      label="Technologies Used"
                      isActive={activeSection === "technologies"}
                    />
                    <SidebarLink
                      href="#conclusion"
                      label="Conclusion"
                      isActive={activeSection === "conclusion"}
                    />
                  </div>
                </div>

                <div className="lg:col-span-9 flex flex-col gap-16 text-[#333]">
                  <div id="overview" className="scroll-mt-32">
                    <p className="whitespace-pre-wrap leading-relaxed text-[#55565C] mb-10">
                      {study.overview}
                    </p>
                    <img
                      src={study.architectureImage}
                      alt="Project Showcase"
                      className="w-full object-cover rounded-sm"
                    />
                  </div>

                  <div id="challenges" className="scroll-mt-32">
                    <p className="mb-6 text-[#01030B]">
                      The project faced several critical challenges:
                    </p>
                    <ul className="flex flex-col gap-4">
                      {study.challenges?.map((challenge, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[#55565C]"
                        >
                          <span className="text-[#0D54CA] mt-1">➔</span>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-12 w-full">
                      <img
                        src="https://res.cloudinary.com/dku9in8sb/image/upload/v1777889344/BTP_ot2z6b.png"
                        alt="BTP Architecture"
                        className="w-full object-contain rounded-sm"
                      />
                    </div>
                  </div>

                  <div id="solution" className="scroll-mt-32">
                    <p className="mb-6 text-[#01030B]">{study.solutionIntro}</p>
                    <ul className="flex flex-col gap-4">
                      {study.solutionPoints?.map((point, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[#55565C]"
                        >
                          <span className="text-[#0D54CA] mt-1">➔</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div id="implementation" className="scroll-mt-32">
                    <p className="mb-6 text-[#01030B]">
                      {study.implementationIntro}
                    </p>
                    <ul className="flex flex-col gap-4">
                      {study.implementationPoints?.map((point, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[#55565C]"
                        >
                          <span className="text-[#0D54CA] mt-1">➔</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div id="results" className="scroll-mt-32">
                    <p className="mb-6 text-[#01030B]">{study.resultsIntro}</p>
                    <ul className="flex flex-col gap-4">
                      {study.resultsPoints?.map((point, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[#55565C]"
                        >
                          <span className="text-[#0D54CA] mt-1">➔</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div id="technologies" className="scroll-mt-32">
                    <div className="flex flex-wrap gap-3 mt-4">
                      {study.technologies?.map((tech, i) => (
                        <span
                          key={i}
                          className="body-small px-4 py-2 bg-gray-100 text-gray-800 rounded-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div id="conclusion" className="scroll-mt-32">
                    <p className="whitespace-pre-wrap leading-relaxed text-[#55565C]">
                      {study.conclusion}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full">
            {/* ── 1. BLUE HERO SECTION ── */}
            <motion.section
              style={{ y: blueBarY }}
              initial={{ clipPath: isMobile ? "none" : "inset(0 0 100% 0)" }}
              animate={{
                clipPath: isMobile ? "none" : "inset(0 0 0% 0)",
                transition: { duration: isMobile ? 0 : 0.5, ease: EASE },
              }}
              exit={{
                clipPath: isMobile ? "none" : "inset(0 0 100% 0)",
                transition: { duration: isMobile ? 0 : 0.6, ease: EASE },
              }}
              className={`w-full bg-[#0A2F76] px-6 lg:px-16 text-white relative z-0 flex flex-col justify-end lg:justify-start lg:block ${
                isMobile ? "h-[88svh] pb-28 pt-24" : "pt-32 pb-48 lg:pb-64"
              }`}
            >
              <motion.div
                initial={
                  isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: isMobile ? 0 : 0.6,
                    delay: isMobile ? 0 : 0.2,
                    ease: "easeOut",
                  },
                }}
                exit={
                  isMobile
                    ? { display: "none" }
                    : {
                        opacity: 0,
                        y: -40,
                        transition: { duration: 0.45, ease: "easeInOut" },
                      }
                }
                className="max-w-[1400px] mx-auto w-full flex flex-col"
              >
                <div className="w-full h-[1px] bg-white/30 mb-8 block lg:hidden order-1" />
                <button
                  onClick={handleBackClick}
                  className="flex items-center gap-2 text-white hover:text-white transition-colors w-fit mt-8 lg:mt-0 mb-0 lg:mb-12 cursor-pointer order-3 lg:order-1"
                >
                  <FiArrowLeft /> Back to Case Studies
                </button>
                <h1 className="heading-2 max-w-4xl border-none outline-none order-2 lg:order-2">
                  {study.title}
                </h1>
              </motion.div>
            </motion.section>

            {/* ── 2. HERO IMAGE ── */}
            <div
              className={`relative z-10 pointer-events-none ${
                isMobile ? "-mt-24" : "-mt-48"
              }`}
            >
              <section className="max-w-[1400px] mx-auto px-6 lg:px-16">
                <motion.div
                  layout={!isMobile}
                  layoutId={
                    !isMobile ? `shared-slide-${studyIndex}` : undefined
                  }
                  initial={false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1 }}
                  transition={{
                    layout: {
                      type: "tween",
                      ease: [0.76, 0, 0.24, 1],
                      duration: 1.2,
                    },
                  }}
                  style={{
                    transformOrigin: "left top",
                    zIndex: isExiting ? 50 : 1,
                  }}
                  className="w-full relative pointer-events-auto"
                >
                  <div className="absolute top-6 right-6 bg-white px-4 py-1.5 body-extra-small !text-[#0A2F76] rounded-sm z-20">
                    {study.category}
                  </div>

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={study.heroImage}
                    alt={study.title}
                    className="w-full h-[300px] lg:h-[600px] object-cover rounded-[4px]"
                  />

                  <div className="hidden lg:block absolute bottom-0 right-0 bg-white pt-6 pl-8 pr-6 rounded-tl-[0.50rem] z-20 border-0 shadow-none outline-none ring-0">
                    <Link
                      href="/contact-us"
                      className="group relative inline-flex h-[44px] items-center justify-center overflow-hidden rounded-sm bg-animated-gradient px-6 !text-white transition duration-300"
                    >
                      <span className="invisible body-medium whitespace-nowrap">
                        Contact Us
                      </span>
                      <div className="absolute top-0 left-0 flex w-full flex-col transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-1/2">
                        <span className="flex h-[44px] w-full items-center justify-center body-medium whitespace-nowrap">
                          Contact Us
                        </span>
                        <span className="flex h-[44px] w-full items-center justify-center body-medium whitespace-nowrap">
                          Contact Us
                        </span>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              </section>
            </div>

            {/* ── 3. CONTENT GRID ── */}
            <div className="relative z-20 bg-white max-w-[1400px] mx-auto px-6 lg:px-16 pb-12 lg:pb-32 pt-12 lg:pt-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                <div className="hidden lg:block lg:col-span-3 sticky top-32 self-start">
                  <div className="flex items-center gap-8 mb-10">
                    <div className="w-5 h-5">
                      <RotatingDots variant="light" />
                    </div>
                    <span className="body-small font-semibold !text-[#01030B] tracking-wider">
                      Project Key Information
                    </span>
                  </div>

                  <div className="flex flex-col pl-8">
                    <SidebarLink
                      href="#overview"
                      label="Project Overview"
                      isActive={activeSection === "overview"}
                    />
                    <SidebarLink
                      href="#challenges"
                      label="Challenges"
                      isActive={activeSection === "challenges"}
                    />
                    <SidebarLink
                      href="#solution"
                      label="Our Solution"
                      isActive={activeSection === "solution"}
                    />
                    <SidebarLink
                      href="#implementation"
                      label="Implementation"
                      isActive={activeSection === "implementation"}
                    />
                    <SidebarLink
                      href="#results"
                      label="Results & Impact"
                      isActive={activeSection === "results"}
                    />
                    <SidebarLink
                      href="#technologies"
                      label="Technologies Used"
                      isActive={activeSection === "technologies"}
                    />
                    <SidebarLink
                      href="#conclusion"
                      label="Conclusion"
                      isActive={activeSection === "conclusion"}
                    />
                  </div>
                </div>

                <div className="lg:col-span-9 flex flex-col gap-16 text-[#333]">
                  <div id="overview" className="scroll-mt-32">
                    <p className="whitespace-pre-wrap leading-relaxed text-[#55565C] mb-10">
                      {study.overview}
                    </p>
                    <img
                      src={study.architectureImage}
                      alt="Project Showcase"
                      className="w-full object-cover rounded-sm"
                    />
                  </div>

                  <div id="challenges" className="scroll-mt-32">
                    <p className="mb-6 text-[#01030B]">
                      The project faced several critical challenges:
                    </p>
                    <ul className="flex flex-col gap-4">
                      {study.challenges?.map((challenge, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[#55565C]"
                        >
                          <span className="text-[#0D54CA] mt-1">➔</span>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-12 w-full">
                      <img
                        src="https://res.cloudinary.com/dku9in8sb/image/upload/v1777889344/BTP_ot2z6b.png"
                        alt="BTP Architecture"
                        className="w-full object-contain rounded-sm"
                      />
                    </div>
                  </div>

                  <div id="solution" className="scroll-mt-32">
                    <p className="mb-6 text-[#01030B]">{study.solutionIntro}</p>
                    <ul className="flex flex-col gap-4">
                      {study.solutionPoints?.map((point, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[#55565C]"
                        >
                          <span className="text-[#0D54CA] mt-1">➔</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div id="implementation" className="scroll-mt-32">
                    <p className="mb-6 text-[#01030B]">
                      {study.implementationIntro}
                    </p>
                    <ul className="flex flex-col gap-4">
                      {study.implementationPoints?.map((point, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[#55565C]"
                        >
                          <span className="text-[#0D54CA] mt-1">➔</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div id="results" className="scroll-mt-32">
                    <p className="mb-6 text-[#01030B]">{study.resultsIntro}</p>
                    <ul className="flex flex-col gap-4">
                      {study.resultsPoints?.map((point, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[#55565C]"
                        >
                          <span className="text-[#0D54CA] mt-1">➔</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div id="technologies" className="scroll-mt-32">
                    <div className="flex flex-wrap gap-3 mt-4">
                      {study.technologies?.map((tech, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-sm body-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div id="conclusion" className="scroll-mt-32">
                    <p className="whitespace-pre-wrap leading-relaxed text-[#55565C]">
                      {study.conclusion}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

function SidebarLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <a
      href={href}
      className={`body-medium py-3 pl-6 border-l-2 transition-colors duration-300 leading-tight ${
        isActive
          ? "border-[#0D54CA] !text-[#0D54CA] body-medium"
          : "border-gray-200 text-gray-500 hover:text-gray-900"
      }`}
    >
      {label}
    </a>
  );
}
