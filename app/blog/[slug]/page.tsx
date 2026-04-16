import { Suspense } from "react";
import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { getPostBySlug, urlFor } from "@/lib/sanity";
import type { Post } from "@/lib/sanity";
import type { Metadata } from "next";

async function fetchPost(slug: string): Promise<Post | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`post-${slug}`);
  if (
    !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "your-project-id"
  ) {
    return null;
  }
  try {
    return await getPostBySlug(slug);
  } catch {
    return null;
  }
}

const portableComponents = {
  types: {
    image: ({
      value,
    }: {
      value: { asset: unknown; alt?: string; caption?: string };
    }) => {
      const url = urlFor(value).width(1200).url();
      return (
        <figure className="my-8">
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <Image src={url} alt={value.alt ?? ""} fill className="object-cover" />
          </div>
          {value.caption && (
            <figcaption className="text-sm text-gray-400 text-center mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

async function PostContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await fetchPost(slug);

  if (!post) notFound();

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1400).height(700).url()
    : null;

  return (
    <article className="max-w-3xl mx-auto px-6 pb-28">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-10 mt-8"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M19 12H5M12 5l-7 7 7 7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to blog
      </Link>

      {post.category && (
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">
          {post.category}
        </p>
      )}

      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
        {post.title}
      </h1>

      <div className="flex items-center gap-4 text-sm text-gray-400 mb-10">
        {post.author && (
          <span className="font-medium text-gray-600">{post.author}</span>
        )}
        {post.publishedAt && (
          <span>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        )}
      </div>

      {imageUrl && (
        <div className="relative aspect-[2/1] rounded-2xl overflow-hidden mb-12 bg-gray-100">
          <Image
            src={imageUrl}
            alt={(post.mainImage as { alt?: string })?.alt ?? post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {post.body && (
        <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
          <PortableText
            value={post.body as Parameters<typeof PortableText>[0]["value"]}
            components={portableComponents}
          />
        </div>
      )}
    </article>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">
        <Suspense
          fallback={
            <div className="max-w-3xl mx-auto px-6 py-24 text-gray-400 text-sm">
              Loading post…
            </div>
          }
        >
          <PostContent params={params} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
