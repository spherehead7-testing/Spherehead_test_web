import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { GetStaticPaths, GetStaticProps } from "next";
import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";
import { newsPosts, type NewsPost } from "@/data/news-posts";

type NewsStoryPageProps = {
  post: NewsPost;
};

export const getStaticPaths: GetStaticPaths = () => ({
  paths: newsPosts.map((post) => ({
    params: { slug: post.slug },
  })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<NewsStoryPageProps> = ({
  params,
}) => {
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const post = newsPosts.find((item) => item.slug === slug);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: { post },
  };
};

export default function NewsStoryPage({ post }: NewsStoryPageProps) {
  return (
    <>
      <Head>
        <title>{post.title} | Spherehead Technologies</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <main className="min-h-screen bg-white text-[#01030B]">
        <SiteContainer className="pt-28 pb-20 lg:pt-36 lg:pb-28">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#2666D2] transition-colors hover:text-[#0A2F76]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to news
          </Link>

          <article className="mt-10">
            <div className="mb-5 flex items-center gap-3">
              <RotatingDots variant="light"/>
              <span className="text-sm text-[#5c667a]">{post.category}</span>
            </div>

            <h1 className="max-w-4xl text-[42px] font-[500] leading-[1.05] text-[#01030B] sm:text-[56px] lg:text-[72px]">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#5c667a]">
              <span>{post.date}</span>
              <span aria-hidden="true">/</span>
              <span>{post.readTime}</span>
            </div>

            <div className="relative mt-12 aspect-[16/8] overflow-hidden rounded-[8px] bg-[#edf4ff]">
              <Image
                src={post.image}
                alt=""
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 1120px, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#06142E]/80 via-[#0A2F76]/35 to-transparent" />
            </div>

            <div className="mx-auto mt-12 max-w-3xl space-y-7 text-[18px] leading-[1.85] text-[#263348]">
              {post.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </SiteContainer>
      </main>
    </>
  );
}
