export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  image: string;
  slug: string;
}

export interface ServiceCategoryData {
  metaTitle: string;
  hero: {
    title: string;
    description: string;
  };
  intro: {
    mainText: string; // Updated to string for JSON serialization
    image: string;
    heading: string;
    p1: string;
    p2: string;
  };
  listTitle: string;
  items: ServiceItem[];
}

export const categoryData: Record<string, ServiceCategoryData> = {
  "digital-services": {
    metaTitle: "Digital Services",
    hero: {
      title: "Digital Services",
      description: "Transforming complex challenges into scalable digital realities. From custom software and IoT to advanced robotics, we build the technical foundations your business needs to lead the market.",
    },
    intro: {
      mainText: "With a passionate team driving <span class='text-[#0D54CA]'>innovation</span>, Spherehead delivers cutting-edge <span class='text-[#0D54CA]'>digital services</span> that help brands grow, adapt, and stand out in <span class='text-[#0D54CA]'>today’s competitive</span> landscape.",
      image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776313260/Services_y83dyy.png",
      heading: "We focus on creating meaningful digital experiences that connect your business with real growth, because that’s where true transformation begins and lasting success is achieved.",
      p1: "Our approach begins by understanding what makes your business unique—your vision, your goals, and your competitive edge. We explore how your digital presence can better serve your audience by aligning technology with real user needs, behaviors, and expectations.",
      p2: "The real impact happens when strategy and execution come together. We shape solutions that enhance performance, improve efficiency, and elevate your brand experience—creating a strong digital foundation that drives growth and delivers long-term value.",
    },
    listTitle: "Driving Enterprise Value Through Scalable Tech Innovation",
    items: [
      { id: "01", title: "IT Consultations", desc: "Expert guidance to align your technical strategy with your business goals.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778233017/ServicesList_6_sbjxnl.png", slug: "it-consultations" },
      { id: "02", title: "Software Product Development", desc: "End-to-end development of robust, scalable software products.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778233017/ServicesList_7_vrmppk.png", slug: "software-development" },
      { id: "03", title: "IoT Development", desc: "Connecting devices and systems for smarter business operations.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778233017/ServicesList_8_kompyg.png", slug: "iot-development" },
      { id: "04", title: "Custom Web Development", desc: "Tailored web solutions designed specifically for your unique requirements.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778233018/ServicesList_9_g1mymv.png", slug: "custom-web" },
      { id: "05", title: "Robotics & Electronics", desc: "Advanced hardware and robotics engineering for automation.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778233019/ServicesList_10_uafydq.png", slug: "robotics-electronics" },
      { id: "06", title: "Quality Assurance & Testing", desc: "Rigorous testing protocols to ensure flawless performance.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778233020/ServicesList_11_pq49pp.png", slug: "qa-testing" },
      { id: "07", title: "Maintenance & Support", desc: "Ongoing technical support to keep your systems running smoothly.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778233021/ServicesList_12_tm1n6v.png", slug: "maintenance-support" },
      { id: "08", title: "Backend Development", desc: "Secure and scalable server-side architectures.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778233023/ServicesList_13_f9ekf5.png", slug: "backend-development" },
      { id: "09", title: "Website Audit & Optimization", desc: "Comprehensive reviews to improve speed, security, and SEO.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778233024/ServicesList_14_j0mplu.png", slug: "audit-optimization" },
    ],
  },
  "digital-solutions": {
    metaTitle: "Digital Solutions",
    hero: {
      title: "Digital Solutions",
      description: "Empowering your business operations with intelligent, integrated platforms tailored for efficiency and growth.",
    },
    intro: {
      mainText: "We integrate advanced <span class='text-[#0D54CA]'>digital solutions</span> to streamline workflows, connect data, and transform how your business operates in a <span class='text-[#0D54CA]'>digital-first</span> world.",
      image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778233033/ServicesList_5_j4bbrh.png", // Update with solutions image
      heading: "Building the digital infrastructure that modern businesses need to scale efficiently.",
      p1: "From enterprise resource planning to customer relationship management, we deploy solutions that centralize your data and automate routine tasks.",
      p2: "Our custom integrations ensure your software ecosystem works seamlessly together, eliminating silos and boosting overall productivity.",
    },
    listTitle: "Streamlining Operations with Integrated Digital Platforms",
    items: [
      { id: "01", title: "Enterprise Resource Planning (ERP)", desc: "Centralized systems to manage and integrate core business processes.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778233025/ServicesList_16_pjh0mx.png", slug: "erp" },
      { id: "02", title: "Smart CRM & POS Solutions", desc: "Intelligent platforms for managing customer relationships and sales.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778233026/ServicesList_17_xeuzug.png", slug: "crm-pos" },
      { id: "03", title: "Digital Commerce Solutions", desc: "Robust e-commerce platforms built for conversion and scale.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778233028/ServicesList_1_hrztyz.png", slug: "digital-commerce" },
      { id: "04", title: "Business Process Outsourcing (BPO)", desc: "Streamlining operations through strategic external processing.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778233030/ServicesList_2_wxpzi7.png", slug: "bpo-services" },
      { id: "05", title: "Augmented Reality (AR) Solutions", desc: "Immersive AR experiences for marketing and operations.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778233031/ServicesList_3_fv6eew.png", slug: "ar-solutions" },
      { id: "06", title: "eLearning Solutions", desc: "Custom educational platforms and digital learning environments.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778233032/ServicesList_4_f39wiw.png", slug: "elearning" },
      { id: "07", title: "SEO Optimization", desc: "Data-driven strategies to improve search visibility and traffic.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778233033/ServicesList_5_j4bbrh.png", slug: "seo-optimization" },
      { id: "08", title: "Virtual Reality (VR) Solutions", desc: "Fully immersive virtual environments for training and showcase.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778233020/ServicesList_11_pq49pp.png", slug: "vr-solutions" },
    ],
  },
  "design-and-3d-services": {
    metaTitle: "Design and 3D Services",
    hero: {
      title: "Design & 3D Services",
      description: "Crafting visually stunning and highly intuitive experiences. From UI/UX to advanced 3D modeling, we bring your concepts to life.",
    },
    intro: {
      mainText: "Merging creativity with strategy, our <span class='text-[#0D54CA]'>design experts</span> create compelling visual narratives and <span class='text-[#0D54CA]'>3D experiences</span> that captivate audiences.",
      image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778233031/ServicesList_3_fv6eew.png", // Update with design image
      heading: "We believe that great design is not just about aesthetics—it's about functionality, storytelling, and user engagement.",
      p1: "Through collaborative workshops and research, we uncover the visual language that best represents your brand's unique identity.",
      p2: "Whether it's a seamless user interface or photorealistic 3D rendering, our designs are engineered to leave a lasting impact.",
    },
    listTitle: "Elevating Brands Through Exceptional Design & 3D Art",
    items: [
      { id: "01", title: "Free Design Thinking Workshop", desc: "Collaborative sessions to solve complex problems creatively.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778233018/ServicesList_9_g1mymv.png", slug: "design-workshop" },
      { id: "02", title: "UI/UX Services", desc: "Intuitive, user-centered interfaces for web and mobile apps.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778233019/ServicesList_10_uafydq.png", slug: "ui-ux" },
      { id: "03", title: "Graphic Designing Service", desc: "Compelling visual assets for digital and print media.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778233017/ServicesList_7_vrmppk.png", slug: "graphic-design" },
      { id: "04", title: "3D Rendering & Post Production", desc: "Photorealistic 3D visuals and professional post-editing.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778233028/ServicesList_1_hrztyz.png", slug: "3d-rendering" },
      { id: "05", title: "3D Modeling & Texturing", desc: "High-quality 3D assets for games, architecture, and marketing.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778233031/ServicesList_3_fv6eew.png", slug: "3d-modeling" },
      { id: "06", title: "Storyboarding & Concept Development", desc: "Visualizing ideas and planning narratives before production.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778233032/ServicesList_4_f39wiw.png", slug: "storyboarding" },
    ],
  }
};