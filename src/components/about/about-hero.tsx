"use client";

import Image from "next/image";
import CyclicButton from "@/components/ui/cyclic-button";
import SiteContainer from "../layout/site-container";
import { useScrollContainerContext } from "@/context/ScrollContainerContext";

export default function AboutHero() {
  const { scrollContainerRef } = useScrollContainerContext();
  return (
    <section className="relative overflow-hidden md:min-h-[80svh]">
      <SiteContainer className="relative">
        {/* CENTER DIVIDER LINEabout-hero-divider */}
        <div className="about-hero-divider absolute left-0 right-0 z-10 h-px -translate-y-1/2 bg-white md:bg-white" />

        {/* CONTENT WRAPPER */}
        <div className="relative z-20 flex items-start pt-[calc(43svh+clamp(24px,7vw,32px))] pb-[clamp(20px,6svh,36px)] md:min-h-[100svh] md:items-end md:pt-28 md:pb-[clamp(32px,8vh,50px)]">
          <div className="flex w-full flex-col items-start justify-between gap-3 md:gap-8 lg:flex-row lg:items-end">
            {/* LEFT CONTENT */}
            <div className="max-w-[980px]">
              {/* TITLE */}
              <h1 className="inner-hero md:hidden">
                Who We Are
                <br />
                &amp; What We
                <br />
                Stand For
              </h1>

              <h1 className="inner-hero hidden md:block">
                Who We Are & <br />
                What We Stand For
              </h1>

              {/* DESCRIPTION + AVATAR */}
              <div className="mt-4 flex max-w-[760px] flex-col items-start gap-6 sm:flex-row sm:items-end sm:gap-10 md:mt-[clamp(28px,6vw,48px)]">
                {/* DESCRIPTION */}
                <h4 className="heading-4 hidden max-w-[720px] text-white md:block">
                  We are a team driven by innovation, delivering
                  <br className="hidden sm:block" />
                  meaningful digital solutions that create real impact.
                </h4>

                {/* AVATAR */}
                <Image
                  src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776412629/About-Us-Hero-Avatar_kouqxe.webp"
                  alt="team"
                  width={145}
                  height={90}
                  priority
                  sizes="(max-width: 640px) 78px, 145px"
                  className="mb-0 h-auto w-[clamp(78px,24vw,145px)] shrink-0 object-contain md:mb-1"
                />
              </div>
            </div>
            <CyclicButton
              onClick={() => {
                window.location.href = "/pricing#contact-pricing";
              }}
            >
              <span>Start a Project</span>
            </CyclicButton>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
