import { cacheLife } from "next/cache";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { getAllPosts, urlFor, type Post } from "@/lib/sanity";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, guides, and updates from the XenReality team.",
};

// ── Static posts ───────────────────────────────────────────────────────────────

export interface StaticPost {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  image: string | null;
  gradient: string;
}

export const STATIC_POSTS: StaticPost[] = [
  {
    slug: "activity-tracking-using-video-analytics",
    title: "Activity Tracking Using Video Analytics: How Lightweight Vision AI Models Are Transforming Industrial Monitoring",
    excerpt: "With Vision AI, enterprises can move from passive to continuous monitoring — with their existing infrastructure.",
    readTime: "3 min read",
    image: null,
    gradient: "from-orange-950 via-gray-800 to-gray-900",
  },
  {
    slug: "vision-ai-based-inspection-systems",
    title: "Vision AI-Based Inspection Systems: Revolutionizing Quality Control",
    excerpt: "Vision AI-based inspection systems — a transformative technology that's reshaping quality control across industries.",
    readTime: "2 min read",
    image: null,
    gradient: "from-blue-950 via-gray-800 to-gray-900",
  },
];

// ── Data fetching ──────────────────────────────────────────────────────────────

async function getSanityPosts(): Promise<Post[]> {
  "use cache";
  cacheLife("minutes");
  if (
    !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "your-project-id"
  ) {
    return [];
  }
  try {
    return await getAllPosts();
  } catch {
    return [];
  }
}

// ── Static post card ───────────────────────────────────────────────────────────

function StaticPostCard({ post }: { post: StaticPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col sm:flex-row items-stretch border border-gray-700 rounded-2xl overflow-hidden hover:border-gray-500 transition-colors duration-300"
    >
      {/* Image / gradient */}
      <div
        className={`relative shrink-0 w-full sm:w-64 md:w-80 aspect-[4/3] sm:aspect-auto bg-gradient-to-br ${post.gradient} overflow-hidden`}
      >
        {post.image ? (
          <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center gap-3 p-6 md:p-8 flex-1">
        <span className="text-xs font-medium text-gray-400">{post.readTime}</span>
        <h2 className="text-lg md:text-xl font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
          {post.title}
        </h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          {post.excerpt}
        </p>
        <span className="text-sm text-blue-400 font-medium mt-1 group-hover:underline">
          Read more →
        </span>
      </div>
    </Link>
  );
}

// ── Sanity post card ───────────────────────────────────────────────────────────

function SanityPostCard({ post }: { post: Post }) {
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(640).height(480).url()
    : null;

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group flex flex-col sm:flex-row items-stretch border border-gray-700 rounded-2xl overflow-hidden hover:border-gray-500 transition-colors duration-300"
    >
      <div className="relative shrink-0 w-full sm:w-64 md:w-80 aspect-[4/3] sm:aspect-auto bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
        {imageUrl ? (
          <Image src={imageUrl} alt={(post.mainImage as { alt?: string })?.alt ?? post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-4xl font-black">
            {post.title[0]}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center gap-3 p-6 md:p-8 flex-1">
        {post.category && (
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">{post.category}</span>
        )}
        <h2 className="text-lg md:text-xl font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sm text-gray-400 leading-relaxed">{post.excerpt}</p>
        )}
        <span className="text-sm text-blue-400 font-medium mt-1 group-hover:underline">Read more →</span>
      </div>
    </Link>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function BlogPage() {
  const sanityPosts = await getSanityPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-950 pt-24">
        {/* Header */}
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <p className="text-sm uppercase tracking-widest text-blue-400 font-semibold mb-3">
            Blog
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Insights & Updates
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
            Latest thinking on Vision AI, industrial automation, and technology trends.
          </p>
        </div>

        {/* Posts */}
        <div className="max-w-5xl mx-auto px-6 pb-28 flex flex-col gap-6">
          {STATIC_POSTS.map((post) => (
            <StaticPostCard key={post.slug} post={post} />
          ))}
          {sanityPosts.map((post) => (
            <SanityPostCard key={post._id} post={post} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
