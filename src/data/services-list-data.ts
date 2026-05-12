export interface Service {
  id: string;
  title: string;
  desc: string;
  image: string;
  slug: string;
}

export const servicesData: Service[] = [
  {
    id: "01",
    title: "IT Consultations",
    desc: "Strategic guidance to align technology with your business goals.",
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776399464/services_list_ny50qm.png",
    slug: "it-consultations",
  },
  {
    id: "02",
    title: "Software Product Development",
    desc: "End-to-end product engineering from ideation to market entry.",
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776744960/Services_list_img6_twlcre.png",
    slug: "software-product-development",
  },
  {
    id: "03",
    title: "IoT Development",
    desc: "Connecting devices to create smart, data-driven ecosystems.",
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776744960/Services_list_img2_ncxxv8.png",
    slug: "iot-development",
  },
  {
    id: "04",
    title: "Custom Web Development",
    desc: "We build custom software products that align with your vision, delivering innovation, scalability, and long-term value.",
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776744959/Services_list_img4_ls76el.png",
    slug: "custom-web-development",
  },
  {
    id: "05",
    title: "Robotics & Electronics",
    desc: "Advanced hardware solutions and automation engineering.",
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776744959/Services_list_img7_aazspt.png",
    slug: "robotics-electronics",
  },
  {
    id: "06",
    title: "Quality Assurance & Testing",
    desc: "Rigorous testing protocols to ensure high performance.",
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776744959/Services_list_img9_hqz8tk.png",
    slug: "quality-assurance-testing",
  },
  {
    id: "07",
    title: "Maintenance & Support",
    desc: "Continuous monitoring, security updates, and performance tuning.",
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776744959/Services_list_img8_yeejer.png",
    slug: "maintenance-support",
  },
  {
    id: "08",
    title: "Backend Development",
    desc: "Robust, scalable server-side architectures and database management.",
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776744959/Services_list_img5_xraozk.png",
    slug: "backend-development",
  },
  {
    id: "09",
    title: "Website Audit & Optimization",
    desc: "Comprehensive analysis and performance enhancements for your digital presence.",
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776744959/Services_list_img3_ylhhjb.png",
    slug: "website-audit-optimization",
  },
];
