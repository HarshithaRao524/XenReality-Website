import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { getAllNewsPosts, urlFor, type NewsPost } from "@/lib/sanity";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

// ── Image grid ────────────────────────────────────────────────────────────────

function ImageGrid({ images }: { images: NewsPost["images"] }) {
  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden mt-4">
        <Image
          src={urlFor(images[0]).width(800).url()}
          alt={images[0].alt ?? "Post image"}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-2 mt-4">
        {images.map((img) => (
          <div key={img._key} className="relative aspect-square rounded-xl overflow-hidden">
            <Image
              src={urlFor(img).width(400).url()}
              alt={img.alt ?? "Post image"}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  // 3+ images: first image large, rest in a row
  const [first, ...rest] = images;
  return (
    <div className="mt-4 flex flex-col gap-2">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
        <Image
          src={urlFor(first).width(800).url()}
          alt={first.alt ?? "Post image"}
          fill
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {rest.slice(0, 3).map((img, i) => (
          <div key={img._key} className="relative aspect-square rounded-xl overflow-hidden">
            {i === 2 && images.length > 4 ? (
              <>
                <Image
                  src={urlFor(img).width(300).url()}
                  alt={img.alt ?? "Post image"}
                  fill
                  className="object-cover brightness-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">+{images.length - 4}</span>
                </div>
              </>
            ) : (
              <Image
                src={urlFor(img).width(300).url()}
                alt={img.alt ?? "Post image"}
                fill
                className="object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Post card ─────────────────────────────────────────────────────────────────

function PostCard({ post }: { post: NewsPost }) {
  const date = post.publishedAt
    ? format(new Date(post.publishedAt), "d MMM yyyy")
    : null;

  const lines = post.content.split("\n");
  const preview = lines.slice(0, 4).join("\n");
  const hasMore = lines.length > 4 || post.content.length > 300;

  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {/* Company avatar */}
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2E3192] to-[#00AEEF] flex items-center justify-center shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/XenRealityMark.png" alt="XenReality" className="w-7 h-7 object-contain" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">XenReality</p>
          {date && <p className="text-xs text-gray-400">{date}</p>}
        </div>

        {/* LinkedIn link */}
        {post.linkedinUrl && (
          <a
            href={post.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-1.5 text-xs text-[#0A66C2] font-medium hover:underline"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            View on LinkedIn
          </a>
        )}
      </div>

      {/* Headline */}
      {post.headline && (
        <h2 className="text-base font-semibold text-gray-900 mb-2">{post.headline}</h2>
      )}

      {/* Content */}
      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
        {hasMore ? preview + "…" : post.content}
      </p>
      {hasMore && (
        <button className="text-xs text-[#2E3192] font-medium mt-1 hover:underline">
          see more
        </button>
      )}

      {/* Images */}
      <ImageGrid images={post.images} />

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-[#2E3192] bg-blue-50 px-2.5 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
          <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 2v6h6M8 13h8M8 17h5" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-gray-700 mb-1">No posts yet</h3>
      <p className="text-sm text-gray-400 max-w-xs">
        Posts added in the Sanity Studio will appear here automatically.
      </p>
      <Link
        href="/studio"
        className="mt-5 inline-flex items-center gap-2 bg-[#2E3192] hover:bg-[#252880] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
      >
        Open Studio
      </Link>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function NewsPage() {
  let posts: NewsPost[] = [];
  try {
    posts = await getAllNewsPosts();
  } catch {
    // Sanity not configured yet — show empty state
  }

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        {/* Header */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-2xl mx-auto px-6 py-14 pt-28">
            <p className="text-xs font-semibold text-[#2E3192] uppercase tracking-widest mb-2">
              Latest from XenReality
            </p>
            <h1 className="text-3xl font-semibold text-gray-900">News</h1>
            <p className="text-sm text-gray-500 mt-2">
              Updates, announcements and stories from our LinkedIn.
            </p>
          </div>
        </div>

        {/* Feed */}
        <div className="max-w-2xl mx-auto px-6 py-10">
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="flex flex-col gap-5">
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
