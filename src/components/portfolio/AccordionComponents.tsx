import React from "react";
import { motion, Variants } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import Image from "next/image";
import { Project } from "./data";

// ─────────────────────────────────────────────────────────────
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
        <h3
          className={`heading-3 transition-colors flex-shrink-0 ${
            isExpanded ? "text-[#0D54CA]" : "text-[#01030B] group-hover:text-[#0D54CA]"
          }`}
        >
          {project.title}
        </h3>
        <span
          className={`inter-tight text-sm transition-colors whitespace-nowrap ${
            isExpanded ? "text-[#0D54CA]" : "text-[#6B6B6B] group-hover:text-[#0D54CA]"
          }`}
        >
          {project.servicesLine}
        </span>
      </SiteContainer>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// ProjectDetailView
// Matches reference: laptop left | tablet+desc center | services right
// ─────────────────────────────────────────────────────────────
interface ProjectDetailViewProps {
  project: Project;
  onClose: () => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  onClose,
}) => {
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

  return (
    <div
      className="w-full"
      style={{ backgroundColor: project.bgColor }}
    >
      <SiteContainer className="py-10 lg:py-16">

        {/* ── Title row ── */}
        <div className="flex items-start justify-between gap-6 pb-6 lg:pb-10 border-b border-white/10">
          <motion.h2
            className="text-white font-light tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            {project.title}
          </motion.h2>

          <button
            onClick={onClose}
            className="inter-tight text-white/70 text-sm tracking-[0.15em] hover:text-white transition-colors pt-2 flex-shrink-0"
          >
            CLOSE
          </button>
        </div>

        {/* ── DESKTOP: 3-column grid ── */}
        <div className="hidden lg:grid grid-cols-12 gap-8 xl:gap-12 mt-10 lg:mt-12 items-start">

          {/* COL 1 — Laptop image (slides in from left) */}
          <motion.div
            className="col-span-4"
            variants={laptopVariants}
            initial="hidden"
            animate="visible"
          >
            <Image
              src={project.expandedContent.laptopImage}
              alt={`${project.title} laptop`}
              width={560}
              height={380}
              className="w-full h-auto object-contain"
            />
          </motion.div>

          {/* COL 2 — Tablet image + description (fades up) */}
          <motion.div
            className="col-span-5 flex flex-col gap-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <Image
              src={project.expandedContent.tabletImage}
              alt={`${project.title} tablet`}
              width={520}
              height={360}
              className="w-full h-auto object-cover rounded-xl border-[8px] border-black/80 shadow-xl"
            />
          </motion.div>

          {/* COL 3 — Services list (staggers in) */}
          <div className="col-span-3 flex flex-col gap-2 pt-2">
            {project.expandedContent.services.map((service, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2.5"
                custom={i}
                variants={serviceItem}
                initial="hidden"
                animate="visible"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/30 flex-shrink-0" />
                <span className="inter-tight text-white/60 text-sm">{service}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── MOBILE layout ── */}
        <div className="flex lg:hidden flex-col gap-6 mt-8">

          {/* Laptop + services side by side */}
          <div className="flex items-start gap-4">
            <motion.div
              className="w-3/5"
              variants={laptopVariants}
              initial="hidden"
              animate="visible"
            >
              <Image
                src={project.expandedContent.laptopImage}
                alt={`${project.title} laptop`}
                width={400}
                height={280}
                className="w-full h-auto object-contain"
              />
            </motion.div>

            <motion.div
              className="w-2/5 flex flex-col items-end gap-2 pt-2"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {project.expandedContent.services.map((service, i) => (
                <span key={i} className="inter-tight text-white/80 text-xs text-right">
                  {service}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

      </SiteContainer>
    </div>
  );
};