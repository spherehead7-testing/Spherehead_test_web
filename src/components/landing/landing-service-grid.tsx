"use client";

import Image from "next/image";

// Replace the placeholder URLs with your actual Cloudinary links
const services = [
  { 
    number: "01", 
    lines: ["UI/UX Design & Creative", "Graphics Services"], 
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778069882/Services_1_tyi53h.png"
  },
  { 
    number: "02", 
    lines: ["IoT Solutions &", "Robotics Systems"], 
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778069882/Services_2_zrjuz0.png"
  },
  { 
    number: "03", 
    lines: ["Business Process", "Outsourcing (BPO) Services"], 
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778069881/Services_3_p78emb.png"
  },
  { 
    number: "04", 
    lines: ["IT Consultation & Managed", "Support Service"], 
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778069883/Services_4_qeiwoz.png"
  },
  { 
    number: "05", 
    lines: ["Custom Software & Mobile", "App Development"], 
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778069881/Services_5_hx29zn.png"
  },
  { 
    number: "06", 
    lines: ["Digital Commerce", "Development & SEO"], 
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778069885/Services_6_iqyhko.png"
  },
  { 
    number: "07", 
    lines: ["IoT Solutions &", "Robotics Systems"], 
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778069885/Services_7_vmhlpq.png"
  },
  { 
    number: "08", 
    lines: ["Custom Software & Mobile", "App Development"], 
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778069882/Services_8_wngzvj.png"
  },
  { 
    number: "09", 
    lines: ["IoT Solutions &", "Robotics Systems"], 
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778069883/Services_9_u3kr7g.png"
  },
  { 
    number: "10", 
    lines: ["UI/UX Design & Creative", "Graphics Services"], 
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778069881/Services_10_ulu8wg.png"
  },
];

export default function LandingServiceGrid() {
  return (
    <div className="absolute inset-x-0 top-[65vh] z-[3] rounded-t-[4px] bg-[#ffffff] pt-0 pb-12 pointer-events-auto">
      <div className="mx-auto mt-[-110px] grid w-full max-w-[1380px] grid-cols-5 gap-y-10 px-6 md:px-8 lg:px-10 scale-[0.9]">
        {services.map((service) => (
          <div key={service.number} className="group relative border-l border-[#c9c9c9] pl-4 min-h-[130px]">
            <div className="transition-opacity duration-500 ease-out group-hover:opacity-0">
              <p className="service-whitecard-number">{service.number}</p>
              <p className="body-small text-black">
                {service.lines[0]}<br />{service.lines[1]}
              </p>
            </div>
            <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 h-[146px] overflow-hidden rounded-[2px] opacity-0 shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-opacity duration-700 ease-out group-hover:opacity-100">
              <Image 
                src={service.image} 
                alt={service.lines.join(" ")} 
                fill 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-black/28" />
              <div className="absolute inset-0 pl-4 pt-0">
                <p className="service-whitecard-hover-number pt-2">{service.number}</p>
                <p className="body-small text-white weight-200 pt-6">
                  {service.lines[0]}<br />{service.lines[1]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}