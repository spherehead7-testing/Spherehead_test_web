"use client";

import Image from "next/image";
import RotatingDots from "@/components/ui/rotating-dots";

const data = [
  {
    id: "01",
    title: "Smart Agriculture",
    desc: "Leveraging digital technologies to optimize farming operations, improve productivity, and enable data-driven agricultural management.",
    img: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778671316/Rectangle_34625218_mbirxf.webp",
  },

  {
    id: "02",
    title: "Digital Healthcare",
    desc: "Empowering healthcare providers with intelligent systems that improve service delivery, data management, and patient experiences.",
    img: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778671316/Rectangle_34625218_1_fxcxgk.webp",
  },

  {
    id: "03",
    title: "Smart Education",
    desc: "Enabling modern learning experiences through digital platforms that enhance collaboration, accessibility, and efficient education management.",
    img: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778671316/Rectangle_34625218_2_qz1h15.webp",
  },

  {
    id: "04",
    title: "Smart Retail",
    desc: "Empowering retail businesses with digital solutions that enhance customer experiences, streamline operations, and drive smarter sales strategies.",
    img: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778671316/Rectangle_34625218_3_ebokbv.webp",
  },

  {
    id: "05",
    title: "Digital Real Estate",
    desc: "Providing digital solutions that streamline property management, enhance client experiences, and optimize real estate operations.",
    img: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778671316/Rectangle_34625218_4_ef8vyw.webp",
  },
];

export default function IndustriesList() {
  return (
    <section className="bg-animated-gradient relative z-10">
      <div className="flex min-h-screen">
        {/* LEFT PANEL */}
        <div className="sticky top-0 flex h-screen w-1/2 items-start px-14 pt-14">
          <div>
            {/* LABEL */}
            <div className="mb-8 flex items-center gap-3">
              <RotatingDots />

              <span className="body-small text-white">Industries We Serve</span>
            </div>

            {/* TITLE */}
            <h2 className="heading-2 max-w-[520px] text-white">
              Our expertise spans multiple industries, enabling us to create
              innovative solutions that enhance efficiency, improve customer
              experiences, and support digital transformation.
            </h2>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/2 bg-white">
          {data.map((item) => (
            <div key={item.id} className="border-b border-[#E7EAF0]">
              {/* NUMBER */}
              <div className="px-10 pt-8 text-[32px] text-blue-700">
                {item.id}
              </div>

              {/* CONTENT */}
              <div className="flex gap-10 px-10 pt-5">
                {/* IMAGE */}
                <div className="relative h-[320px] w-[320px] overflow-hidden rounded-sm">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* TEXT */}
                <div className="flex max-w-[320px] flex-col justify-center">
                  <h3 className="body-large mb-5 text-[#01030B]">
                    {item.title}
                  </h3>

                  <p className="body-small !text-[#8A8B8F]">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
