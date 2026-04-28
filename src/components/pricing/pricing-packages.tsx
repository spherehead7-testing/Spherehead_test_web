import { ArrowDownRight } from "lucide-react";
import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";

type PricingPackage = {
  title: string;
  price: string;
  description: string;
  icon: "consultation" | "software" | "iot" | "web" | "robotics" | "qa";
  accent: string;
  included: string[];
};

const pricingPackages: PricingPackage[] = [
  {
    title: "IT Consultation",
    price: "$120",
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
    price: "$250",
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
    price: "$125",
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
    price: "$100",
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
    price: "$250",
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
    price: "$75",
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

function PackageIcon({ type, color }: { type: PricingPackage["icon"]; color: string }) {
  const base = "relative h-11 w-11 shrink-0";

  if (type === "iot") {
    return (
      <span className={base} aria-hidden="true">
        <span className="absolute left-0 top-0 h-4 w-4" style={{ backgroundColor: color }} />
        <span className="absolute right-0 top-0 h-4 w-4" style={{ backgroundColor: color }} />
        <span className="absolute left-0 bottom-0 h-4 w-4" style={{ backgroundColor: color }} />
        <span className="absolute bottom-0 right-0 h-4 w-4" style={{ backgroundColor: color }} />
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

// function PricingCard({ item }: { item: PricingPackage }) {
//   return (
//     <article className="grid min-h-[420px] rounded-[3px] bg-white px-9 py-9 text-[#01030B] lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] lg:px-10 lg:py-10 xl:px-12">
//       <div className="flex flex-col">
//         <div className="flex items-center gap-7">
//           <PackageIcon type={item.icon} color={item.accent} />
//           <h3 className="text-[30px] font-[400] leading-none lg:text-[38px]">
//             {item.title}
//           </h3>
//         </div>

//         <div className="mt-auto pt-16">
//           <p className="text-[56px] font-[400] leading-none text-[#155ACD] lg:text-[70px]">
//             {item.price}
//           </p>
//           <p className="mt-4 max-w-[610px] text-[19px] font-[300] leading-[1.45] text-[#8b8b8b] lg:text-[22px]">
//             {item.description}
//           </p>

//           <button className="mt-6 bg-[#155ACD] px-9 py-4 text-[20px] font-[400] text-white transition-colors hover:bg-[#0A2F76]">
//             Let&apos;s Talk
//           </button>
//         </div>
//       </div>

//       <div className="my-0 hidden w-px bg-[#E3E3E3] lg:block" />

//       <div className="pt-10 lg:pl-12 lg:pt-5 xl:pl-14">
//         <h4 className="text-[26px] font-[400] leading-none lg:text-[30px]">
//           What&apos;s Included
//         </h4>

//         <ul className="mt-8 space-y-6">
//           {item.included.map((feature) => (
//             <li
//               key={feature}
//               className="flex items-start gap-4 text-[18px] font-[300] leading-[1.4] lg:text-[21px]"
//             >
//               <ArrowDownRight
//                 className="mt-1 h-5 w-5 shrink-0 text-[#155ACD]"
//                 strokeWidth={2.4}
//               />
//               <span>{feature}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </article>
//   );
// }

function PricingCard({ item }: { item: PricingPackage }) {
  return (
    <article className="grid h-[280px] rounded-[3px] bg-white px-6 py-6 text-[#01030B] lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)]">

      <div className="flex flex-col">
        <div className="flex items-center gap-4">
          <PackageIcon type={item.icon} color={item.accent} />
          <h3 className="text-[20px] lg:text-[24px] font-[400] leading-none">
            {item.title}
          </h3>
        </div>

        <div className="mt-auto pt-6">
          <p className="text-[36px] lg:text-[42px] font-[400] leading-none text-[#155ACD]">
            {item.price}
          </p>

          <p className="mt-2 max-w-[500px] text-[14px] lg:text-[16px] text-[#8b8b8b]">
            {item.description}
          </p>

          <button className="mt-3 bg-[#155ACD] px-6 py-2 text-[14px] text-white hover:bg-[#0A2F76]">
            Let&apos;s Talk
          </button>
        </div>
      </div>

      <div className="hidden lg:block w-px bg-[#E3E3E3]" />

      <div className="pt-4 lg:pl-6">
        <h4 className="text-[18px] lg:text-[20px] font-[400]">
          What&apos;s Included
        </h4>

        <ul className="mt-4 space-y-3">
          {item.included.map((feature) => (
            <li key={feature} className="flex gap-2 text-[14px]">
              <ArrowDownRight className="h-4 w-4 text-[#155ACD]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}


export default function PricingPackages() {
  return (
    <section className="bg-gradient-to-r from-[#06142E] via-[#0A2F76] to-[#2666D2] text-white">
      <SiteContainer className="pt-28 pb-28 lg:pt-32 lg:pb-32">
        <div className="flex items-center gap-3">
          <RotatingDots />
          <p className="text-[18px] font-[400] text-white lg:text-[24px]">
            Product Pricing
          </p>
        </div>

        <h2 className="mt-7 max-w-[940px] text-[42px] font-[300] leading-[1.22] tracking-0 text-white sm:text-[54px] lg:text-[60px]">
          Delivering Value through
          <br />
          Transparent and Flexible Pricing
        </h2>

        <div className="mt-24 space-y-12 lg:mt-28">
          {pricingPackages.map((item) => (
            <PricingCard key={item.title} item={item} />
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
