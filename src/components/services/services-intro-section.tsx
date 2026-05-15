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
        stiffness: 60,
        damping: 30,
        mass: 0.8,
    });

    const [scrollDir, setScrollDir] = React.useState<"down" | "up">("down");

    // Auto-scroll logic: Handle both down (from Hero) and up (from Intro)
    const lastScrollY = useRef(0);

    useEffect(() => {
        let isAutoScrolling = false;

        const handleScroll = () => {
            if (isAutoScrolling) return;

            const scrollY = window.scrollY;
            const isScrollingDown = scrollY > lastScrollY.current;
            const isScrollingUp = scrollY < lastScrollY.current;
            lastScrollY.current = scrollY;

            const html = document.documentElement;

            // 1. Scrolling DOWN from Hero
            if (
                isScrollingDown &&
                scrollY > 20 &&
                scrollY < window.innerHeight * 0.4
            ) {
                isAutoScrolling = true;
                setScrollDir("down");

                html.classList.remove("snap-y", "snap-mandatory");
                containerRef.current?.scrollIntoView({ behavior: "smooth" });

                setTimeout(() => {
                    html.classList.add("snap-y", "snap-mandatory");
                    isAutoScrolling = false;
                }, 1200);
            }

            // 2. Scrolling UP from Intro
            else if (
                isScrollingUp &&
                scrollY < window.innerHeight - 20 &&
                scrollY > window.innerHeight * 0.6
            ) {
                isAutoScrolling = true;
                setScrollDir("up");

                html.classList.remove("snap-y", "snap-mandatory");
                window.scrollTo({ top: 0, behavior: "smooth" });

                setTimeout(() => {
                    html.classList.add("snap-y", "snap-mandatory");
                    isAutoScrolling = false;
                }, 1200);
            }
        };

        const handleWheel = (e: WheelEvent) => {
            if (isAutoScrolling) {
                e.preventDefault();
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("wheel", handleWheel);
        };
    }, []);

    // 1. CURTAINS
    // Downwards Animation
    const col1YDown = useTransform(smoothProgress, [0.0, 1.0], ["0%", "0%"]);
    const col2YDown = useTransform(
        smoothProgress,
        [0.0, 0.55, 1.0],
        ["55%", "55%", "0%"],
    );
    const col3YDown = useTransform(
        smoothProgress,
        [0.0, 0.66, 1.0],
        ["66%", "66%", "0%"],
    );

    // Upwards Animation (Right drops first, then Middle, Left stays)
    const col1YUp = useTransform(smoothProgress, [0.0, 1.0], ["0%", "0%"]); // Left stays at 0%
    const col2YUp = useTransform(
        smoothProgress,
        [0.0, 0.55, 1.0],
        ["60%", "60%", "0%"],
    ); // Middle to 60%
    const col3YUp = useTransform(
        smoothProgress,
        [0.0, 0.8, 1.0],
        ["80%", "80%", "0%"],
    ); // Right to 80%

    const col1Y = scrollDir === "down" ? col1YDown : col1YUp;
    const col2Y = scrollDir === "down" ? col2YDown : col2YUp;
    const col3Y = scrollDir === "down" ? col3YDown : col3YUp;

    // 2. MAIN TEXT (Top Left)
    // Fade in text safely after backgrounds have mostly come up
    const content1Opacity = useTransform(smoothProgress, [0.75, 1.0], [0, 1]);
    const content1Y = useTransform(smoothProgress, [0.75, 1.0], [150, 0]);

    // 3. DIVIDER
    const content2Opacity = useTransform(smoothProgress, [0.8, 1.0], [0, 1]);
    const content2Y = useTransform(smoothProgress, [0.8, 1.0], [150, 0]);

    // 4. BOTTOM TEXT & IMAGE BOX
    const content3Opacity = useTransform(smoothProgress, [0.85, 1.0], [0, 1]);
    const content3Y = useTransform(smoothProgress, [0.85, 1.0], [150, 0]);

    const boxOpacity = useTransform(smoothProgress, [0.8, 1.0], [0, 1]);
    const boxY = useTransform(smoothProgress, [0.8, 1.0], [200, 0]);
    const ringImageY = useTransform(smoothProgress, [0.8, 1.0], [100, 0]);

    return (
        <section
            ref={containerRef}
            className="relative z-30 isolate w-full max-w-full h-[100vh] flex flex-col justify-center overflow-hidden snap-start"
        >
            {/* --- COLUMNS --- */}
            {/* Made them h-[120vh] instead of h-full so they have extra height extending past the screen */}
            <div className="absolute inset-0 flex w-full h-[120vh] pointer-events-none">
                <motion.div
                    style={{ y: col1Y }}
                    className="w-1/3 h-full bg-white"
                />
                <motion.div
                    style={{ y: col2Y }}
                    className="w-1/3 h-full bg-white"
                />
                <motion.div
                    style={{ y: col3Y }}
                    className="w-1/3 h-full bg-white"
                />
            </div>

            <SiteContainer className="relative flex flex-col justify-center py-6 lg:py-10 h-full max-h-[950px]">
                {/* --- MAIN TEXT --- */}
                <motion.div
                    style={{ opacity: content1Opacity, y: content1Y }}
                    className="w-full max-w-[1100px]"
                >
                    <p
                        className="heading-2 !text-[#01030B]"
                        dangerouslySetInnerHTML={{ __html: data.mainText }}
                    />
                </motion.div>

                {/* --- DIVIDER --- */}
                <motion.div
                    style={{ opacity: content2Opacity, y: content2Y }}
                    className="w-full h-[1px] bg-gray-200 my-5 lg:my-8 origin-left"
                />

                <div className="grid grid-cols-1 lg:grid-cols-[3.5fr_6.5fr] gap-8 lg:gap-16 items-start w-full">
                    {/* --- IMAGE BOX --- */}
                    <motion.div
                        // FIXED: Changed 'content2Opacity' to 'boxOpacity'
                        style={{ opacity: boxOpacity, y: boxY }}
                        className="relative w-full aspect-[4/5] max-w-[300px] lg:max-w-[420px] mx-auto lg:mx-0 overflow-hidden bg-animated-gradient"
                    >
                        <motion.div
                            style={{ y: ringImageY }}
                            className="absolute inset-6 lg:inset-8 z-10 overflow-hidden"
                        >
                            <Image
                                src={data.image}
                                alt="Section Image"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-contain"
                            />
                        </motion.div>
                    </motion.div>

                    {/* --- SUB TEXT CONTENT --- */}
                    <motion.div
                        style={{ opacity: content3Opacity, y: content3Y }}
                        className="flex flex-col w-full mt-8 lg:mt-16"
                    >
                        <p className="heading-3" style={{ color: "#01030B" }}>
                            {data.heading}
                        </p>

                        {/* FIXED: Changed max-w-2xl to max-w-4xl (or w-full) so the grid can stretch further right! */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-16 mt-8 lg:mt-12 max-w-4xl">
                            <p
                                className="body-small pr-2 lg:pr-0"
                                style={{ color: "#8A8B8F", lineHeight: "1.6" }}
                            >
                                {data.p1}
                            </p>
                            <p
                                className="body-small pr-2 lg:pr-0"
                                style={{ color: "#8A8B8F", lineHeight: "1.6" }}
                            >
                                {data.p2}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </SiteContainer>
        </section>
    );
}
