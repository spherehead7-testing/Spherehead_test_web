"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import RotatingDots from "../ui/rotating-dots";

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

// ─── SINGLE SOURCE OF TRUTH for card sizing ───────────────────────────────────
// number row:   h-[48px]  = 48px
// content row:  h-[300px] = 300px
// border-b:     1px
// ─────────────────────────────────────────────────────────────────────────────
const NUMBER_ROW_H = 48;
const CONTENT_ROW_H = 300;
const BORDER_H = 1;
const CARD_HEIGHT = NUMBER_ROW_H + CONTENT_ROW_H + BORDER_H; // = 349px

// We scroll the list upward by (n-1) full card heights so the last card
// ends up at the top of the viewport — no more, no less.
const SCROLL_DISTANCE = (data.length - 1) * CARD_HEIGHT;

export default function IndustriesList() {
  const ref = useRef(null);

  // Use real window.innerHeight so mobile browser chrome doesn't cause
  // 100vh to be taller than the visible area, which would create whitespace.
  const [vh, setVh] = useState(0);

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -SCROLL_DISTANCE]);

  // Section height = one real viewport (sticky pane) + scroll runway
const sectionHeight = vh
  ? vh + SCROLL_DISTANCE - CARD_HEIGHT
  : `calc(100vh + ${SCROLL_DISTANCE - CARD_HEIGHT}px)`;

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: sectionHeight }}
    >
      {/* sticky pane — always exactly one real viewport tall */}
      <div
        className="sticky top-0 flex overflow-hidden"
        style={{ height: vh || "100vh" }}
      >
        {/* ── LEFT ── */}
        <div className="w-1/2 text-white flex items-start pt-8 px-16 relative">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <RotatingDots />
              <span className="text-sm text-white/70 ml-2">
                Industries We Serve
              </span>
            </div>
            <h2 className="text-[30px] max-w-[500px] mb-10 leading-[1.4]">
              Our expertise spans multiple industries, enabling us to create
              innovative solutions that enhance efficiency, improve customer
              experiences, and support digital transformation.
            </h2>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="w-1/2 bg-[#f5f7fb] overflow-hidden relative">
          <motion.div
            style={{ y }}
            className="absolute top-0 left-0 w-full will-change-transform"
          >
            {data.map((item, i) => (
              <div
                key={i}
                style={{
                  height: CARD_HEIGHT,
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                {/* Number row */}
                <div
                  style={{ height: NUMBER_ROW_H }}
                  className="flex items-center px-6 text-blue-600 text-lg font-medium"
                >
                  {item.id}
                </div>

                {/* Content row */}
                <div style={{ height: CONTENT_ROW_H }} className="flex">
                  {/* Image */}
                  <div className="w-[45%] relative">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                  </div>

                  {/* Text */}
                  <div className="w-[55%] p-8 flex flex-col justify-center">
                    <h3 className="text-xl font-medium mb-2 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
