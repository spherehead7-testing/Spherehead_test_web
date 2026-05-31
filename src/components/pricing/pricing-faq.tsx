"use client";

import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-is-mobile";
import GradientButton from "@/components/ui/gradient-button";
import RotatingDots from "@/components/ui/rotating-dots";
import SiteContainer from "../layout/site-container";

const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines depend on complexity, but most branding or website projects take between 3 to 6 weeks. We’ll always set clear milestones and keep you updated throughout the process.",
    color: "#FD7624",
  },
  {
    question: "Do you offer branding packages?",
    answer:
      "Yes, we provide complete branding packages including logo design, brand guidelines, typography, and visual identity tailored to your business.",
    color: "#155ACD",
  },
  {
    question: "Can you work with my existing brand style?",
    answer:
      "Absolutely. We can enhance and expand your existing brand while maintaining consistency and improving its overall impact.",
    color: "#92D9FF",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We work across multiple industries including healthcare, education, fintech, real estate, and e-commerce.",
    color: "#FD7624",
  },
  {
    question: "Do you provide ongoing website support?",
    answer:
      "Yes, we offer maintenance, updates, performance monitoring, and technical support after project delivery.",
    color: "#155ACD",
  },
];

export default function FAQSection() {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      if (snapTimerRef.current) {
        clearTimeout(snapTimerRef.current);
      }

      snapTimerRef.current = setTimeout(() => {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const shouldLock = rect.top < viewportHeight * 0.38 && rect.top > 8;

        if (shouldLock) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 120);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (snapTimerRef.current) {
        clearTimeout(snapTimerRef.current);
      }
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="w-full snap-start py-14 lg:min-h-[100svh] lg:py-20 lg:flex lg:items-center"
    >
      <SiteContainer>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-6">
          {/* LEFT SIDE */}
          <div className="text-white">
            <div className="mb-4 flex items-center gap-2">
              <RotatingDots />
              <span className="body-small text-white">FAQ</span>
            </div>

            <h2 className="heading-2 max-w-[520px]">
              Behind every question lies a commitment to clarity and
              understanding. <br />
              Every answer is crafted to guide you and build lasting trust.
            </h2>
          </div>

          {/* RIGHT SIDE */}
          {/* REMOVED lg:h-[750px] so the box sizes itself dynamically based on screen space */}
          <div className="flex flex-col justify-between rounded-sm bg-white p-8 md:p-10 lg:p-12 h-auto">
            <div className="flex flex-col">
              {faqs.map((faq, index) => {
                const isOpen = activeIndex === index;

                return (
                  <div
                    key={index}
                    className="border-b border-[#B0B1B3] last:border-none"
                  >
                    {/* HEADER */}
                    <button
                      onClick={() => toggle(index)}
                      className="flex w-full items-center justify-between gap-6 py-4 lg:py-[18px] text-left"
                    >
                      <span className="body-medium text-black">
                        {faq.question}
                      </span>

                      {/* ICON */}
                      <span
                        className="text-[35px] font-light"
                        style={{ color: faq.color }}
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {/* CONTENT */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? "max-h-[160px] pb-4" : "max-h-0"
                      }`}
                    >
                      <p className="pr-6 body-small text-[#55565C]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CONTACT CTA */}
            <div className="pt-6 flex flex-row-reverse items-center justify-between lg:block lg:pt-10">
              <p className="mb-0 body-small text-[#01030B] text-right lg:mb-3 lg:text-left">
                My question Is not here.
              </p>

              <div className="pt-4">
              <GradientButton href="/contact-us" className="!text-white">
                Contact Us
              </GradientButton>
            </div>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}