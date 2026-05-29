import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";
import LandingIndustryCarousel from "./landing-industry-carousel";

export default function LandingIndustriesSection() {
    return (
        <div className="relative inset-x-0 z-[4] bg-white pt-6 pointer-events-auto lg:absolute lg:top-[107vh] lg:min-h-screen lg:pt-0">
            <SiteContainer>
                <div>
                    <div className="mb-5 flex items-center gap-5">
                        <RotatingDots variant="light" />
                        <p className="body-small !text-[#01030B]">
                            Industries
                        </p>
                    </div>

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <h2 className="heading-2 max-w-[760px] !text-[#01030B]">
                            Empowering Industries with <br className="hidden lg:block" />
                            Innovative Digital Solutions <br className="hidden lg:block" />
                            for Sustainable Growth
                        </h2>

                        <p className="body-small max-w-[460px] !text-[#01030B] lg:mt-20">
                            Delivering tailored digital solutions across a wide
                            range of industries, we help businesses of all kinds
                            innovate, adapt, and grow enabling them to stay
                            competitive and succeed in an ever-evolving digital
                            landscape.
                        </p>
                    </div>
                    <div className="lg:mt-30 mt-15">
                        <LandingIndustryCarousel />
                    </div>

                </div>
            </SiteContainer>
        </div>
    );
}