import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import SiteContainer from "@/components/layout/site-container";
import { ServiceCategoryData } from "@/data/service-categories";

export default function ServicesIntroSection({
    data,
}: {
    data: ServiceCategoryData["intro"];
}) {
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 45,
        damping: 22,
        mass: 1.2,
    });

    const [scrollDir, setScrollDir] = React.useState<"down" | "up">("down");

    const lastScrollY = useRef(0);

    // State machine: idle → stuck → scrolling-up
    // "stuck"  = section is visible, user scrolled up once, we hold position
    // "locked" = scroll-to-hero animation is running, block everything
    type UpScrollState = "idle" | "stuck" | "locked";
    const upScrollState = useRef<UpScrollState>("idle");

    // Whether the intro section is currently fully in the viewport
    const sectionVisible = useRef(false);

    // Cooldown after momentum dies: only accept a new intentional swipe
    // after at least this many ms of no wheel events
    const lastWheelTime = useRef(0);
    const INTENT_GAP_MS = 350; // gap between momentum tail and next swipe

    useEffect(() => {
        // Track visibility with IntersectionObserver
        const observer = new IntersectionObserver(
            ([entry]) => {
                sectionVisible.current = entry.intersectionRatio >= 0.85;
                // Reset state when section leaves view
                if (!sectionVisible.current) {
                    upScrollState.current = "idle";
                }
            },
            { threshold: [0, 0.85, 1] }
        );
        if (containerRef.current) observer.observe(containerRef.current);

        const handleScroll = () => {
            if (upScrollState.current === "locked") return;

            const scrollY = window.scrollY;
            const isScrollingDown = scrollY > lastScrollY.current;
            lastScrollY.current = scrollY;

            if (
                isScrollingDown &&
                scrollY > 20 &&
                scrollY < window.innerHeight * 0.4
            ) {
                upScrollState.current = "locked";
                setScrollDir("down");
                containerRef.current?.scrollIntoView({ behavior: "smooth" });
                setTimeout(() => {
                    upScrollState.current = "idle";
                }, 1500);
            }
        };

        const handleWheel = (e: WheelEvent) => {
            const html = document.documentElement;
            const now = Date.now();

            // Always block wheel during locked (animation running)
            if (upScrollState.current === "locked") {
                e.preventDefault();
                return;
            }

            const isScrollingUp = e.deltaY < 0;

            if (!isScrollingUp) {
                // Scrolling down — reset stuck state so user can re-enter
                if (upScrollState.current === "stuck") {
                    upScrollState.current = "idle";
                }
                lastWheelTime.current = now;
                return;
            }

            // --- Upward scroll handling ---

            if (!sectionVisible.current) {
                lastWheelTime.current = now;
                return; // Section not in view, don't intercept
            }

            if (upScrollState.current === "idle") {
                // First upward swipe while section is visible → get stuck
                e.preventDefault();
                upScrollState.current = "stuck";
                lastWheelTime.current = now;
                return;
            }

            if (upScrollState.current === "stuck") {
                const timeSinceLast = now - lastWheelTime.current;
                lastWheelTime.current = now;

                // Still in momentum tail — keep blocking
                if (timeSinceLast < INTENT_GAP_MS) {
                    e.preventDefault();
                    return;
                }

                // Gap detected → this is a new intentional swipe, scroll to hero
                e.preventDefault();
                upScrollState.current = "locked";
                setScrollDir("up");

                html.style.scrollBehavior = "auto";

                const scrollStart = window.scrollY;
                const scrollDuration = 1800;
                const t0 = performance.now();

                const step = (ts: number) => {
                    const elapsed = ts - t0;
                    const t = Math.min(elapsed / scrollDuration, 1);
                    const ease =
                        t < 0.5
                            ? 4 * t * t * t
                            : 1 - Math.pow(-2 * t + 2, 3) / 2;
                    window.scrollTo({
                        top: Math.round(scrollStart * (1 - ease)),
                        behavior: "instant" as ScrollBehavior,
                    });
                    if (t < 1) {
                        requestAnimationFrame(step);
                    } else {
                        html.style.scrollBehavior = "smooth";
                    }
                };
                requestAnimationFrame(step);

                setTimeout(() => {
                    html.style.scrollBehavior = "smooth";
                    upScrollState.current = "idle";
                }, 2200);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("wheel", handleWheel);
        };
    }, []);

    const col1YDown = useTransform(smoothProgress, [0, 1], ["0%", "0%"]);

    const col2YDown = useTransform(smoothProgress, [0, 1], ["55%", "0%"]);

    const col3YDown = useTransform(smoothProgress, [0, 1], ["80%", "0%"]);

    const col1YUp = useTransform(smoothProgress, [0, 1], ["30%", "0%"]);

    const col2YUp = useTransform(smoothProgress, [0, 1], ["110%", "0%"]);

    const col3YUp = useTransform(smoothProgress, [0, 1], ["180%", "0%"]);

    const col1Y = scrollDir === "down" ? col1YDown : col1YUp;
    const col2Y = scrollDir === "down" ? col2YDown : col2YUp;
    const col3Y = scrollDir === "down" ? col3YDown : col3YUp;

    const contentYDown = useTransform(smoothProgress, [0, 1], ["75vh", "0vh"]);
    const contentYUp = useTransform(smoothProgress, [0, 1], ["180vh", "0vh"]);

    const contentY = scrollDir === "down" ? contentYDown : contentYUp;

    return (
        <section
            ref={containerRef}
            className="relative z-30 isolate flex h-screen w-full max-w-full flex-col justify-center overflow-hidden"
        >
            <div className="pointer-events-none absolute inset-0 flex h-[120vh] w-full">
                <motion.div
                    style={{ y: col1Y }}
                    className="h-full w-1/3 bg-white"
                />

                <motion.div
                    style={{ y: col2Y }}
                    className="h-full w-1/3 bg-white"
                />

                <motion.div
                    style={{ y: col3Y }}
                    className="h-full w-1/3 bg-white"
                />
            </div>

            <motion.div style={{ y: contentY }} className="relative w-full">
                <SiteContainer className="relative flex h-full max-h-[950px] flex-col justify-center py-6 lg:py-10">
                    <div className="w-full max-w-[1100px]">
                        <p
                            className="heading-2 !text-[#01030B]"
                            dangerouslySetInnerHTML={{
                                __html: data.mainText,
                            }}
                        />
                    </div>

                    <div className="my-5 h-[1px] w-full origin-left bg-gray-200 lg:my-8" />

                    <div className="grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-[3.5fr_6.5fr] lg:gap-16">
                        <div className="relative mx-auto aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-[4px] bg-animated-gradient lg:mx-0 lg:max-w-[360px]">
                            <div className="absolute inset-6 z-10 overflow-hidden rounded-2xl lg:inset-8">
                                <Image
                                    src={data.image}
                                    alt="Section Image"
                                    fill
                                    sizes="(max-width: 768px) 260px,
                                    (max-width: 1200px) 360px,
                                    360px"
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex w-full flex-col lg:mt-16">
                            <p
                                className="heading-3"
                                style={{
                                    color: "#01030B",
                                }}
                            >
                                {data.heading}
                            </p>

                            <div className="mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-12 lg:gap-16">
                                <p
                                    className="body-small pr-2 lg:pr-0"
                                    style={{
                                        color: "#8A8B8F",
                                        lineHeight: "1.6",
                                    }}
                                >
                                    {data.p1}
                                </p>

                                <p
                                    className="body-small pr-2 lg:pr-0"
                                    style={{
                                        color: "#8A8B8F",
                                        lineHeight: "1.6",
                                    }}
                                >
                                    {data.p2}
                                </p>
                            </div>
                        </div>
                    </div>
                </SiteContainer>
            </motion.div>
        </section>
    );
}
