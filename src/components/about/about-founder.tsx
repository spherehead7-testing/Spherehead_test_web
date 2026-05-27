"use client";

import Image from "next/image";
import RotatingDots from "../ui/rotating-dots";
import { useEffect, useRef } from "react";
import SiteContainer from "../layout/site-container";

export default function FounderMessage() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

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
          rect.top < viewportHeight * 0.5 && rect.top > -viewportHeight * 0.3;

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
      className="flex w-full snap-start items-center overflow-visible rounded-b-xl bg-white py-14 pb-24 md:min-h-screen lg:h-screen lg:overflow-hidden lg:py-0 lg:pb-32"
    >
      <SiteContainer>
        <div className="flex w-full flex-col justify-between">
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
              <br className="hidden md:block" />
              into a journey of creativity and impact.
              <br className="hidden md:block" />
              At <span className="text-[#0D54CA]">Spherehead</span>, every step
              forward is
              <br className="hidden md:block" />
              guided by purpose and{" "}
              <span className="text-[#0D54CA]">innovation</span>.
            </h1>
          </div>

          {/* BOTTOM CONTENT */}
          <div className="mt-10 flex justify-start lg:mt-2 lg:justify-end">
            <div className="flex w-full flex-wrap items-end gap-x-4 gap-y-6 lg:w-auto lg:flex-nowrap lg:items-start lg:gap-12">
              {/* IMAGE */}
              <div className="h-auto w-[61%] max-w-[270px] flex-shrink-0 overflow-hidden rounded-md lg:-ml-4 lg:h-[380px] lg:w-[270px]">
                <Image
                  src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776671592/About-Us-Founder_zjlfec.webp"
                  alt="Founder"
                  width={270}
                  height={380}
                  className="h-auto w-full object-cover lg:h-full"
                />
              </div>

              {/* TEXT */}
              <div className="flex min-w-0 flex-1 flex-col pb-3 text-[#01030B] lg:h-[380px] lg:max-w-[390px] lg:flex-none lg:pb-4">
                {/* NAME */}
                <div>
                  <h4 className="body-medium !text-[#01030B] !font-semibold">
                    Artemii Garibov
                  </h4>

                  <p className="body-small mt-1 text-[#01030B]">
                    Co-Founder & CEO
                  </p>
                </div>

                {/* DESCRIPTION */}
                <div className="mt-auto hidden space-y-4 pb-4 lg:block">
                  <p className="body-small text-[#01030B]">
                    At Spherehead Technologies, our vision has always been to
                    create more than just software, we craft solutions that
                    solve real challenges and drive meaningful change. By
                    blending advanced technology with creativity, we help
                    businesses transform digitally and deliver exceptional
                    experiences.
                  </p>

                  <p className="body-small text-[#01030B]">
                    Our foundation is built on trust, innovation, and
                    collaboration. Every solution we deliver reflects our
                    commitment to quality and our mission to empower clients
                    with secure, scalable, and future-ready products.
                  </p>
                </div>
              </div>

              {/* MOBILE TEXT */}
              <div className="w-full space-y-4 mt-6 lg:mt-0 lg:hidden">
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
      </SiteContainer>
    </section>
  );
}
