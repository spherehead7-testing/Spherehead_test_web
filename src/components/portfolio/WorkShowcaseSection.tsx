"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import { ProjectListItemHeader, ProjectDetailView } from "./AccordionComponents";
import { projects } from "./data";
import RotatingDots from "@/components/ui/rotating-dots";

export default function WorkShowcaseSection() {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(
    projects.length > 0 ? projects[0].id : null,
  );

  const toggleProjectExpansion = (projectId: string) => {
    if (expandedProjectId === projectId) {
      setExpandedProjectId(null);
    } else {
      setExpandedProjectId(projectId);
    }
  };

  const introHtml = `With a dedicated team focused on creativity and excellence, Spherehead crafts <span class="text-[#0D54CA]">impactful projects</span> that showcase innovation, drive results, and bring <span class="text-[#0D54CA]">ideas to life</span> for our clients.`;

  return (
    // THE FIX: Added 'z-10' and 'shadow-2xl'. 
    // Because the Hero is now sticky (z-0), this section will naturally slide up and cover it as you scroll!
    <div
      id="work-showcase"
      className="relative z-10 w-full bg-white overflow-hidden shadow-2xl"
    >
        {/* We removed the Framer Motion wrapper here. CSS handles the slide-up perfectly now! */}
        
        <section className="relative w-full py-16 lg:py-24 bg-white text-[#01030B] site-background-fixed-root">
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
                    onClick={() => toggleProjectExpansion(project.id)}
                  />

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          transition: { duration: 0.8, ease: "easeOut" },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: { duration: 0.6, ease: "easeInOut" },
                        }}
                        className="w-full overflow-hidden"
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
        
    </div>
  );
}