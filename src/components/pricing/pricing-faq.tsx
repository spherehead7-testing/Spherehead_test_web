"use client";

import { useEffect, useRef, useState } from "react";
import RotatingDots from "@/components/ui/rotating-dots";

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
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      if (snapTimerRef.current) {
        clearTimeout(snapTimerRef.current);
      }

      snapTimerRef.current = setTimeout(() => {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const shouldLock =
          rect.top < viewportHeight * 0.38 && rect.top > 8;

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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-[100svh] w-full snap-start overflow-hidden py-8 lg:flex lg:items-center lg:py-10"
    >
      <div className="mx-auto grid w-full max-w-6xl items-start gap-10 px-6 lg:grid-cols-2 lg:gap-14">

        {/* LEFT SIDE */}
        <div className="text-white">
          <div className="mb-4 flex items-center gap-2">
            <RotatingDots />
            <span className="body-small text-white">FAQ</span>
          </div>

          <h2 className="heading-2 max-w-[520px]">
            Behind every question lies a commitment to clarity and understanding.
            Every answer is crafted to guide you and build lasting trust.
          </h2>
        </div>

        {/* RIGHT SIDE */}
        <div className="rounded-md bg-white p-5 md:p-6">

          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div key={index} className="border-b last:border-none">

                {/* HEADER */}
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-6 py-3.5 text-left"
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
                    isOpen ? "max-h-[140px] pb-3" : "max-h-0"
                  }`}
                >
                  <p className="pr-6 body-small text-[#55565C]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}

          {/* CONTACT CTA */}
          <div className="pt-8">
            <p className="mb-3 body-small text-[#01030B">
              My question is not here.
            </p>
            <button className="body-medium rounded bg-animated-gradient px-6 py-2 text-white">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
