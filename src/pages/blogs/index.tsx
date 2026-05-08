import Head from "next/head";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import BlogsHero from "@/components/blogs/blogs-hero";
import BlogsContent from "@/components/blogs/blogs-content";
import BlogsTransitionPanel from "@/components/blogs/blogs-transition-panel";

export default function BlogsPage() {
  const sceneRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const panelLeft = useTransform(
    scrollYProgress,
    [0, 0.06, 0.2, 0.74, 1],
    ["100vw", "66vw", "50vw", "12vw", "0vw"],
  );
  const panelTop = useTransform(
    scrollYProgress,
    [0, 0.18, 0.72, 1],
    ["104px", "64px", "24px", "0px"],
  );
  const panelHeight = useTransform(
    scrollYProgress,
    [0, 0.18, 0.72, 1],
    ["calc(100vh - 104px)", "calc(100vh - 64px)", "calc(100vh - 24px)", "100vh"],
  );

  return (
    <>
      <Head>
        <title>Blogs | Spherehead Technologies</title>
        <meta
          name="description"
          content="Technology, innovation, design, and tech stack insights from Spherehead Technologies."
        />
      </Head>

      <main className="min-h-screen bg-white text-[#01030B]">
        <section
          ref={sceneRef}
          className="relative min-h-[220vh] overflow-clip bg-gradient-to-r from-[#06142E] via-[#0A2F76] to-[#2666D2]"
        >
          <div className="sticky top-0 h-screen overflow-hidden">
            <BlogsHero />

            <motion.div
              style={{
                left: panelLeft,
                top: panelTop,
                height: panelHeight,
              }}
              className="pointer-events-none absolute right-0 z-20 overflow-hidden bg-white shadow-[0_0_80px_rgba(0,0,0,0.08)]"
            >
              <BlogsTransitionPanel />
            </motion.div>
          </div>
        </section>

        <BlogsContent />
      </main>
    </>
  );
}
