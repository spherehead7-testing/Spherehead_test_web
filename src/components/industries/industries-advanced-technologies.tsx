"use client";

import RotatingDots from "@/components/ui/rotating-dots";
import TechStackCarousel from "@/components/ui/tech-stack-carousel";

const leftCards = [
  "https://res.cloudinary.com/dku9in8sb/image/upload/v1776839143/Industries-Big-Data_lhvogj.webp",
  "https://res.cloudinary.com/dku9in8sb/image/upload/v1776839143/Industries-Big-Data_lhvogj.webp",
  "https://res.cloudinary.com/dku9in8sb/image/upload/v1776839143/Industries-Data-Science_va9nzk.webp",
  "https://res.cloudinary.com/dku9in8sb/image/upload/v1776839143/Industries-Cloud-Computing_ngcrbu.webp",
  "https://res.cloudinary.com/dku9in8sb/image/upload/v1776839477/Industries-Virtual-Reality_uussk4.webp",
  "https://res.cloudinary.com/dku9in8sb/image/upload/v1776839477/Industries-Artificial-Inteligence_towg6p.webp",
];

const rightCards = [...leftCards];

export default function TechScrollSection() {
  return (
    <section className="bg-[#f5f7fb] rounded-md">
      {/* ================= HERO (FIRST VIEW) ================= */}
      <div className="min-h-screen flex flex-col items-center justify-start pt-12 pb-24 text-center px-6">
        {/* Label */}
        <div className="flex items-center gap-2 mb-3">
          <RotatingDots variant="light" />
          <span className="body-small !text-[#01030B]">Technologies</span>
        </div>

        {/* Heading */}
        <h2 className="heading-2 !text-[#01030B] max-w-[900px] mb-10">
          We use advanced technologies to{" "}
          <span className="text-[#0D54CA]">deliver smart</span>,scalable
          solutions for business growth.
        </h2>

        {/* Icons Row */}
        <TechStackCarousel />
      </div>

      {/* ================= SCROLL SECTION ================= */}
      <section className="relative -mt-62 h-screen overflow-hidden pb-225 ">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="mx-auto grid h-full w-full max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:px-12">
            {/* LEFT TEXT */}
            {/* <div className="flex flex-col justify-start pt-12"> */}
            <div className="flex h-full flex-col pb-20 pt-24">
              <div className="flex items-center gap-2 mb-6">
                <RotatingDots variant="light" />
                <span className="body-small !text-[#01030B]">
                  Advance Technologies
                </span>
              </div>

              <h2 className="heading-2 !text-[#01030B] max-w-[520px]">
                Driving Innovation and Impact through Advanced Technologies
                Worldwide
              </h2>

              <p className="body-small !text-[#8A8B8F] mt-auto max-w-[320px]">
                Leveraging cutting-edge technologies and innovative tools, we
                deliver digital solutions that solve complex challenges, drive
                measurable impact, and empower businesses to thrive in a rapidly
                evolving world.
              </p>
            </div>

            {/* RIGHT SCROLL AREA */}
            <div className="grid h-full grid-cols-2 gap-6 overflow-hidden">
              {/* LEFT COLUMN (scroll up) */}
              <div className="relative overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)]">
                <div className="animate-scrollUp flex flex-col gap-6">
                  {[...leftCards, ...leftCards].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="rounded-xl"
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN (scroll down) */}
              <div className="relative overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)]">
                <div className="animate-scrollDown flex flex-col gap-6">
                  {[...rightCards, ...rightCards].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="rounded-xl"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
