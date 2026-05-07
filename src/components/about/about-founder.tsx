"use client";

import Image from "next/image";
import RotatingDots from "../ui/rotating-dots";

export default function FounderMessage() {
  return (
    <section className="w-full bg-[#f5f7fb] pt-10 pb-12 lg:pt-12 lg:pb-12 px-6 lg:px-20">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-20 items-start">
        {/* LEFT */}
        <div>
          {/* Label */}
          <div className="flex items-center gap-3 mb-8">
            <RotatingDots variant="light" />
            <span className="text-sm text-gray-500 font-medium">
              Founder&apos;s Message
            </span>
          </div>

          {/* Heading */}
          <h1 className="heading-2 !text-[#01030B] ">
            What began as a <span className="text-[#2563eb] whitespace-nowrap">simple idea</span>{" "}
            has grown into a journey of creativity and impact.
            At <span className="text-[#2563eb]">Spherehead</span>, every step
            forward is guided by purpose and{" "}
            <span className="text-[#2563eb]">innovation</span>.
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex gap-8 items-start mt-12 lg:mt-60">
          {/* Image */}
          <div className="w-[280px] h-[380px] rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776671592/About-Us-Founder_zjlfec.webp"
              alt="Founder"
              width={280}
              height={360}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Text */}
          <div className="max-w-[420px]">
            <h3 className="body-small">
              Artemii Garibov
            </h3>
            <p className="body-small text-gray-500 mb-4">Co-Founder & CEO</p>

            <p className="body-small text-gray-600 mb-3">
              At Spherehead Technologies, our vision has always been to create
              more than just software, we craft solutions that solve real
              challenges and drive meaningful change. By blending advanced
              technology with creativity, we help businesses transform
              digitally, and deliver exceptional experiences.
            </p>

            <p className="body-small text-gray-600">
              Our foundation is built on trust, innovation, and collaboration.
              Every solution we deliver reflects our commitment to quality and
              our mission to empower clients with secure, scalable, and
              future-ready products. Together, we continue to shape
              opportunities, inspire growth, and build lasting success across
              industries and communities worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
