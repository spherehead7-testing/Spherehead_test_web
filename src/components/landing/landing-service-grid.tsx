import Image from "next/image";

const services = [
  { number: "01", lines: ["UI/UX Design & Creative", "Graphics Services"], image: "/images/landingPage/serviceSec1.svg" },
  { number: "02", lines: ["IoT Solutions &", "Robotics Systems"], image: "/images/landingPage/serviceSec2.svg" },
  { number: "03", lines: ["Business Process", "Outsourcing (BPO) Services"], image: "/images/landingPage/serviceSec3.svg" },
  { number: "04", lines: ["IT Consultation & Managed", "Support Service"], image: "/images/landingPage/serviceSec4.svg" },
  { number: "05", lines: ["Custom Software & Mobile", "App Development"], image: "/images/landingPage/serviceSec5.svg" },
  { number: "06", lines: ["Digital Commerce", "Development & SEO"], image: "/images/landingPage/serviceSec1.svg" },
  { number: "07", lines: ["IoT Solutions &", "Robotics Systems"], image: "/images/landingPage/serviceSec2.svg" },
  { number: "08", lines: ["Custom Software & Mobile", "App Development"], image: "/images/landingPage/serviceSec3.svg" },
  { number: "09", lines: ["IoT Solutions &", "Robotics Systems"], image: "/images/landingPage/serviceSec4.svg" },
  { number: "10", lines: ["UI/UX Design & Creative", "Graphics Services"], image: "/images/landingPage/serviceSec5.svg" },
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
              <Image src={service.image} alt={service.lines.join(" ")} fill className="object-cover" />
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