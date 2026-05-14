import Image from "next/image";
import Link from "next/link";
import { ChevronsDown, ArrowUpRight } from "lucide-react";
import { motion, useTransform, MotionValue } from "motion/react";

import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";
import { featuredBlogPosts } from "@/data/blog-posts";

type BlogsHeroProps = {
  progress: MotionValue<number>;
};

export default function BlogsHero({ progress }: BlogsHeroProps) {
  // Move aside panel to the right during first 20% of scroll
  const asideX = useTransform(progress, [0, 0.2], ["0%", "120%"]);

  // Fade + move content upward
  const contentOpacity = useTransform(progress, [0, 0.2], [1, 0]);
  const contentY = useTransform(progress, [0, 0.2], [0, -300]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-r from-[#06142E] via-[#0A2F76] to-[#2666D2] text-white">
      <SiteContainer className="relative z-10 grid min-h-screen max-w-none gap-10 pt-28 pr-0 pb-12 sm:pr-0 md:pr-0 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-stretch lg:pt-24 lg:pr-0 lg:pb-0 xl:grid-cols-[minmax(0,1fr)_380px] xl:pr-0">

        {/* LEFT CONTENT */}
        <motion.div
          style={{
            opacity: contentOpacity,
            y: contentY,
          }}
          className="mb-[50px] ml-[50px] flex min-h-[54vh] flex-col justify-end pb-8 lg:min-h-0 lg:pb-24"
        >
          <h1 className="heading-1 text-[58px] font-[300] leading-[1.05] tracking-0 sm:text-[76px] lg:text-[88px]">
            Knowledge Hub
          </h1>

          <p className="heading-4 mt-7 max-w-[690px] text-[18px] font-[300] leading-[1.5] text-white sm:text-[20px]">
            Leveraging advanced technologies and innovative
            solutions, we tackle complex business challenges,
            delivering scalable, efficient, and future-ready digital
            products that drive growth and market leadership
          </p>
        </motion.div>

        {/* RIGHT SIDEBAR */}
        <motion.aside
          style={{ x: asideX }}
          className="flex bg-white px-5 py-7 text-[#01030B] lg:min-h-[calc(100vh-104px)] lg:self-end lg:px-6 lg:py-8"
        >
          <div className="flex w-full flex-col">

            {/* HEADER */}
            <div className="mb-6 flex items-center gap-3">
              <RotatingDots variant="light" />

              <h2 className="body-small text-[15px] font-[500]">
                Featured Stories
              </h2>
            </div>

            {/* BLOG CARDS */}
            <div className="space-y-5">
              {featuredBlogPosts
                .slice(0, 2)
                .map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/blogs/${post.slug}`}
                    className="group relative block aspect-[1.54/1] overflow-hidden rounded-[2px] bg-[#0A2F76] text-white"
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 900px) 300px, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06142E]/80 via-[#06142E]/16 to-transparent" />

                    {/* Arrow */}
                    <ArrowUpRight className="absolute top-4 right-4 z-10 h-6 w-6 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />

                    {/* Title */}
                    <h3 className="body-small absolute inset-x-0 bottom-0 z-10 mb-3 max-w-[92%] p-4 text-[18px] font-[400] leading-[1.2] text-white">
                      {post.title}
                    </h3>
                  </Link>
                ))}
            </div>

            {/* SCROLL CTA */}
            <a
              href="#blog-list"
              className="mt-auto flex items-center justify-center gap-2 pt-8 transition-opacity hover:opacity-80"
            >
              <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#0D54CA]">
                SCROLL TO READ MORE
              </span>

              <ChevronsDown
                className="h-5 w-5 text-[#0D54CA]"
                strokeWidth={2.5}
              />
            </a>
          </div>
        </motion.aside>
      </SiteContainer>
    </section>
  );
}