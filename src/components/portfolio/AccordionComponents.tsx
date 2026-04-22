import React from "react";
import { motion, Variants } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import Image from "next/image";
import { Project } from "./data";

// ─────────────────────────────────────────
// ProjectListItemHeader
// ─────────────────────────────────────────
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
      className="w-full py-8 lg:py-10 bg-white cursor-pointer group hover:bg-[#F6F6F6] transition-colors site-background-fixed-root"
    >
      <SiteContainer className="flex items-center justify-between gap-6 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-12 flex-grow">
          <h3 className="heading-3 text-[#01030B] group-hover:text-[#0D54CA] transition-colors flex-shrink-0">
            {project.title}
          </h3>

          <div className="flex flex-col items-start sm:items-end gap-1 sm:gap-2 whitespace-nowrap">
            <span className="sm:inline inter-tight text-[#01030B] group-hover:text-[#0D54CA] transition-colors">
              {project.servicesLine}
            </span>
          </div>
        </div>
      </SiteContainer>
    </div>
  );
};

// ─────────────────────────────────────────
// ProjectDetailView
// ─────────────────────────────────────────
interface ProjectDetailViewProps {
  project: Project;
  onClose: () => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  onClose,
}) => {
  // Each child animates independently with its own initial/animate.
  // DO NOT nest these inside a parent motion.div that also animates opacity,
  // or the children will be invisible while the parent fades in.

  const laptopVariants: Variants = {
    hidden: { x: "-18%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.75, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.4, ease: "easeOut" },
    },
  };

  const serviceItemVariants: Variants = {
    hidden: { opacity: 0, x: 12 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay: 0.45 + i * 0.08, ease: "easeOut" },
    }),
  };

  return (
    <div
      className="w-full py-10 lg:py-24 overflow-hidden site-background-fixed-root"
      style={{ backgroundColor: project.bgColor }}
    >
      <SiteContainer className="flex flex-col gap-8 lg:gap-16 relative z-10 text-white">
        <div className="flex flex-col gap-8 lg:gap-16">

          {/* ── Title + Close ── */}
          <div className="w-full flex flex-col gap-4 max-w-5xl">
            <div className="flex flex-row items-center justify-between gap-6 lg:border-b lg:border-white/10 sm:pb-4">
              <motion.h2
                className="heading-1 !text-4xl lg:!text-[72px] lg:leading-[90px] text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
              >
                {project.title}
              </motion.h2>

              <div
                onClick={onClose}
                className="flex items-center gap-2 whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span className="inter-tight text-white/90 text-sm tracking-widest">
                  CLOSE
                </span>
              </div>
            </div>
          </div>

          {/* ── DESKTOP: 3-column grid ── */}
          {/* NO wrapping motion.div — children each own their animation */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-16 lg:items-start w-full">

            {/* LEFT: Laptop slides in from left */}
            <motion.div
              className="col-span-4 flex items-center justify-center -ml-12"
              variants={laptopVariants}
              initial="hidden"
              animate="visible"
            >
              <Image
                src={project.expandedContent.laptopImage}
                alt={`${project.title} laptop view`}
                width={600}
                height={400}
                className="object-contain"
              />
            </motion.div>

            {/* MIDDLE: Tablet + description fades up */}
            <motion.div
              className="col-span-4 flex flex-col items-center gap-10 -mr-12"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <Image
                src={project.expandedContent.tabletImage}
                alt={`${project.title} tablet view`}
                width={400}
                height={300}
                className="object-cover border-[10px] border-[#01030B] bg-[#01030B] rounded-2xl shadow-2xl"
              />
              <div
                className="heading-3 max-w-lg leading-relaxed text-white"
                dangerouslySetInnerHTML={{ __html: project.expandedContent.descriptionHtml }}
              />
            </motion.div>

            {/* RIGHT: Services stagger in */}
            <div className="col-span-4 flex flex-col items-start gap-3 mt-4">
              {project.expandedContent.services.map((service, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2"
                  custom={index}
                  variants={serviceItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <span className="inter-tight text-white/70">{service}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── MOBILE: Laptop left, services right, then description ── */}
          <div className="flex lg:hidden flex-col w-full">
            <div className="flex flex-row items-center justify-between w-full mt-2 gap-4">

              {/* Laptop slides in from left */}
              <motion.div
                className="w-3/5 flex justify-start -ml-6 relative"
                variants={laptopVariants}
                initial="hidden"
                animate="visible"
              >
                <Image
                  src={project.expandedContent.laptopImage}
                  alt={`${project.title} laptop mobile view`}
                  width={400}
                  height={300}
                  className="object-contain scale-110 origin-left"
                />
              </motion.div>

              {/* Services fade up on the right */}
              <motion.div
                className="w-2/5 flex flex-col items-end justify-center gap-3 pr-2"
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
              >
                {project.expandedContent.services.map((service, index) => (
                  <span
                    key={index}
                    className="inter-tight text-white/90 text-sm text-right"
                  >
                    {service}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Description below */}
            <motion.div
              className="flex flex-col mt-8 w-full"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <div
                className="heading-3 leading-relaxed text-white text-base"
                dangerouslySetInnerHTML={{ __html: project.expandedContent.descriptionHtml }}
              />
            </motion.div>
          </div>

        </div>
      </SiteContainer>
    </div>
  );
};