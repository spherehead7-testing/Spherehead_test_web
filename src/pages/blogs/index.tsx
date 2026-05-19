import Head from "next/head";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { useScrollContainerContext } from "@/context/ScrollContainerContext";
import BlogsHero from "@/components/blogs/blogs-hero";
import BlogsContent from "@/components/blogs/blogs-content";
import Footer from "@/components/layout/footer";
import { useIsMobile } from "@/hooks/use-is-mobile";

export default function BlogsPage() {
    const isMobile = useIsMobile();

    if (isMobile) {
        return <BlogsMobile />;
    }

    return <BlogsDesktop />;
}

/** Mobile: flat layout, no scroll hijacking */
function BlogsMobile() {
    const dummyProgress = useMotionValue(0);

    return (
        <>
            <Head>
                <title>Blogs | Spherehead Technologies</title>
                <meta
                    name="description"
                    content="Technology, innovation, design, and tech stack insights from Spherehead Technologies."
                />
            </Head>

            <main className="w-full overflow-x-hidden bg-[#01030B] text-[#01030B]">
                <section className="relative bg-gradient-to-r from-[#06142E] via-[#0A2F76] to-[#2666D2]">
                    <BlogsHero progress={dummyProgress} />
                </section>

                <section className="relative z-20 rounded-t-[24px] bg-white shadow-[0_-20px_60px_rgba(0,0,0,0.2)]">
                    <BlogsContent />
                </section>

                <section className="relative z-20 bg-animated-gradient">
                    <Footer />
                </section>
            </main>
        </>
    );
}

/** Desktop: scroll-linked animations with sticky hero */
function BlogsDesktop() {
    const containerRef = useRef<HTMLElement | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const { setScrollContainerRef } = useScrollContainerContext();

    useEffect(() => {
        setScrollContainerRef(scrollContainerRef);
        return () => {
            setScrollContainerRef(null);
        };
    }, [scrollContainerRef, setScrollContainerRef]);

    const { scrollYProgress } = useScroll({
        container: scrollContainerRef,
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <>
            <Head>
                <title>Blogs | Spherehead Technologies</title>
                <meta
                    name="description"
                    content="Technology, innovation, design, and tech stack insights from Spherehead Technologies."
                />
            </Head>

            <main
                ref={scrollContainerRef}
                className="w-full h-screen overflow-y-auto overflow-x-hidden bg-[#01030B] text-[#01030B]"
            >
                <section
                    ref={containerRef}
                    className="relative min-h-[150vh] bg-[#06142E]"
                >
                    <motion.div
                        className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-r from-[#06142E] via-[#0A2F76] to-[#2666D2]"
                    >
                        <BlogsHero progress={smoothProgress} />
                    </motion.div>
                </section>

                <section className="relative z-20 -mt-[50vh] rounded-t-[40px] bg-white shadow-[0_-40px_100px_rgba(0,0,0,0.25)] sm:rounded-t-[60px]">
                    <BlogsContent />
                </section>

                <section className="relative z-20 bg-animated-gradient">
                    <Footer />
                </section>
            </main>
        </>
    );
}
