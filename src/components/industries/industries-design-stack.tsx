"use client";

import { motion, Variants } from "framer-motion";
import RotatingDots from "../ui/rotating-dots";

// ── Icon Box (supports image URL) ──
type IconBoxProps = {
  src?: string;
};

const IconBox = ({ src }: IconBoxProps) => (
  <div className="w-11 h-11 flex items-center justify-center">
    {src ? (
      <img src={src} alt="icon" className="w-7 h-7 object-contain" />
    ) : (
      <div className="w-4 h-4 bg-white/20 rounded-sm" />
    )}
  </div>
);

// ── Tool Row ──
function ToolRow({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <div className="group">
      {/* TOP LINE */}
      <div className="relative h-px w-full overflow-hidden bg-white/15">
        <span className="absolute left-0 top-0 h-full w-0 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 transition-all duration-500 group-hover:w-full" />
      </div>

      {/* CONTENT */}
      <motion.div
        whileHover={{ x: 4 }}
        className="flex items-center gap-4 py-4 cursor-pointer"
      >
        <div className="shrink-0">{icon}</div>

        <span className="text-white/80 text-sm group-hover:text-white transition">
          {name}
        </span>
      </motion.div>

      {/* BOTTOM LINE */}
      <div className="relative h-px w-full overflow-hidden bg-white/15">
        <span className="absolute left-0 top-0 h-full w-0 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 transition-all duration-500 group-hover:w-full" />
      </div>
    </div>
  );
}

// ── DATA (PUT YOUR IMAGE URL HERE) ──
const columns = [
  [
    {
      icon: (
        <IconBox src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776859793/adobe-illustrator-svgrepo-com_q8qpxf.webp" />
      ),
      name: "Adobe Illustrator",
    },
    {
      icon: (
        <IconBox src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776859790/blender-svgrepo-com_qjarat.webp" />
      ),
      name: "Blender",
    },
    {
      icon: (
        <IconBox src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776859790/SketchUp_lyiqvx.webp" />
      ),
      name: "SketchUp",
    },
    {
      icon: (
        <IconBox src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776859790/Houdini_mdfkna.webp" />
      ),
      name: "Houdini",
    },
  ],
  [
    {
      icon: (
        <IconBox src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776859789/adobe-after-effects-svgrepo-com_vp0chw.webp" />
      ),
      name: "Adobe After Effects",
    },
    {
      icon: (
        <IconBox src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776859789/figma-svgrepo-com_psfseb.webp" />
      ),
      name: "Figma",
    },
    {
      icon: (
        <IconBox src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776859789/substance-painter_1_ewvwsp.webp" />
      ),
      name: "Adobe Substance 3D",
    },
    {
      icon: (
        <IconBox src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776859789/v-ray_bfwpio.webp" />
      ),
      name: "V-Ray",
    },
  ],
  [
    {
      icon: (
        <IconBox src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776859789/3ds-max-full_1_ht3xw2.webp" />
      ),
      name: "Autodesk 3ds Max",
    },
    {
      icon: (
        <IconBox src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776859789/adobe-mixamo_qcr2x2.webp" />
      ),
      name: "Adobe Mixamo",
    },
    {
      icon: (
        <IconBox src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776859789/cinema-4d_jgveus.webp" />
      ),
      name: "Cinema 4D",
    },
    {
      icon: (
        <IconBox src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776859973/corel-draw-svgrepo-com_1_talkwl.webp" />
      ),
      name: "CorelDRAW",
    },
  ],
];

// ── Animations ──
const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ── MAIN ──
export default function DesignStack() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[360px] pointer-events-none bg-[radial-gradient(ellipse_at_85%_10%,rgba(100,160,255,0.2)_0%,transparent_65%)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 mb-6"
        >
          <RotatingDots />
          <span className="text-white/70 text-sm">Design Stack</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-[28px] md:text-[24px] lg:text-[30px] max-w-[640px]"
        >
          Driving Innovation through Our Design
          <br />
          Tools and Technology Stack
        </motion.h1>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12"
        >
          {columns.map((col, i) => (
            <motion.div key={i} variants={fadeUp} className="flex flex-col">
              {col.map((tool) => (
                <ToolRow key={tool.name} {...tool} />
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
