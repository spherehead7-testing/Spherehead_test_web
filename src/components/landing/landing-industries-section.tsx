import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";
import LandingIndustryCarousel from "./landing-industry-carousel";

export default function LandingIndustriesSection() {
    return (
    
        <div className="absolute inset-x-0 top-[107vh] z-[4] pointer-events-auto pb-[60px]">
            <SiteContainer>
                <div className="px-6 lg:px-10">
                    <div className="mb-5 flex items-center gap-5">
                        <RotatingDots variant="light" />
                        <p className="body-small !text-[#01030B] !tracking-[1.2px]">
                            Industries
                        </p>
                    </div>

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <h2 className="heading-2 max-w-[760px] !text-[#01030B]">
                            Empowering Industries with <br />
                            Innovative Digital Solutions <br />
                            for Sustainable Growth
                        </h2>

                        <p className="body-small max-w-[460px] !text-[#01030B] lg:pt-24 !text-[16px] !leading-[1.4]">
                            Delivering tailored digital solutions across a wide
                            range of industries, we help businesses of all kinds
                            innovate, adapt, and grow enabling them to stay
                            competitive and succeed in an ever-evolving digital
                            landscape.
                        </p>
                    </div>
                    <LandingIndustryCarousel />
                </div>
            </SiteContainer>
        </div>
    );
}