"use client";

import Image from "next/image";

// Replace the placeholder URLs with your actual Cloudinary links
const services = [
    {
        number: "01",
        lines: ["UI/UX Design & Creative", "Graphics Services"],
        image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778069882/Services_1_tyi53h.png",
    },
    {
        number: "02",
        lines: ["IoT Solutions &", "Robotics Systems"],
        image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778069882/Services_2_zrjuz0.png",
    },
    {
        number: "03",
        lines: ["Business Process", "Outsourcing (BPO) Services"],
        image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778069881/Services_3_p78emb.png",
    },
    {
        number: "04",
        lines: ["IT Consultation & Managed", "Support Service"],
        image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778069883/Services_4_qeiwoz.png",
    },
    {
        number: "05",
        lines: ["Custom Software & Mobile", "App Development"],
        image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778069881/Services_5_hx29zn.png",
    },
    {
        number: "06",
        lines: ["Digital Commerce", "Development & SEO"],
        image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778069885/Services_6_iqyhko.png",
    },
    {
        number: "07",
        lines: ["IoT Solutions &", "Robotics Systems"],
        image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778069885/Services_7_vmhlpq.png",
    },
    {
        number: "08",
        lines: ["Custom Software & Mobile", "App Development"],
        image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778069882/Services_8_wngzvj.png",
    },
    {
        number: "09",
        lines: ["IoT Solutions &", "Robotics Systems"],
        image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778069883/Services_9_u3kr7g.png",
    },
    {
        number: "10",
        lines: ["UI/UX Design & Creative", "Graphics Services"],
        image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778069881/Services_10_ulu8wg.png",
    },
];

export default function LandingServiceGrid() {
    return (
        <div className="absolute inset-x-5 top-[58vh] z-[3] rounded-t-[4px] pt-0 pb-20 pointer-events-auto scale-110">
            <div className="mx-auto mt-[-105px] grid w-full max-w-[1380px] grid-cols-5 gap-y-10 scale-[0.9]">
                {services.map((service) => (
                    <div
                        key={service.number}
                        className="group relative border-l border-[#c9c9c9] pl-4 min-h-[160px]"
                    >
                        <div className="transition-all duration-500 ease-out group-hover:translate-x-3 group-hover:opacity-0">
                            <p className="service-whitecard-number">
                                {service.number}
                            </p>
                        </div>

                        <p className="body-small text-black transition-colors duration-500 group-hover:text-white !text-lg !leading-snug relative z-30 pointer-events-none">
                            {service.lines[0]}
                            <br />
                            {service.lines[1]}
                        </p>

                        <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 h-full overflow-hidden rounded-[2px] opacity-0 shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-opacity duration-700 ease-out group-hover:opacity-100">
                            <Image
                                src={service.image}
                                alt={service.lines.join(" ")}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/28" />
                            <div className="absolute inset-0 pl-4 pt-0 transition-transform duration-500 ease-out group-hover:translate-x-3">
                                <p className="service-whitecard-hover-number pt-2">
                                    {service.number}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
