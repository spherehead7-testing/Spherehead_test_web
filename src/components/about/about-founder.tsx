"use client";

import Image from "next/image";
import RotatingDots from "../ui/rotating-dots";
import { useEffect, useRef } from "react";

export default function FounderMessage() {

    const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // snap when section reaches around halfway
        const shouldSnap =
          rect.top < viewportHeight * 0.5 &&
          rect.top > -viewportHeight * 0.3;

        if (shouldSnap) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section
    ref={sectionRef}
    className="flex h-screen w-full snap-start items-center overflow-hidden rounded-b-xl bg-white px-6 lg:px-20">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col justify-between">
        {/* TOP CONTENT */}
        <div className="max-w-[760px]">
          {/* LABEL */}
          <div className="mb-6 flex items-center gap-3">
            <RotatingDots variant="light" />

            <span className="body-small text-[#01030B]">
              Founder&apos;s Message
            </span>
          </div>

          {/* HEADING */}
          <h1 className="heading-2 !text-[#01030B]">
            What began as a{" "}
            <span className="text-[#0D54CA] whitespace-nowrap">
              simple idea
            </span>{" "}
            has grown
            <br />
            into a journey of creativity and impact.
            <br />
            At <span className="text-[#0D54CA]">Spherehead</span>, every step
            forward is
            <br />
            guided by purpose and{" "}
            <span className="text-[#0D54CA]">innovation</span>.
          </h1>
        </div>

        {/* BOTTOM CONTENT */}
        <div className="mt-2 flex justify-end">
          <div className="flex items-start gap-10 lg:gap-12">
            {/* IMAGE */}
            <div className="-ml-4 h-[380px] w-[270px] flex-shrink-0 overflow-hidden rounded-md">
              <Image
                src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776671592/About-Us-Founder_zjlfec.webp"
                alt="Founder"
                width={270}
                height={380}
                className="h-full w-full object-cover"
              />
            </div>

            {/* TEXT */}
            <div className="flex h-[380px] max-w-[390px] flex-col text-[#01030B]">
              {/* NAME */}
              <div>
                <h3 className="heading-4 !text-[#01030B] !leading-none">
                  Artemii Garibov
                </h3>

                <p className="body-small mt-1 text-[#01030B]">
                  Co-Founder & CEO
                </p>
              </div>

              {/* DESCRIPTION */}
              <div className="mt-24 space-y-4">
                <p className="body-small text-[#01030B]">
                  At Spherehead Technologies, our vision has always been to
                  create more than just software, we craft solutions that solve
                  real challenges and drive meaningful change. By blending
                  advanced technology with creativity, we help businesses
                  transform digitally and deliver exceptional experiences.
                </p>

                <p className="body-small text-[#01030B]">
                  Our foundation is built on trust, innovation, and
                  collaboration. Every solution we deliver reflects our
                  commitment to quality and our mission to empower clients with
                  secure, scalable, and future-ready products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
