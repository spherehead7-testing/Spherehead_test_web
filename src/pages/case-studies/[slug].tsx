import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import Footer from "@/components/layout/footer";
import RotatingDots from "@/components/ui/rotating-dots";

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
    solutionIntro: "We designed and implemented a comprehensive e-commerce solution that addressed all the identified challenges.",
    solutionPoints: [
      "Modern Architecture - Built using React.js and Node.js for optimal performance and scalability. The platform can handle thousands of concurrent users without performance degradation.",
      "Enhanced User Experience - Implemented intuitive navigation, fast loading times, and responsive design that works seamlessly across all devices.",
      "Automated Inventory Management - Integrated real-time inventory tracking with automated reorder points and stock level alerts."
    ],
    // NEW DATA FOR EXPANDED SECTIONS
    implementationIntro: "The project was executed in agile sprints over a 16-week timeline, ensuring continuous feedback and iterative improvements.",
    implementationPoints: [
      "Phase 1: Discovery & UI/UX Design - 3 weeks of wireframing and prototyping.",
      "Phase 2: Core Backend Development - Setting up microservices and database schemas.",
      "Phase 3: Frontend Integration & Testing - Connecting the React front-end with secure APIs.",
      "Phase 4: Deployment & Training - Seamless migration from the legacy system with zero downtime."
    ],
    resultsIntro: "The new platform delivered immediate and measurable business value.",
    resultsPoints: [
      "Achieved a 300% increase in online sales within the first quarter.",
      "Reduced page load times by 75%, significantly decreasing bounce rates.",
      "Automated inventory management saved the team over 40 hours of manual work per week."
    ],
    technologies: ["React.js", "Node.js", "MongoDB", "Redis", "AWS", "Docker"],
    conclusion: "By modernizing their technology stack and focusing on user experience, the client successfully transitioned from a struggling legacy system to an industry-leading e-commerce platform, setting the foundation for years of scalable growth."
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
    solutionIntro: "We designed and implemented a comprehensive healthcare solution that addressed all the identified challenges.",
    solutionPoints: [
      "Unified Health Records - Consolidated all patient data into a single, secure, and easily accessible digital platform.",
      "Automated Workflows - Streamlined administrative tasks, reducing paperwork and minimizing human error.",
      "Patient Portal - Developed an intuitive app for patients to book appointments, view records, and message doctors securely."
    ],
    implementationIntro: "Security and compliance were our top priorities during the rollout of the unified platform.",
    implementationPoints: [
      "Conducted a comprehensive security audit of existing infrastructure.",
      "Developed a custom data migration script to securely transfer legacy patient records.",
      "Implemented role-based access control (RBAC) across all hospital departments."
    ],
    resultsIntro: "The integrated system drastically improved both administrative efficiency and patient satisfaction.",
    resultsPoints: [
      "Reduced patient wait times by an average of 35%.",
      "Decreased no-show appointments by 50% through automated SMS reminders.",
      "Achieved 100% HIPAA compliance during the latest external audit."
    ],
    technologies: ["Angular", "Spring Boot", "PostgreSQL", "Kafka", "OAuth2"],
    conclusion: "The digital transformation of this healthcare provider not only optimized their internal workflows but significantly enhanced the quality of care delivered to patients."
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
    solutionIntro: "We designed and implemented a comprehensive IoT solution that addressed all the identified challenges.",
    solutionPoints: [
      "Real-time Dashboards - Created dynamic visualizations for floor managers to monitor equipment health continuously.",
      "Predictive Analytics - Deployed machine learning models to identify maintenance needs before machinery failures occurred.",
      "System Integration - Connected legacy factory software into a unified central command center."
    ],
    implementationIntro: "Deploying hardware and software simultaneously required precise coordination with the factory floor managers.",
    implementationPoints: [
      "Installed customized IoT sensors on 50+ legacy manufacturing machines.",
      "Built a secure edge-computing network to process raw sensor data locally to reduce latency.",
      "Developed customized analytics dashboards tailored to different management tiers."
    ],
    resultsIntro: "The introduction of predictive analytics transformed the factory from a reactive environment to a proactive one.",
    resultsPoints: [
      "Reduced unplanned equipment downtime by 40%.",
      "Increased overall equipment effectiveness (OEE) by 15%.",
      "Saved an estimated $1.2M annually in maintenance and lost production costs."
    ],
    technologies: ["Vue.js", "Python", "TensorFlow", "AWS IoT Core", "Time-Series Databases"],
    conclusion: "By bridging the gap between physical machinery and digital analytics, the manufacturing plant now operates with unprecedented efficiency and foresight, proving the immense value of Industry 4.0 integrations."
  },
];

export default function CaseStudyDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [activeSection, setActiveSection] = useState("overview");

  const study = CASE_STUDY_DETAILS.find((s) => s.slug === slug);

  useEffect(() => {
    const handleScroll = () => {
      // Added the new sections to the scroll spy array
      const sections = [
        "overview",
        "challenges",
        "solution",
        "implementation",
        "results",
        "technologies",
        "conclusion"
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

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
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

            <h1 className="heading-2 lg:!text-5xl max-w-4xl">{study.title}</h1>
          </div>
        </section>

        {/* 2. OVERLAPPING HERO IMAGE */}
        <section className="max-w-[1400px] mx-auto px-6 lg:px-16 -mt-32 lg:-mt-48 relative z-10">
          <div className="w-full relative">
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
              <div className="flex items-center gap-4 mb-10">
                <div className="w-5 h-5">
                  <RotatingDots variant="light" />
                </div>
                <span className="body-small font-semibold text-[#01030B] tracking-wider">
                  Project Key Information
                </span>
              </div>

              <div className="flex flex-col border-l-2 border-gray-100">
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
                {/* NEW SIDEBAR LINKS */}
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

            {/* RIGHT: TEXT CONTENT */}
            <div className="lg:col-span-9 flex flex-col gap-16 text-[#333]">
              
              {/* --- OVERVIEW SECTION --- */}
              <div id="overview" className="scroll-mt-32">
                <p className="whitespace-pre-wrap leading-relaxed text-[#55565C] mb-10">
                  {study.overview}
                </p>
                
                <img
                  src={study.architectureImage}
                  alt="Project Showcase"
                  className="w-full object-cover shadow-sm rounded-sm"
                />
              </div>

              {/* --- CHALLENGES SECTION --- */}
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

                {/* BTP ARCHITECTURE IMAGE */}
                <div className="mt-12 w-full">
                  <img
                    src="https://res.cloudinary.com/dku9in8sb/image/upload/v1777889344/BTP_ot2z6b.png"
                    alt="BTP Architecture"
                    className="w-full object-contain rounded-sm"
                  />
                </div>
              </div>

              {/* --- SOLUTION SECTION --- */}
              <div id="solution" className="scroll-mt-32">
                <p className="mb-6 text-[#01030B]">
                  {study.solutionIntro}
                </p>
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

              {/* --- IMPLEMENTATION SECTION --- */}
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

              {/* --- RESULTS & IMPACT SECTION --- */}
              <div id="results" className="scroll-mt-32">
                <p className="mb-6 text-[#01030B]">
                  {study.resultsIntro}
                </p>
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

              {/* --- TECHNOLOGIES USED SECTION --- */}
              <div id="technologies" className="scroll-mt-32">
                <div className="flex flex-wrap gap-3 mt-4">
                  {study.technologies?.map((tech, i) => (
                    <span 
                      key={i} 
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-sm text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* --- CONCLUSION SECTION --- */}
              <div id="conclusion" className="scroll-mt-32">
                <p className="whitespace-pre-wrap leading-relaxed text-[#55565C]">
                  {study.conclusion}
                </p>
              </div>
              
            </div>
          </div>
        </section>
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
      className={`body-medium py-3 pl-6 -ml-[2px] border-l-2 transition-colors duration-300 ${
        isActive
          ? "border-[#0D54CA] !text-[#0D54CA] font-medium"
          : "border-transparent text-[gray-500] hover:text-gray-900"
      }`}
    >
      {label}
    </a>
  );
}