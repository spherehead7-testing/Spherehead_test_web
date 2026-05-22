import React from "react";
import { motion, Variants } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import Image from "next/image";
import { Project } from "./data";
import { useIsMobile } from "@/hooks/use-is-mobile";

// ProjectListItemHeader
// ─────────────────────────────────────────────────────────────
interface ProjectListItemHeaderProps {
  project: Project;
  isExpanded: boolean;
  onClick: () => void;
}

export const ProjectListItemHeader: React.FC<ProjectListItemHeaderProps> = ({
  project,
  isExpanded,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="w-full py-6 lg:py-8 bg-white cursor-pointer group hover:bg-[#F6F6F6] transition-colors border-b border-[#E5E5E5]"
    >
      <SiteContainer className="flex items-center justify-between gap-6">
        
        {/* Project Title locked to #01030B */}
        <h3 className="body-large text-[#01030B] transition-colors flex-shrink-0">
          {project.title}
        </h3>
        {/* Services Line with a strictly locked width for uniformity */}
        <div className="w-[160px] sm:w-[300px] md:w-[380px] flex-shrink-0 ml-auto">
          <span className="body-extra-small text-[#01030B] transition-colors text-right block w-full pt-2 pb-2">
            {project.servicesLine}
          </span>
        </div>
      </SiteContainer>
    </div>
  );
};

interface ProjectDetailViewProps {
  project: Project;
  onClose: () => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  onClose,
}) => {
  const isMobile = useIsMobile();

  const laptopVariants: Variants = {
    hidden: { x: "-12%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.7, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay: 0.35, ease: "easeOut" },
    },
  };

  const serviceItem: Variants = {
    hidden: { opacity: 0, x: 8 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, delay: 0.4 + i * 0.07, ease: "easeOut" },
    }),
  };

  // ── PURE STATIC MOBILE LAYOUT ──
  if (isMobile) {
    return (
      <div style={{ backgroundColor: project.bgColor }} className="w-full">
        <SiteContainer className="h-full flex flex-col py-4 pb-6">
          <div className="flex items-center justify-between gap-6 pb-4 border-b border-white flex-shrink-0">
            <h2 
              className="text-white font-light tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.05 }}
            >
              {project.title}
            </h2>
            <button
              onClick={onClose}
              className="body-extra-small text-white tracking-[0.15em] hover:text-white transition-colors flex-shrink-0 uppercase"
            >
              CLOSE
            </button>
          </div>

          <div className="flex flex-col gap-4 flex-1 mt-4 min-h-0 overflow-hidden">
            <div className="flex items-end justify-between gap-4 h-full">
             <div className="w-[75%]">
                <Image
                  src={project.expandedContent.laptopImage}
                  alt={`${project.title} laptop`}
                  width={400}
                  height={280}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="w-[25%] flex flex-col items-end justify-end gap-2 pb-2 mt-auto">
                {project.expandedContent.services.map((service, i) => (
                  <span
                    key={i}
                    className="body-small text-white text-right block"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </SiteContainer>
      </div>
    );
  }

  // ── DESKTOP LAYOUT (Unchanged) ──
  return (
    <div style={{ backgroundColor: project.bgColor, minHeight: "62vh" }} className="w-full">
      <SiteContainer className="h-full flex flex-col py-6 lg:py-8">
        {/* ... [Keep all your existing desktop grid/motion code here] ... */}
        <div className="flex items-center justify-between gap-6 pb-4 border-b border-white flex-shrink-0">
          <motion.h2
            className="text-white font-light tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.05 }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            {project.title}
          </motion.h2>

          <button
            onClick={onClose}
            className="body-extra-small text-white tracking-[0.15em] hover:text-white transition-colors flex-shrink-0 uppercase"
          >
            CLOSE
          </button>
        </div>

        <div className="hidden lg:grid grid-cols-12 gap-8 xl:gap-10 flex-1 mt-6 min-h-0">
          <motion.div className="col-span-4 h-full flex items-end pb-2" variants={laptopVariants} initial="hidden" animate="visible">
            <Image src={project.expandedContent.laptopImage} alt={`${project.title} laptop`} width={520} height={340} className="w-full h-auto object-contain max-h-[42vh]" />
          </motion.div>

          <motion.div className="col-span-5 h-full flex flex-col items-start justify-end pb-2 min-h-0" variants={fadeUp} initial="hidden" animate="visible">
            <Image src={project.expandedContent.tabletImage} alt={`${project.title} tablet`} width={240} height={180} className="w-[60%] max-w-[320px] h-auto object-contain rounded-lg border-[3px] border-black/40 shadow-2xl" />
          </motion.div>

          <div className="col-span-3 h-full flex flex-col items-end justify-end gap-2 pb-2">
            {project.expandedContent.services.map((service, i) => (
              <motion.div key={i} custom={i} variants={serviceItem} initial="hidden" animate="visible">
                <span className="body-small text-white text-right block">{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </SiteContainer>
    </div>
  );
};