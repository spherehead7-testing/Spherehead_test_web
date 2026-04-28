import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";

export default function PricingIntro() {
  return (
    <section className="min-h-screen bg-white text-[#01030B]">
      <SiteContainer className="pt-28 pb-20 lg:pt-32 lg:pb-28">
        <div className="flex items-center gap-3">
          <RotatingDots />
          <p className="text-[16px] font-[500] text-[#01030B] lg:text-[20px]">
            Our Pricing
          </p>
        </div>

        <div className="mt-7 grid gap-24 lg:grid-cols-[minmax(0,790px)_minmax(0,720px)] lg:gap-16">
          <h2 className="text-[40px] font-[400] tracking-0 text-[#01030B] sm:text-[32px] lg:text-[30px]">
            At Spherehead, we offer{" "}
            <span className="text-[#155ACD]">transparent</span> and{" "}
            <span className="text-[#155ACD]">flexible pricing</span> designed
            to match the unique needs of every business.
          </h2>

          <p className="self-end text-[28px] font-[300] tracking-0 text-[#7B7B7B] lg:pt-72 lg:text-[20px]">
            From IT consultation and software development to IoT, web solutions,
            and more, our service packages provide clear value without
            compromising on quality. With tailored plans, innovative solutions,
            and measurable results, we empower businesses to grow, innovate, and
            achieve success with confidence
          </p>
        </div>
      </SiteContainer>
    </section>
  );
}
