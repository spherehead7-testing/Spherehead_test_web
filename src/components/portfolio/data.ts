// Define interfaces for content consistency
export interface ProjectContent {
  laptopImage: string;
  tabletImage: string;
  descriptionHtml: string;
  services: string[];
}

export interface Project {
  id: string;
  title: string;
  servicesLine: string; // The service line next to the title in the header
  bgColor: string; // Specific background color for expanded state
  expandedContent: ProjectContent;
}

// Data Array for projects
export const projects: Project[] = [
  {
    id: 'leaps',
    title: 'LEAPS',
    servicesLine: 'Web Designing | Branding | Marketing',
    bgColor: '#0F1A3F', 
    expandedContent: {
      laptopImage: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684957/Leaps_Img1_ngdobq.png",
      tabletImage: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684957/Leaps_Img2_iop3nm.png",
      descriptionHtml: `With a dedicated team focused on creativity and excellence, Spherehead crafts <a href="#" class="text-[#0D54CA] font-medium">impactful projects</a> that showcase <a href="#" class="text-[#0D54CA] font-medium">innovation</a>, <a href="#" class="text-[#0D54CA] font-medium">drive results</a>, and bring <a href="#" class="text-[#0D54CA] font-medium">ideas to life</a> for our clients.`,
      services: ['Web Designing', 'Branding', 'Marketing']
    }
  },
  {
    id: 'alamer',
    title: 'A LA MER',
    servicesLine: 'Web Designing | Branding | Marketing',
    bgColor: '#000000', 
    expandedContent: {
      laptopImage: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684956/A_LA_MER_img1_s8duem.png",
      tabletImage: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684955/A_LA_MER_img2_tb8fsw.png",
      descriptionHtml: `Art Flows Like The <a href="#" class="text-[#0D54CA] font-medium">Sea Within You</a>. We created an immersive digital experience...`,
      services: ['Web Designing', 'Branding', 'Marketing']
    }
  },
  {
    id: 'hourmarkers',
    title: 'HOUR MARKERS',
    servicesLine: 'Web Designing | Development | Branding | Marketing',
    bgColor: '#70481F', 
    expandedContent: {
      laptopImage: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776765694/HourMarkers_img1_ttfxsf.png",
      tabletImage: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684954/HourMarkers_img2_waw0in.png",
      descriptionHtml: `<a href="#" class="text-[#0D54CA] font-medium">Luxury, Untouched.</a> Discover classic watches... We built an elegant e-commerce...`,
      services: ['Web Designing', 'Development', 'Branding', 'Marketing']
    }
  },
  {
    id: 'winlo',
    title: 'WINLO',
    servicesLine: 'Web Designing | Development | Logistics',
    bgColor: '#000000', 
    expandedContent: {
      laptopImage: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776765694/HourMarkers_img1_ttfxsf.png",
      tabletImage: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684954/HourMarkers_img2_waw0in.png",
      descriptionHtml: `WINLO transforms logistics. We create impactful platforms that scale...`, 
      services: ['Logistics Platform', 'Web App', 'Analytics'] 
    }
  }
];