import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";
import LandingServiceGrid from "./landing-service-grid";

export default function LandingServicesSection() {
  return (
    <>
      <SiteContainer className="relative z-[2] h-full">
        <div className="flex h-full flex-col justify-start px-6 pt-28 pb-14 lg:px-10 lg:pt-20">
          <div className="mb-10 flex flex-col gap-5 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-5 flex items-center gap-4">
                <RotatingDots />
                <p className="body-small text-white !tracking-[1.2px]">Services</p>
              </div>
              
              <h2 className="heading-2">
                Transforming Ideas into Powerful Digital <br />
                Services that Accelerate Success
              </h2>
              
            </div>
          </div>
        </div>
      </SiteContainer>

      <LandingServiceGrid />
    </>
  );
}