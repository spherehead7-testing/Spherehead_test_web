import Head from "next/head";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { useScrollContainerContext } from "@/context/ScrollContainerContext";
import NewsHero from "@/components/news/news-hero";
import NewsContent from "@/components/news/news-content";
import Footer from "@/components/layout/footer";
import { useIsMobile } from "@/hooks/use-is-mobile";

export default function NewsPage() {
    const isMobile = useIsMobile();

    if (isMobile) {
        return <NewsMobile />;
    }

    return <NewsDesktop />;
}

/** Mobile: flat layout, no scroll hijacking */
function NewsMobile() {
    const dummyProgress = useMotionValue(0);

    return (
        <>
            <Head>
                <title>News | Spherehead Technologies</title>
                <meta
                    name="description"
                    content="Latest news and updates from Spherehead Technologies."
                />
            </Head>

            <main className="w-full overflow-x-hidden text-[#01030B] bg-white">
                <section className="relative bg-animated-gradient">
                    <NewsHero progress={dummyProgress} />
                </section>

                <section className="relative z-20 bg-white">
                    <NewsContent />
                </section>

                <section className="relative z-20 bg-animated-gradient">
                    <Footer />
                </section>
            </main>
        </>
    );
}

/** Desktop: scroll-linked animations with sticky hero */
function NewsDesktop() {
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
                <title>News | Spherehead Technologies</title>
                <meta
                    name="description"
                    content="Latest news and updates from Spherehead Technologies."
                />
            </Head>

            <main
                ref={scrollContainerRef}
                className="w-full h-screen overflow-y-auto overflow-x-hidden text-[#01030B] bg-animated-gradient services-list-scroll"
            >
                <section
                    ref={containerRef}
                    className="relative min-h-[150vh]"
                >
                    <motion.div
                        className="sticky top-0 h-screen w-full overflow-hidden"
                    >
                        <NewsHero progress={smoothProgress} />
                    </motion.div>
                </section>

                <section className="relative z-20 -mt-[50vh] rounded-t-[40px] bg-white shadow-[0_-40px_100px_rgba(0,0,0,0.25)] sm:rounded-t-[60px]">
                    <NewsContent />
                </section>

                <section className="relative z-20 bg-animated-gradient">
                    <Footer />
                </section>
            </main>
        </>
    );
}
