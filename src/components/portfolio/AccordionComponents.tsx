import React from "react";
import { motion, Variants } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import Image from "next/image";
import { Project } from "./data";

// --- ProjectListItemHeader.tsx ---
interface ProjectListItemHeaderProps {
  project: Project;
  isExpanded: boolean;
  onClick: () => void;
}

export const ProjectListItemHeader: React.FC<ProjectListItemHeaderProps> = ({ project, isExpanded, onClick }) => {
    const stateIndicatorVariants: Variants = {
        collapsed: { scale: 0, transformOrigin: 'bottom left' },
        expanded: { scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <div 
            onClick={onClick}
            className="w-full py-8 lg:py-10 bg-white cursor-pointer group hover:bg-[#F6F6F6] transition-colors site-background-fixed-root"
        >
            <SiteContainer className="flex items-center justify-between gap-6 relative z-10">
                <motion.div
                    className="w-3 h-3 rounded-full bg-[#0D54CA] flex-shrink-0"
                    variants={stateIndicatorVariants}
                    animate={isExpanded ? "expanded" : "collapsed"}
                />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-12 flex-grow">
                    <h3 className="heading-3 text-[#01030B] group-hover:text-[#0D54CA] transition-colors flex-shrink-0">
                        {project.title}
                    </h3>
                    
                    <div className="flex flex-col items-start sm:items-end gap-1 sm:gap-2 whitespace-nowrap">
                        <span className="sm:inline inter-tight text-[#01030B] group-hover:text-[#0D54CA] transition-colors">{project.servicesLine}</span>
                        <span className="hidden sm:inline w-[1px] h-[1px] rounded-full bg-white inter-tight"></span>
                    </div>
                </div>
            </SiteContainer>
        </div>
    );
};


// --- ProjectDetailView.tsx ---
interface ProjectDetailViewProps {
    project: Project;
    onClose: () => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ project, onClose }) => {
    const laptopImageVariants: Variants = {
        hidden: { x: '-15%', opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } },
    };

    const contentVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8, delay: 0.4, ease: "easeOut" } },
    };

    return (
        <div 
            className="w-full py-10 lg:py-24 overflow-hidden site-background-fixed-root"
            style={{ backgroundColor: project.bgColor }}
        >
            <SiteContainer className="flex flex-col gap-8 lg:gap-16 relative z-10 text-white">
                
                <div className="flex flex-col gap-8 lg:gap-16">
                    
                    {/* Top Bar: Title and CLOSE stacked */}
                    <div className="w-full flex flex-col gap-4 max-w-5xl">
                        <div className="flex flex-row items-center justify-between gap-6 lg:border-b lg:border-white/10 sm:pb-4">
                            <h2 className="heading-1 !text-4xl lg:!text-[72px] lg:leading-[90px] text-white">
                                {project.title}
                            </h2>
                            <div 
                                onClick={onClose}
                                className="flex items-center gap-2 whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity"
                            >
                                <span className="inter-tight text-white/90 text-sm">CLOSE</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* DESKTOP CONTENT VIEW */}
                    <motion.div 
                        className="hidden lg:grid lg:grid-cols-12 lg:gap-16 lg:items-start w-full"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        
                        {/* LEFT COLUMN: Laptop */}
                        <motion.div className="col-span-4 flex items-center justify-center -ml-12" variants={laptopImageVariants}>
                            <Image 
                                src={project.expandedContent.laptopImage}
                                alt={`${project.title} laptop view`}
                                width={600} 
                                height={400}
                                className="object-contain" 
                            />
                        </motion.div>
                        
                        {/* MIDDLE COLUMN: Tablet with thick black border */}
                        <div className="col-span-4 flex flex-col items-center gap-10 -mr-12">
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
                        </div>
                        
                        {/* RIGHT COLUMN: Service list */}
                        <div className="col-span-4 flex flex-col items-start gap-3 mt-4">
                            {project.expandedContent.services.map((service, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                                    <span className="inter-tight text-white/70">{service}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* MOBILE CONTENT VIEW - Single Laptop Image + Right Aligned Services List */}
                    <div className="flex lg:hidden flex-col w-full">
                        
                        <div className="flex flex-row items-center justify-between w-full mt-2 gap-4">
                            {/* Single Laptop Image on the left */}
                            <div className="w-3/5 flex justify-start -ml-6 relative">
                                <Image 
                                    src={project.expandedContent.laptopImage}
                                    alt={`${project.title} laptop mobile view`}
                                    width={400} 
                                    height={300}
                                    className="object-contain scale-110 origin-left" 
                                />
                            </div>

                            {/* Services stacked on the right */}
                            <div className="w-2/5 flex flex-col items-end justify-center gap-3 pr-2">
                                {project.expandedContent.services.map((service, index) => (
                                    <span key={index} className="inter-tight text-white/90 text-sm text-right">
                                        {service}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Text Description Content below image on mobile */}
                        <div className="flex flex-col mt-8 w-full">
                            <div 
                                className="heading-3 leading-relaxed text-white text-base"
                                dangerouslySetInnerHTML={{ __html: project.expandedContent.descriptionHtml }} 
                            />
                        </div>

                    </div>
                    
                </div>
            </SiteContainer>
        </div>
    );
};