import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";
import LandingServiceGrid, { services } from "./landing-service-grid";

export default function LandingServicesSection() {
  return (
    <>
      {/* =========================================
                MOBILE VIEW (Static Layout)
                ========================================= */}
      <div className="flex w-full flex-col bg-white px-6 py-10 lg:hidden">
        {/* Header Section */}
        <div className="mb-12 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="origin-left scale-[0.85]">
              <RotatingDots variant="light" />
            </div>
            <p className="body-small !text-[#01030B]">Services</p>
          </div>
          <h2 className="heading-2 !text-[#01030B]">
            Transforming Ideas into Powerful Digital Services that Accelerate
            Success
          </h2>
        </div>

        {/* 2-Column Mobile Grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12">
          {services.map((service) => (
            <div
              key={service.number}
              className="flex flex-col border-l border-gray-200 pl-4"
            >
              <span
                className="heading-1 !font-[400] mb-12 inline-block bg-animated-gradient text-transparent"
                style={{
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {service.number}
              </span>

              <span className="body-small text-[#333]">
                {service.lines[0]}
                <br />
                {service.lines[1]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================
                DESKTOP VIEW (Original Untouched Layout)
                ========================================= */}
      <div className="hidden h-full lg:block">
        <SiteContainer className="relative z-[2] h-full">
          <div className="flex h-full flex-col justify-start pt-22 pb-14">
            <div className="mb-10 flex flex-col gap-5 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-5 flex items-center gap-4">
                  <RotatingDots />
                  <p className="body-small text-white">Services</p>
                </div>

                <h2 className="heading-2">
                  Transforming Ideas into Powerful Digital <br />
                  Services that Accelerate Success
                </h2>
              </div>
            </div>
          </div>
          <LandingServiceGrid />
        </SiteContainer>
      </div>
    </>
  );
}
