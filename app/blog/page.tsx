import { cacheLife } from "next/cache";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { getAllPosts, urlFor, type Post } from "@/lib/sanity";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, guides, and updates from our team.",
};

async function getPosts(): Promise<Post[]> {
  "use cache";
  cacheLife("minutes");
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "your-project-id") {
    return [];
  }
  try {
    return await getAllPosts();
  } catch {
    return [];
  }
}

function PostCard({ post }: { post: Post }) {
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(800).height(450).url()
    : null;

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={(post.mainImage as { alt?: string })?.alt ?? post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-blue-200 text-4xl font-black">
            {post.title[0]}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-6 flex-1">
        {post.category && (
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            {post.category}
          </span>
        )}
        <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
          {post.author && (
            <span className="text-xs text-gray-400 font-medium">{post.author}</span>
          )}
          {post.publishedAt && (
            <span className="text-xs text-gray-400 ml-auto">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-24">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <p className="text-sm uppercase tracking-widest text-blue-600 font-semibold mb-3">
            Blog
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Insights & Updates
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            Latest thinking on fleet safety, operations technology, and industry
            trends.
          </p>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-28">
          {posts.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <p className="text-xl font-medium">No posts yet.</p>
              <p className="mt-2 text-sm">Check back soon or add posts in the Sanity Studio.</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
