import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronsDown } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
} from "motion/react";
import SiteContainer from "@/components/layout/site-container";
import ConsultationCTA from "@/components/ui/consultation-cta";
import AboutUsButton from "@/components/ui/about-us-button";
import ServiceWhitecardContent from "@/components/landing/service-whitecard-content";
import IndustryCarouselLanding from "@/components/landing/industryCarouselLanding";
import TechnologiesSection from "@/components/common-sections/technologies-section/technologies-section";
import TestimonialSection from "@/components/common-sections/testimonial-section/testimonial-section";
import RotatingDots from "@/components/ui/rotating-dots";
import CyclicButton from "@/components/ui/cyclic-button";
import Link from "next/link";

export default function HomePage() {
  const { scrollY } = useScroll();

  const measureRef = useRef<HTMLDivElement | null>(null);
  const isAutoScrollingRef = useRef(false);
  const autoScrollRafRef = useRef<number | null>(null);
  const scrollStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const updateSizes = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);

      if (measureRef.current) {
        const rect = measureRef.current.getBoundingClientRect();
        setContainerWidth(rect.width);
      }
    };

    updateSizes();

    const resizeObserver = new ResizeObserver(updateSizes);
    if (measureRef.current) {
      resizeObserver.observe(measureRef.current);
    }

    window.addEventListener("resize", updateSizes);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateSizes);
    };
  }, []);

  const currentViewportHeight = viewportHeight || 900;
  const animationEnd = 100;

  useEffect(() => {
    if (!viewportHeight) return;

    const serviceTarget = currentViewportHeight * 2;
    const industryTarget = currentViewportHeight * 3;

    const serviceTriggerStart = currentViewportHeight * 1.18;
    const industryTriggerStart = currentViewportHeight * 2.58;

    const clearPending = () => {
      if (scrollStopTimerRef.current) {
        clearTimeout(scrollStopTimerRef.current);
        scrollStopTimerRef.current = null;
      }

      if (autoScrollRafRef.current !== null) {
        cancelAnimationFrame(autoScrollRafRef.current);
        autoScrollRafRef.current = null;
      }
    };

    const animateRemainingScroll = (target: number) => {
      if (isAutoScrollingRef.current) return;

      const startY = window.scrollY;
      const distance = target - startY;

      if (distance <= 0) return;

      isAutoScrollingRef.current = true;

      const duration = 520;
      const startTime = performance.now();

      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

      const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = easeOut(progress);
        const nextY = startY + distance * eased;

        window.scrollTo(0, nextY);

        if (progress < 1) {
          autoScrollRafRef.current = requestAnimationFrame(step);
        } else {
          window.scrollTo(0, target);
          autoScrollRafRef.current = null;

          setTimeout(() => {
            isAutoScrollingRef.current = false;
          }, 60);
        }
      };

      autoScrollRafRef.current = requestAnimationFrame(step);
    };

    const handleScroll = () => {
      if (isAutoScrollingRef.current) return;

      if (scrollStopTimerRef.current) {
        clearTimeout(scrollStopTimerRef.current);
      }

      scrollStopTimerRef.current = setTimeout(() => {
        const y = window.scrollY;

        if (y >= serviceTriggerStart && y < serviceTarget - 10) {
          animateRemainingScroll(serviceTarget);
          return;
        }

        if (y >= industryTriggerStart && y < industryTarget - 10) {
          animateRemainingScroll(industryTarget);
        }
      }, 70);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearPending();
      isAutoScrollingRef.current = false;
    };
  }, [currentViewportHeight, viewportHeight]);

  const rawBarHeight = useTransform(
    scrollY,
    [0, animationEnd],
    [88, currentViewportHeight],
  );

  const rawBarWidth = useTransform(
    scrollY,
    [0, animationEnd],
    [containerWidth || 1200, viewportWidth || 1440],
  );

  const rawBarRadius = useTransform(scrollY, [0, animationEnd], [4, 4]);
  const rawLabelOpacity = useTransform(scrollY, [0, 40], [1, 0]);

  const rawHeroContentOpacity = useTransform(
    scrollY,
    [0, 2, 5, animationEnd],
    [1, 0.12, 0, 0],
  );

  const rawSubtextOpacity = useTransform(
    scrollY,
    [0, 1, 3, animationEnd],
    [1, 0.12, 0, 0],
  );

  const rawCutHeight = useTransform(scrollY, [0, animationEnd], ["0%", "40%"]);

  const rawRightPanelWidth = useTransform(
    scrollY,
    [0, animationEnd],
    ["100%", "40%"],
  );

  const rawRightPanelCutBottom = useTransform(
    scrollY,
    [0, animationEnd],
    ["0%", "12%"],
  );

  const rawAboutContentOpacity = useTransform(
    scrollY,
    [10, 28, 52],
    [0, 0.35, 1],
  );

  // ABOUT -> SERVICES swap
  const swapStart = currentViewportHeight;
  const swapEnd = currentViewportHeight * 2;
  const servicesHoldEnd = currentViewportHeight * 2.45;

  const cardY = useTransform(
    scrollY,
    [swapStart, swapEnd],
    [0, -currentViewportHeight],
  );

  // SERVICES -> INDUSTRIES continuation
  const industriesEnd = currentViewportHeight * 3;

  const rawServicesY = useTransform(
    scrollY,
    [swapStart, swapEnd, servicesHoldEnd, industriesEnd],
    [currentViewportHeight, 0, 0, -currentViewportHeight],
  );

  const springConfig = {
    stiffness: 85,
    damping: 20,
    mass: 0.8,
  };

  const barHeight = useSpring(rawBarHeight, springConfig);
  const barWidth = useSpring(rawBarWidth, springConfig);
  const barRadius = useSpring(rawBarRadius, springConfig);

  const labelOpacity = useSpring(rawLabelOpacity, {
    stiffness: 100,
    damping: 22,
    mass: 0.7,
  });

  const heroContentOpacity = useSpring(rawHeroContentOpacity, {
    stiffness: 180,
    damping: 14,
    mass: 0.5,
  });

  const subtextOpacity = useSpring(rawSubtextOpacity, {
    stiffness: 180,
    damping: 14,
    mass: 0.5,
  });

  const cutHeight = useSpring(rawCutHeight, {
    stiffness: 85,
    damping: 20,
    mass: 0.8,
  });

  const rightPanelWidth = useSpring(rawRightPanelWidth, {
    stiffness: 85,
    damping: 20,
    mass: 0.8,
  });

  const rightPanelCutBottom = useSpring(rawRightPanelCutBottom, {
    stiffness: 85,
    damping: 20,
    mass: 0.8,
  });

  const aboutContentOpacity = useSpring(rawAboutContentOpacity, {
    stiffness: 100,
    damping: 20,
    mass: 0.8,
  });

  const servicesY = useSpring(rawServicesY, {
    stiffness: 95,
    damping: 22,
    mass: 0.85,
  });

  const rightPanelHeight = useMotionTemplate`calc(${cutHeight} + 2px)`;
  const leftPanelWidth = useMotionTemplate`calc(100% - ${rightPanelWidth})`;

  const rightPanelClipPath = useMotionTemplate`
    inset(0% 0% ${rightPanelCutBottom} 0% round 4px 0px 0px 4px)
  `;

  return (
    <>
      <Head>
        <title>Spherehead Technologies</title>
        <meta
          name="description"
          content="Smart technology operations for smoother and hassle-free operations."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="relative h-[400vh] overflow-x-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0">
          {/* 1st screen */}
          <div aria-hidden="true" className="h-screen" />

          {/* 2nd screen */}
          <section
            id="about"
            aria-label="About us section"
            className="relative h-screen"
          />

          {/* 3rd screen placeholder */}
          <section
            id="services"
            aria-label="Services section"
            className="relative h-screen"
          />

          {/* 4th screen placeholder */}
          <section
            id="industries"
            aria-label="Industries section"
            className="relative h-screen"
          />
        </div>

        <div className="sticky top-0 h-screen overflow-visible">
          {/* HERO */}
          <section className="absolute inset-0 z-0 overflow-visible">
            <motion.div
              style={{ opacity: heroContentOpacity }}
              className="h-full"
            >
              <SiteContainer className="relative grid min-h-screen grid-cols-1 gap-10 pt-16 pb-12 -translate-y-6 lg:grid-cols-[minmax(0,820px)_1fr] lg:items-center lg:pt-20 lg:pb-16 lg:-translate-y-10">
                <motion.div
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex flex-col justify-center"
                >
                  <h1 className="heading-1">
                    A Comprehensive
                    <br />
                    Technological
                    <br />
                    Sphere Crafted To Fulfil
                    <br />
                    Modern Digital Needs
                  </h1>

                  <motion.p
                    style={{ opacity: subtextOpacity }}
                    className="heading-4 mt-6 inline-block max-w-lg whitespace-nowrap text-white"
                  >
                    Smart Technology Operations for smoother and hassle-free
                    Operations
                  </motion.p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="flex items-end justify-start lg:justify-end lg:self-end lg:pb-2"
                >
                  <div className="flex justify-start lg:justify-end items-end pt-16 lg:pt-32">
                    <motion.div
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="flex items-center gap-4 text-white/90 hover:text-white transition mb-12 mt-12 lg:mt-28"
                    >
                      <CyclicButton
                        onClick={() => console.log("Start Project Clicked!")}
                      >
                        <Link href="/contact-us">
                          <span className="body-large text-white inline-block whitespace-nowrap">
                            Get a Free Consultation
                          </span>
                        </Link>
                      </CyclicButton>
                    </motion.div>
                  </div>
                </motion.div>
              </SiteContainer>
            </motion.div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 opacity-0">
              <SiteContainer>
                <div ref={measureRef} className="h-0 w-full" />
              </SiteContainer>
            </div>
          </section>

          {/* SERVICES + INDUSTRIES LAYER */}
          <motion.div
            style={{ y: servicesY }}
            className="absolute inset-0 z-10 pointer-events-none"
          >
            <div
              className="absolute inset-x-0 top-[42vh] rounded-t-[12px] bg-[#f2f2f2]"
              style={{ height: "150vh" }}
            />

            <SiteContainer className="relative z-[2] h-full">
              <div className="flex h-full flex-col justify-start px-6 pt-28 pb-14 lg:px-10 lg:pt-20">
                <div className="mb-10 flex flex-col gap-5 lg:mb-14 lg:flex-row lg:items-end lg:justify-between ">
                  <div>
                    <div className="mb-5 flex items-center gap-4">
                      <RotatingDots />

                      <p className="inter-tight text-white">Services</p>
                    </div>

                    <h2 className=" heading-2 ">
                      Transforming Ideas into Powerful Digital <br />
                      Services that Accelerate Success
                    </h2>
                  </div>
                </div>
              </div>
            </SiteContainer>

            <ServiceWhitecardContent />

            <div className="absolute inset-x-0 top-[110vh] z-[4] pointer-events-auto">
              <SiteContainer>
                <div className="px-6 lg:px-10">
                  <div className="mb-5 flex items-center gap-5">
                    <RotatingDots />
                    <p className="inter-tight text-[#01030B]">Industries</p>
                  </div>

                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <h2 className="heading-2 !font-600 max-w-[760px] !text-[#01030B]">
                      Empowering Industries with <br />
                      Innovative Digital Solutions <br />
                      for Sustainable Growth
                    </h2>

                    <p className="inter-tight max-w-[460px] !text-[#01030B] lg:pt-40 letter-spacing-0 line-height-2 ">
                      Delivering tailored digital solutions across a wide range
                      of
                      <br />
                      industries, we help businesses of all kinds innovate,
                      adapt,
                      <br />
                      and grow enabling them to stay competitive and succeed in
                      <br />
                      an ever-evolving digital landscape.
                    </p>
                  </div>
                  <IndustryCarouselLanding />
                </div>
              </SiteContainer>
            </div>
          </motion.div>

          {/* ABOUT CARD */}
          <motion.div
            style={{
              y: cardY,
              height: barHeight,
              width: barWidth,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            }}
            className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2 overflow-hidden"
          >
            <motion.div
              style={{
                bottom: cutHeight,
                borderTopLeftRadius: barRadius,
                borderTopRightRadius: barRadius,
              }}
              className="absolute inset-x-0 top-0 bg-[#f2f2f2]"
            />

            <motion.div
              style={{
                width: rightPanelWidth,
                height: rightPanelHeight,
                clipPath: rightPanelClipPath,
              }}
              className="absolute bottom-0 right-0 bg-[#f2f2f2]"
            />

            <motion.div
              style={{ opacity: labelOpacity }}
              className="pointer-events-none absolute inset-x-0 top-8 z-10 flex items-center justify-center gap-2"
            >
              <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#0D54CA]">
                Scroll to Discover
              </span>
              <ChevronsDown
                className="h-5 w-5 text-[#0D54CA]"
                strokeWidth={2.5}
              />
            </motion.div>

            <motion.div
              style={{
                bottom: cutHeight,
                opacity: aboutContentOpacity,
              }}
              className="absolute inset-x-0 top-0 z-[3] overflow-hidden"
            >
              <SiteContainer className="h-full">
                <div className="flex h-full flex-col items-center justify-center px-6 pt-10 pb-10 text-center">
                  <RotatingDots />

                  <p
                    className="max-w-[1257px] font-[400] text-[28px] leading-[1.22] tracking-[0.03em] text-black sm:text-[34px] sm:leading-[1.22] lg:text-[30px] lg:leading-[38px]"
                    style={{
                      fontFamily:
                        "var(--font-archivo), Arial, Helvetica, sans-serif",
                    }}
                  >
                    <span className="text-[#2666D2]">
                      Spherehead Technologies
                    </span>{" "}
                    is a <span className="text-[#2666D2]">USA established</span>{" "}
                    technology
                    <br />
                    solutions company delivering end-to-end digital services,
                    <br />
                    including software development, digital transformation, and
                    <br />
                    creative technology{" "}
                    <span className="text-[#2666D2]">
                      solutions for global clients.
                    </span>
                  </p>
                </div>
              </SiteContainer>
            </motion.div>

            <motion.div
              style={{
                width: leftPanelWidth,
                height: cutHeight,
                opacity: aboutContentOpacity,
              }}
              className="absolute bottom-0 left-0 z-[3] overflow-hidden"
            >
              <div className="flex h-full items-center px-10 pl-6 sm:px-14 lg:px-16 lg:pl-24">
                <div className="flex w-full max-w-[912px] items-start justify-start gap-8">
                  <div className="about-stat-item">
                    <span className="about-stat-number">30+</span>
                    <span className="about-stat-label mt-3">
                      Projects Delivered
                    </span>
                  </div>

                  <div className="about-stat-item">
                    <span className="about-stat-number">98%</span>
                    <span className="about-stat-label mt-3">
                      Client Satisfaction
                    </span>
                  </div>

                  <div className="about-stat-item">
                    <span className="about-stat-number">16+</span>
                    <span className="about-stat-label mt-3">
                      Countries Served
                    </span>
                  </div>

                  <div className="about-stat-item">
                    <span className="about-stat-number">100+</span>
                    <span className="about-stat-label mt-3">
                      Project Completion
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              style={{
                width: rightPanelWidth,
                height: rightPanelHeight,
                clipPath: rightPanelClipPath,
                opacity: aboutContentOpacity,
              }}
              className="absolute bottom-0 right-0 z-[4] overflow-hidden"
            >
              <div className="flex h-full flex-col items-start bg-[#f2f2f2] px-6 pl-6 pt-10 pb-8 sm:px-8 lg:px-14 lg:pl-14">
                <p className="inter-tight text-[#676767]">
                  Driven by client satisfaction and continuous
                  <br />
                  feedback, we deliver tailored digital solutions
                  <br />
                  that empower businesses worldwide, building
                  <br />
                  lasting partnerships through trust, innovation,
                  <br />
                  and measurable results.
                </p>

                <div className="mt-6 -ml-3 flex items-center gap-0">
                  <Image
                    src="/images/landingPage/aboutsection.svg"
                    alt="About section team"
                    width={154}
                    height={57}
                    className="h-auto w-[154px] scale-[0.85]"
                  />

                  <AboutUsButton className="scale-[0.75]" />
                </div>
              </div>
            </motion.div>

            <div className="relative z-[2] h-screen box-border">
              <SiteContainer className="h-full">
                <div className="h-full" />
              </SiteContainer>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-30 -mt-[200vh] bg-white">
        <TechnologiesSection />
        <TestimonialSection />
      </div>
    </>
  );
}
