import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";

export default function PricingIntro() {
  return (
    <section className="min-h-screen bg-white text-[#01030B]">
      <SiteContainer className="pt-28 pb-20 lg:pt-22 lg:pb-10">
        {/* Top label */}
        <div className="flex items-center gap-3">
          <RotatingDots variant="light" />
          <p className="body-small">Our Pricing</p>
        </div>

        {/* Heading */}
        <div className="mt-5 max-w-[790px]">
          <h2 className="text-[32px] sm:text-[36px] lg:text-[40px] font-[400] leading-[1.3]">
            At Spherehead, we offer{" "}
            <span className="text-[#155ACD]">transparent</span> and{" "}
            <span className="text-[#155ACD]">flexible pricing</span> designed to
            match the unique needs of every business.
          </h2>
        </div>

        {/* Paragraph (SHIFTED RIGHT — NOT A COLUMN) */}
        <div className="mt-36 lg:ml-[620px] max-w-[620px]">
          <p className="body-large text-[#808080]">
            From IT consultation and software development to IoT, web solutions,
            and more, our service packages provide clear value without
            compromising on quality. With tailored plans, innovative solutions,
            and measurable results, we empower businesses to grow, innovate, and
            achieve success with confidence.
          </p>
        </div>
      </SiteContainer>
    </section>
  );
}
