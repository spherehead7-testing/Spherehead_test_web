"use client";

import { useState } from "react";
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

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

        {/* LEFT SIDE */}
        <div className="text-white">
          <div className="flex items-center gap-2 mb-4">
            <RotatingDots />
            <span className="text-sm text-white/70">FAQ</span>
          </div>

          <h2 className="text-[28px] md:text-[34px] lg:text-[40px] leading-[1.3] max-w-[520px]">
            Behind every question lies a commitment to clarity and understanding.
            Every answer is crafted to guide you and build lasting trust.
          </h2>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white rounded-md p-6 md:p-8">

          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div key={index} className="border-b last:border-none">

                {/* HEADER */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between py-5 text-left"
                >
                  <span className="text-[16px] md:text-[18px] text-[#01030B]">
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
                    isOpen ? "max-h-[200px] pb-4" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-500 text-sm leading-relaxed pr-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}

          {/* CONTACT CTA */}
          <div className="pt-20">
            <p className="text-sm text-gray-500 mb-3">
              My question is not here.
            </p>
            <button className="bg-[#155ACD] text-white px-6 py-2 rounded hover:bg-[#0A2F76]">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}