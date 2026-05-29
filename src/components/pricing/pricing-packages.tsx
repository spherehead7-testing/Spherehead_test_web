"use client";

import { useState } from "react";
import { ArrowDownRight } from "lucide-react";
import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";

type PricingPackage = {
  title: string;
  description: string;
  icon: "consultation" | "software" | "iot" | "web" | "robotics" | "qa";
  accent: string;
  included: string[];
};

const pricingPackages: PricingPackage[] = [
  {
    title: "IT Consultation",
    description:
      "Get expert advice on optimizing your IT infrastructure, strategy, and technology choices.",
    icon: "consultation",
    accent: "#FD7624",
    included: [
      "Assess IT infrastructure and business processes for improvements.",
      "Develop strategic IT plans and roadmaps aligned with goals.",
      "Recommend suitable technologies, platforms, and software solutions.",
      "Guide system architecture for secure and scalable environments.",
    ],
  },
  {
    title: "Software Product Development",
    description:
      "End-to-end custom software solutions that solve real business problems and scale with your growth.",
    icon: "software",
    accent: "#92D9FF",
    included: [
      "Full-cycle software development from concept to launch.",
      "Custom applications with scalable and secure architecture.",
      "UI/UX design for intuitive, user-friendly, and engaging experiences.",
      "Post-launch support to ensure reliability and continuous improvement.",
    ],
  },
  {
    title: "IoT Development",
    description:
      "Smart IoT solutions that connect devices, streamline operations, and deliver real-time insights to drive efficiency and innovation.",
    icon: "iot",
    accent: "#155ACD",
    included: [
      "Design and develop smart IoT solutions connecting devices and sensors.",
      "Integrate IoT hardware and software for automation and intelligence.",
      "Enable secure data collection, cloud connectivity, and analytics.",
      "Deploy and support scalable, reliable IoT ecosystems.",
    ],
  },
  {
    title: "Custom Web Development",
    description:
      "Smart web solutions that combine design and functionality to deliver seamless experiences, strengthen digital presence, and drive growth.",
    icon: "web",
    accent: "#FD7624",
    included: [
      "Custom website development tailored to business needs.",
      "Responsive design optimized for all devices.",
      "Integration of APIs and modern web technologies.",
      "Testing, deployment, and ongoing maintenance support.",
    ],
  },
  {
    title: "Robotics and Electronics",
    description:
      "Robotics and electronics solutions that automate processes, improve precision, and enhance efficiency",
    icon: "robotics",
    accent: "#92D9FF",
    included: [
      "Design and develop custom robotics solutions for automation.",
      "Integrate electronic systems and sensors for smart functionality.",
      "Test and optimize for reliable performance and safety.",
      "Deploy and support scalable, maintainable robotic systems.",
    ],
  },
  {
    title: "Quality Assurance and Testing",
    description:
      "QA and testing services that ensure reliability, boost performance, and deliver flawless digital products.",
    icon: "qa",
    accent: "#155ACD",
    included: [
      "Test software to identify bugs and ensure functionality.",
      "Perform automated and manual quality checks.",
      "Validate performance, security, and usability.",
      "Provide post-release monitoring and improvements.",
    ],
  },
];

function PackageIcon({
  type,
  color,
}: {
  type: PricingPackage["icon"];
  color: string;
}) {
  const base = "relative h-11 w-11 shrink-0";

  if (type === "iot") {
    return (
      <span className={base} aria-hidden="true">
        <span
          className="absolute left-0 top-0 h-4 w-4"
          style={{ backgroundColor: color }}
        />
        <span
          className="absolute right-0 top-0 h-4 w-4"
          style={{ backgroundColor: color }}
        />
        <span
          className="absolute left-0 bottom-0 h-4 w-4"
          style={{ backgroundColor: color }}
        />
        <span
          className="absolute bottom-0 right-0 h-4 w-4"
          style={{ backgroundColor: color }}
        />
        <span className="absolute left-[14px] top-[14px] h-[13px] w-[13px] bg-white" />
      </span>
    );
  }

  if (type === "web") {
    return (
      <span className={base} aria-hidden="true">
        <span
          className="absolute inset-0 rotate-45"
          style={{ backgroundColor: color }}
        />
        <span className="absolute left-[12px] top-[11px] h-5 w-5 rotate-45 bg-white" />
      </span>
    );
  }

  if (type === "robotics") {
    return (
      <span className={base} aria-hidden="true">
        <span
          className="absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 rotate-45"
          style={{ backgroundColor: color }}
        />
        <span
          className="absolute bottom-0 left-1/2 h-5 w-5 -translate-x-1/2 rotate-45"
          style={{ backgroundColor: color }}
        />
        <span
          className="absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 rotate-45"
          style={{ backgroundColor: color }}
        />
        <span
          className="absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 rotate-45"
          style={{ backgroundColor: color }}
        />
      </span>
    );
  }

  if (type === "qa") {
    return (
      <span className={base} aria-hidden="true">
        <span
          className="absolute left-0 top-2 h-7 w-11 [clip-path:polygon(50%_0%,100%_25%,100%_70%,50%_100%,0%_70%,0%_25%)]"
          style={{ backgroundColor: color }}
        />
        <span className="absolute left-[8px] top-[17px] h-[2px] w-7 rotate-[24deg] bg-white" />
      </span>
    );
  }

  return (
    <span className={base} aria-hidden="true">
      <span
        className="absolute left-0 top-0 h-5 w-5 rounded-tl-full"
        style={{ backgroundColor: color }}
      />
      <span
        className="absolute right-0 top-0 h-5 w-5 rounded-tr-full"
        style={{ backgroundColor: color }}
      />
      <span
        className="absolute bottom-0 left-0 h-5 w-5 rounded-bl-full"
        style={{ backgroundColor: color }}
      />
      <span
        className="absolute bottom-0 right-0 h-5 w-5 rounded-br-full"
        style={{ backgroundColor: color }}
      />
    </span>
  );
}

function PricingCard({ item }: { item: PricingPackage }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="overflow-hidden rounded-[3px] bg-white text-[#01030B] lg:h-auto lg:grid lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)]">
      <div className="flex flex-col px-5 py-8 lg:p-10">
        <div className="flex items-center gap-4">
          <PackageIcon type={item.icon} color={item.accent} />
          <h3 className="heading-3 !text-[#01030B]">{item.title}</h3>
        </div>

        <div className="mt-8 lg:mt-14 flex flex-col">
          <p className="body-extra-small max-w-[500px] text-[#8b8b8b]">
            {item.description}
          </p>

          <div className="mt-6 flex items-end justify-between">
            <button className="body-small bg-animated-gradient px-8 py-3 text-white rounded-[4px] transition-colors hover:bg-[#0A2F76]">
              Let&apos;s Talk
            </button>

            <button
              onClick={() => setExpanded(!expanded)}
              className="body-small text-[#155ACD] underline lg:hidden"
            >
              {expanded ? "Hide Details" : "More Details"}
            </button>
          </div>
        </div>
      </div>

      <div className="hidden w-px bg-[#E3E3E3] lg:block lg:my-8" />
      <div className="h-px bg-[#E3E3E3] mx-5 lg:hidden" />

      <div
        className={`overflow-hidden transition-all duration-300 lg:block lg:overflow-visible ${
          expanded
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0 lg:max-h-none lg:opacity-100"
        }`}
      >
        <div className="px-5 py-8 lg:p-10">
          <p className="body-medium !text-[#01030B]">What&apos;s Included</p>

          <ul className="mt-6 space-y-5">
            {item.included.map((feature) => (
              <li
                key={feature}
                className="body-extra-small flex items-start gap-3 !text-[#01030B]"
              >
                <ArrowDownRight className="mt-[2px] h-4 w-4 shrink-0 text-[#155ACD]" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function PricingPackages() {
  return (
    <section className="text-white">
      <SiteContainer className="pt-12 lg:pt-0 pb-12 lg:pb-20">
        <div className="flex items-center gap-3">
          <RotatingDots />
          <p className="body-small">Product Pricing</p>
        </div>
        <h2 className="heading-2 mt-7 max-w-[940px]">
          Delivering Value through
          <br />
          Transparent and Flexible Pricing
        </h2>
        <div className="mt-14 space-y-6 lg:mt-12 lg:space-y-8">
          {pricingPackages.map((item) => (
            <PricingCard key={item.title} item={item} />
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
