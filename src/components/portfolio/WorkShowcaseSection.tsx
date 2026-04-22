"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import { ProjectListItemHeader, ProjectDetailView } from "./AccordionComponents";
import { projects } from "./data";
import RotatingDots from "@/components/ui/rotating-dots";
import useCurtainRevealScroll from "@/hooks/useCurtainRevealScroll";
import Footer from "@/components/layout/footer";

export default function WorkShowcaseSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);

  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const showShowcase = () => {
    if (isAnimating || isVisible) return;
    setIsAnimating(true);
    setIsVisible(true);
    setTimeout(() => setIsAnimating(false), 900);
  };

  const hideShowcase = () => {
    if (isAnimating || !isVisible) return;
    setIsAnimating(true);
    setIsVisible(false);
    setTimeout(() => setIsAnimating(false), 850);
  };

  useCurtainRevealScroll({
    onReveal: showShowcase,
    onDismiss: hideShowcase,
    scrollContainerRef: showcaseRef,
    isVisible,
    isAnimating,
  });

  const introHtml = `With a dedicated team focused on creativity and excellence, Spherehead crafts <span class="text-[#0D54CA]">impactful projects</span> that showcase innovation, drive results, and bring <span class="text-[#0D54CA]">ideas to life</span> for our clients.`;

  return (
    <>
      <div id="work-showcase" className="absolute top-0" />

      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="showcase-panel"
            initial={{ clipPath: "inset(90% 90% 0% 0%)" }}
            animate={{
              clipPath: "inset(0% 0% 0% 0%)",
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            }}
            exit={{
              clipPath: "inset(90% 90% 0% 0%)",
              transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
            }}
            className="fixed inset-0 z-20 bg-white"
            style={{ willChange: "clip-path" }}
          >
            <div
              ref={showcaseRef}
              className="w-full h-full overflow-y-auto overflow-x-hidden"
            >
              <section className="relative w-full py-16 lg:py-24 bg-white text-[#01030B]">
                <SiteContainer className="flex flex-col gap-10 lg:gap-16 relative z-10">
                  <div className="w-full flex flex-col gap-10">
                    <div className="w-full flex flex-col gap-6 lg:gap-8 max-w-4xl">
                      <div className="flex items-center gap-4 mb-6">
                        <RotatingDots />
                        <span className="body-small tracking-[0.1em] text-[#01030B] uppercase font-bold">
                          Projects delivered
                        </span>
                      </div>
                      <div className="flex flex-col gap-4 lg:gap-6">
                        <h2
                          className="heading-2 !text-[#01030B] max-w-5xl leading-tight"
                          dangerouslySetInnerHTML={{ __html: introHtml }}
                        />
                      </div>
                    </div>
                  </div>
                </SiteContainer>
              </section>

              <section className="relative w-full bg-white text-[#01030B]">
                <div className="w-full flex flex-col relative z-10">
                  {projects.map((project) => {
                    const isExpanded = expandedProjectId === project.id;
                    return (
                      <div key={project.id} className="w-full">
                        <ProjectListItemHeader
                          project={project}
                          isExpanded={isExpanded}
                          onClick={() =>
                            setExpandedProjectId((prev) =>
                              prev === project.id ? null : project.id,
                            )
                          }
                        />
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              key={project.id}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                                transition: {
                                  height: { duration: 0.7, ease: [0.04, 0.62, 0.23, 0.98] },
                                  opacity: { duration: 0.4, delay: 0.1, ease: "easeOut" },
                                },
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                                transition: {
                                  height: { duration: 0.5, ease: "easeInOut" },
                                  opacity: { duration: 0.25, ease: "easeIn" },
                                },
                              }}
                              style={{ overflow: "hidden" }}
                            >
                              <ProjectDetailView
                                project={project}
                                onClose={() => setExpandedProjectId(null)}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* DROP THE FOOTER RIGHT HERE! */}
              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}