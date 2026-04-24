"use client";

import Image from "next/image";
import RotatingDots from "@/components/ui/rotating-dots";

const data = [
  {
    id: "01",
    title: "Smart Agriculture",
    desc: "Leveraging digital technologies to optimize farming operations, improve productivity, and enable data-driven agricultural management.",
    img: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776772304/Industries_01_apnthq.webp",
  },
  {
    id: "02",
    title: "Digital Healthcare",
    desc: "Empowering healthcare providers with intelligent systems that improve service delivery, data management, and patient experiences.",
    img: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776772304/Industries_02_cbghwo.webp",
  },
  {
    id: "03",
    title: "Smart Education",
    desc: "Enabling modern learning experiences through digital platforms that enhance collaboration, accessibility, and efficient education management.",
    img: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776772304/Industries_03_mnishi.webp",
  },
  {
    id: "04",
    title: "Smart Retail",
    desc: "Empowering retail businesses with digital solutions that enhance customer experiences, streamline operations, and drive smarter sales strategies.",
    img: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776772304/Industries_04_nqzjaa.webp",
  },
  {
    id: "05",
    title: "Digital Real Estate",
    desc: "Providing digital solutions that streamline property management, enhance client experiences, and optimize real estate operations.",
    img: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776772304/Industries_05_fgrqyv.webp",
  },
];

export default function IndustriesList() {
  return (
    // Entire section = exactly one viewport, nothing overflows the page
    <section className="flex w-full h-screen overflow-hidden">

      {/* ── LEFT — locked, never scrolls ── */}
      <div className="w-1/2 h-full flex-shrink-0 flex items-start pt-10 px-14">
        <div>
          {/* Label */}
          <div className="flex items-center gap-3 mb-8">
            <RotatingDots />
            <span className="text-sm text-white/70 tracking-wide">
              Industries We Serve
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-[28px] lg:text-[32px] font-light leading-[1.45] text-white max-w-[400px]">
            Our expertise spans multiple industries, enabling us to create
            innovative solutions that enhance efficiency, improve customer
            experiences, and support digital transformation.
          </h2>
        </div>
      </div>

      {/* ── RIGHT — independently scrollable, hidden scrollbar ── */}
      <div
        className="w-1/2 h-full flex-shrink-0 bg-white overflow-y-scroll"
        style={{
          scrollbarWidth: "none",       /* Firefox */
          msOverflowStyle: "none",      /* IE / Edge */
        }}
      >
        {/* Hide scrollbar in WebKit */}
        <style>{`
          section .industries-scroll::-webkit-scrollbar { display: none; }
        `}</style>

        {data.map((item) => (
          <div key={item.id} className="border-b border-gray-200">

            {/* Number label */}
            <div className="px-8 pt-5 pb-2 text-blue-600 text-base font-medium">
              {item.id}
            </div>

            {/* Card row: image + text */}
            <div className="flex">

              {/* Image — 327 × 332 px */}
              <div
                className="relative flex-shrink-0"
                style={{ width: 327, height: 332 }}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="327px"
                />
              </div>

              {/* Text */}
              <div className="flex-1 flex flex-col justify-center px-8 py-6">
                <h3 className="text-[20px] font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[280px]">
                  {item.desc}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
}