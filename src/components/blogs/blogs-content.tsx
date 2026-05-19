import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";
import { motion, AnimatePresence } from "motion/react";
import {
  blogCategories,
  blogPosts,
  featuredBlogPosts,
  type BlogCategory,
  type BlogPost,
} from "@/data/blog-posts";

type CategoryFilter = "All" | BlogCategory;

const categoryFilters: CategoryFilter[] = ["All", ...blogCategories];

type BlogsContentProps = {
  id?: string | null;
  className?: string;
};

export default function BlogsContent({
  id,
  className = "",
}: BlogsContentProps) {
  const sectionId = id === undefined ? "blog-list" : id ?? undefined;

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        !query ||
        [post.title, post.category, post.excerpt, post.date]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div id={sectionId} className={`scroll-mt-20 bg-white ${className}`}>
      <SiteContainer className="pt-20 pb-20 lg:pt-24 lg:pb-28">
        <section>
          <div className="flex items-center gap-3">
            <RotatingDots variant="light" />
            <h1 className="body-small text-sm font-[500] text-[#334164]">
              Featured Stories
            </h1>
          </div>
        </section>

        <section className="mt-10 lg:mt-12" aria-labelledby="featured-title">
          {/* Mobile: horizontal scroll carousel */}
          <div className="md:hidden">
            <FeaturedCarousel posts={featuredBlogPosts.slice(0, 4)} />
          </div>

          {/* Desktop: 3-column grid */}
          <div className="hidden md:grid gap-6 md:grid-cols-3 max-w-[1600px] mx-auto">
            {featuredBlogPosts.slice(0, 3).map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 }}
              >
                <Link
                  href={`/blogs/${post.slug}`}
                  className="group relative block aspect-[1.5/1] min-h-[214px] overflow-hidden rounded-[2px] bg-[#0A2F76] p-4 text-white transition-transform duration-300 hover:-translate-y-1"
                >
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    priority={index === 0}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06142E]/78 via-[#06142E]/18 to-transparent" />

                  <ArrowUpRight className="absolute right-4 top-4 z-10 h-6 w-6 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />

                  <div className="absolute inset-x-0 bottom-0 z-10 p-4 mb-3">
                    <h3 className="body-small max-w-[92%] text-[19px] font-[400] leading-[1.18] text-white sm:text-[22px]">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-14 lg:mt-16" aria-labelledby="latest-title">
          <div className="-mx-4 mb-8 px-4 py-4 lg:-mx-8 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <label className="relative w-full max-w-[455px] order-first lg:order-last lg:mb-0">
                <span className="sr-only">Search by keywords</span>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search By Keywords"
                  className="h-8 w-full border-0 border-b border-[#6c7078] bg-transparent pr-9 pb-4 text-[12px] text-[#01030B] outline-none placeholder:text-[#858b94] focus:border-[#155ACD]"
                />
                <Search
                  className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6c7078]"
                  strokeWidth={1.7}
                />
              </label>

              <div>
                <h2 id="latest-title" className="sr-only">
                  Latest insights
                </h2>

                <div
                  className="flex flex-nowrap overflow-x-auto gap-2 pb-2 -mx-1 px-1"
                  aria-label="Filter blog categories"
                >
                  {categoryFilters.map((category) => {
                    const isSelected = selectedCategory === category;

                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setSelectedCategory(category)}
                        className={[
                          "h-8 border px-3 text-[11px] md:text-[12px] whitespace-nowrap transition-colors rounded-xs shrink-0",
                          isSelected
                            ? "border-[#155ACD] bg-[#155ACD] text-white"
                            : "border-[#aeb4bd] bg-white text-[#7c828c] hover:border-[#155ACD] hover:text-[#155ACD]",
                        ].join(" ")}
                      >
                        {category === "All" ? "All Topics" : category}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="mt-9 bg-[#f3f3f4] px-7 py-10 text-[15px] text-[#6c7078]">
              No blog posts found for this keyword.
            </div>
          ) : null}

          <motion.div layout className="mt-5 grid grid-cols-2 gap-4 md:gap-5 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, index) => (
                <motion.article
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                    delay: (index % 3) * 0.1
                  }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  key={post.slug}
                  className="group relative min-h-[180px] md:min-h-[334px] overflow-hidden bg-[#f3f3f4] p-3 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(38,102,210,0.12)] rounded-xs"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbff] via-[#edf5ff] to-[#e4efff]" />
                  </div>

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-3 md:mb-4">
                      <span className="inline-flex bg-white px-2 py-1 md:px-3 md:py-2 text-[10px] md:text-[12px] font-[400] leading-none text-[#2666D2] rounded-xs">
                        {post.category}
                      </span>
                    </div>

                    <h3 className="max-w-[92%] text-[13px] md:text-[24px] font-[400] leading-[1.3] md:leading-[1.22] text-[#01030B] mb-6 md:mb-28">
                      {post.title}.
                    </h3>

                    <p className="mt-auto max-w-[82%] pb-0 text-[11px] md:text-[18px] leading-[1.4] md:leading-[1.32] text-[#8b8f98]">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="absolute bottom-0 right-0 z-20">
                    <Link
                      href={`/blogs/${post.slug}`}
                      aria-label={`Read full story: ${post.title}`}
                      className="grid h-14 w-14 place-items-center bg-animated-gradient text-white opacity-0 transition-all duration-300 group-hover:opacity-100 rounded-xs"
                    >
                      <ArrowUpRight className="h-7 w-7 text-white stroke-[1.25] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </SiteContainer>
    </div>
  );
}

/** Mobile featured stories carousel — auto-slides + swipeable */
function FeaturedCarousel({ posts }: { posts: BlogPost[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.scrollWidth / posts.length;
    container.scrollTo({ left: cardWidth * index, behavior: "smooth" });
  }, [posts.length]);

  // Auto-slide every 4 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % posts.length;
        scrollToIndex(next);
        return next;
      });
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [posts.length, scrollToIndex]);

  // Track manual scroll
  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.scrollWidth / posts.length;
    const newIndex = Math.round(container.scrollLeft / cardWidth);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
      // Reset auto-slide timer on manual interaction
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          const next = (prev + 1) % posts.length;
          scrollToIndex(next);
          return next;
        });
      }, 4000);
    }
  };

  return (
    <div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="group relative block w-[75vw] shrink-0 snap-center aspect-[1.6/1] overflow-hidden rounded-[4px] bg-[#0A2F76] text-white"
          >
            <Image
              src={post.image}
              alt=""
              fill
              priority={index === 0}
              className="object-cover"
              sizes="75vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06142E]/75 via-[#06142E]/15 to-transparent" />

            <ArrowUpRight className="absolute right-3 top-3 z-10 h-5 w-5 text-white" />

            <div className="absolute inset-x-0 bottom-0 z-10 p-3">
              <h3 className="text-[13px] font-[400] leading-[1.25] text-white max-w-[90%]">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-3">
        {posts.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              setActiveIndex(index);
              scrollToIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === activeIndex ? "bg-[#0D54CA]" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
