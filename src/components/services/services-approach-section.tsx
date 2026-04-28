import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";

const approaches = [
  {
    num: "01",
    title: "Expertise in Latest\nTech Stacks",
    desc: "Harnessing the power of the latest technologies to create future-ready solutions that elevate your business.",
  },
  {
    num: "02",
    title: "Agile and Rapid\nDevelopment",
    desc: "Delivering faster, adaptable solutions that evolve with your needs, ensuring quick turnarounds without sacrificing quality.",
  },
  {
    num: "03",
    title: "Seamless\nIntegration",
    desc: "Ensuring smooth integration with your existing systems for efficient workflows and uninterrupted operations.",
  },
  {
    num: "04",
    title: "Human-Centered\nInnovation",
    desc: "Focusing on user experience to design solutions that are intuitive, impactful, and designed with real people in mind.",
  },
  {
    num: "05",
    title: "Reliable & Secure\nDevelopment",
    desc: "Building dependable, secure solutions that safeguard your business and provide peace of mind.",
  },
  {
    num: "06",
    title: "Code Quality and\nVersion Control",
    desc: "Maintaining code quality with robust version control to ensure scalability, reliability, and smooth collaboration.",
  },
];

export default function ServicesApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [page, setPage] = useState(0);

  const pageRef = useRef(page);
  pageRef.current = page;

  const isAnimating = useRef(false);

  // YOUR ORIGINAL WHEEL LISTENER KEPT INTACT!
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let edgeAccumulator = 0;
    const EDGE_THRESHOLD = 100;

    const handleWheel = (e: WheelEvent) => {
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      if (isScrollingDown) {
        if (pageRef.current === 0) {
          e.preventDefault();
          setPage(1);
          isAnimating.current = true;
          setTimeout(() => {
            isAnimating.current = false;
          }, 500);
          return;
        } else {
          edgeAccumulator += e.deltaY;
          if (edgeAccumulator > EDGE_THRESHOLD) {
            edgeAccumulator = 0;
            return; // This allows the browser to perform the native vertical snap!
          }
          e.preventDefault();
          return;
        }
      }

      if (isScrollingUp) {
        if (pageRef.current === 1) {
          e.preventDefault();
          setPage(0);
          isAnimating.current = true;
          setTimeout(() => {
            isAnimating.current = false;
          }, 500);
          return;
        } else {
          edgeAccumulator += Math.abs(e.deltaY);
          if (edgeAccumulator > EDGE_THRESHOLD) {
            edgeAccumulator = 0;
            return; // This allows the browser to perform the native vertical snap!
          }
          e.preventDefault();
          return;
        }
      }
    };

    section.addEventListener("wheel", handleWheel, { passive: false });
    return () => section.removeEventListener("wheel", handleWheel);
  }, []);

  const panel1 = approaches.slice(0, 3);
  const panel2 = approaches.slice(3, 6);

  const renderCard = (item: any, idx: number) => (
    <div
      key={item.num}
      className={`flex flex-col gap-4 ${
        idx === 0
          ? "md:pr-8 lg:pr-12 md:border-r border-white/20"
          : idx === 1
            ? "md:px-8 lg:px-12 md:border-r border-white/20"
            : "md:pl-8 lg:pl-12"
      }`}
    >
      <span className="text-[48px] lg:text-[64px] font-light text-white/90 leading-none mb-2">
        {item.num}
      </span>
      <h3 className="body-large whitespace-pre-line text-white leading-snug">
        {item.title}
      </h3>
      <p className="body-small text-white/70 leading-[1.75] mt-4 max-w-[340px]">
        {item.desc}
      </p>
    </div>
  );

  return (
    // 1. THE ONLY CHANGE: Added 'snap-start' to the end of these classes!
    <section
      ref={sectionRef}
      className="relative z-10 w-full h-[100vh] bg-transparent text-white flex flex-col justify-center overflow-hidden snap-start"
    >
      {/* Top overlap bar mimicking the bottom of the previous section */}
      <div className="absolute top-0 left-0 w-full h-[30px] md:h-[90px] bg-white rounded-b-[12px] z-30" />
      <SiteContainer className="flex flex-col gap-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-4 mb-6">
            <RotatingDots />
            <span className="body-small tracking-[0.1em] text-white/90 uppercase font-bold">
              Strategic Approach
            </span>
          </div>

          <h2 className="heading-2 max-w-[900px]">
            Powering Business Transformation through Precision Engineering
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="relative w-full overflow-hidden"
        >
          <motion.div
            animate={{ x: page === 0 ? "0%" : "-50%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex w-[200%] gap-0 will-change-transform"
          >
            {/* PANEL 1 */}
            <div className="w-1/2 shrink-0 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
              {panel1.map(renderCard)}
            </div>

            {/* PANEL 2 */}
            <div className="w-1/2 shrink-0 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
              {panel2.map(renderCard)}
            </div>
          </motion.div>
        </motion.div>
      </SiteContainer>
    </section>
  );
}