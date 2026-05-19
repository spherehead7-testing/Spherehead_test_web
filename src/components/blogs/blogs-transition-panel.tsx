import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import RotatingDots from "@/components/ui/rotating-dots";
import { featuredBlogPosts } from "@/data/blog-posts";

export default function BlogsTransitionPanel() {
  return (
    <div className="h-full overflow-hidden bg-white px-10 pt-16 text-[#01030B] lg:px-16 lg:pt-20">
      <div className="mb-8 flex items-center gap-3">
        <RotatingDots />
        <h2 className="body-small font-[500]">Featured Stories</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {featuredBlogPosts.slice(0, 3).map((post, index) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className={[
              "group relative block aspect-[1.48/1] min-h-[214px] overflow-hidden rounded-[2px] bg-[#0A2F76] text-white",
              index === 1 ? "md:mt-7" : "",
            ].join(" ")}
          >
            <Image
              src={post.image}
              alt=""
              fill
              priority={index === 0}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06142E]/78 via-[#06142E]/18 to-transparent" />
            <ArrowUpRight className="absolute right-4 top-4 z-10 h-6 w-6 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />

            <h3 className="heading-3 absolute inset-x-0 bottom-0 z-10 max-w-[92%] p-4 leading-[1.18] text-white">
              {post.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
