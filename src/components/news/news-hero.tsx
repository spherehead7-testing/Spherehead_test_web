import Image from "next/image";
import Link from "next/link";
import { ChevronsDown, ArrowUpRight } from "lucide-react";
import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";
import { featuredNewsPosts } from "@/data/news-posts";
import { motion, useTransform, type MotionValue } from "motion/react";
import { useIsMobile } from "@/hooks/use-is-mobile";

export default function NewsHero({
    progress,
}: {
    progress: MotionValue<number>;
}) {
    const isMobile = useIsMobile();

    // Suddenly move the white aside panel to the right as scroll begins
    // It moves 120% to the right within the first 20% of the transition range
    const asideX = useTransform(progress || 0, [0, 0.2], ["0%", "120%"]);
    const contentOpacity = useTransform(progress || 0, [0, 0.2], [1, 0]);
    const contentY = useTransform(progress || 0, [0, 0.2], [0, -300]);

    // Mobile: simple static hero
    if (isMobile) {
        return (
            <section className="relative min-h-[88svh] flex flex-col overflow-hidden text-white">
                <SiteContainer className="relative z-10 flex flex-col h-full flex-grow justify-end pb-10 pt-20">
                    <div className="w-full flex flex-col mt-auto">
                        <div className="w-full h-[1px] bg-white/20 mb-6" />
                        <h1 className="inner-hero">News</h1>
                    </div>
                </SiteContainer>
            </section>
        );
    }

    return (
        <section className="relative min-h-screen overflow-hidden text-white">
            <SiteContainer className="relative z-10 grid min-h-screen max-w-none gap-10 pt-28 pb-12 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-stretch lg:pt-24 lg:pb-0 lg:pr-0 xl:grid-cols-[minmax(0,1fr)_380px] xl:pr-0">
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="flex min-h-[54vh] flex-col justify-end pb-8 lg:min-h-0 lg:pb-24 mb-[50px] md:ml-[50px]"
                >
                    <h1 className="inner-hero">News</h1>
                    <p className="heading-4 mt-7 max-w-[690px] hidden md:block">
                        Leveraging advanced technologies and innovative
                        solutions, we tackle complex business challenges,
                        delivering scalable, efficient, and future-ready digital
                        products that drive growth and market leadership
                    </p>
                </motion.div>

                <motion.aside
                    style={{ x: asideX }}
                    className="hidden lg:flex bg-white px-6 py-8 text-[#01030B] lg:min-h-[calc(100vh-104px)] lg:self-end"
                >
                    <div className="flex w-full flex-col">
                        <div className="mb-6 flex items-center gap-3">
                            <RotatingDots variant="light" />
                            <h2 className="body-small font-[500]">
                                Featured Stories
                            </h2>
                        </div>

                        <div className="space-y-5">
                            {featuredNewsPosts
                                .slice(0, 2)
                                .map((post, index) => (
                                    <Link
                                        key={post.slug}
                                        href={`/news/${post.slug}`}
                                        className="group relative block aspect-[1.54/1] overflow-hidden rounded-[2px] bg-[#0A2F76] text-white"
                                    >
                                        <Image
                                            src={post.image}
                                            alt=""
                                            fill
                                            priority={index === 0}
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(min-width: 900px) 300px, 100vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#06142E]/80 via-[#06142E]/16 to-transparent" />
                                        <ArrowUpRight className="absolute right-4 top-4 z-10 h-6 w-6 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />

                                        <h3 className="body-small absolute inset-x-0 bottom-0 z-10 max-w-[92%] p-4 leading-[1.2] text-white mb-3">
                                            {post.title}
                                        </h3>
                                    </Link>
                                ))}
                        </div>

                        <a
                            href="#news-list"
                            className="mt-auto flex items-center justify-center gap-2 pt-8 transition-opacity hover:opacity-80"
                        >
                            <span className="body-extra-small uppercase tracking-[0.12em] text-[#0D54CA]">
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
