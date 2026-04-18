import { Suspense } from "react";
import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { getPostBySlug, urlFor } from "@/lib/sanity";
import { STATIC_POSTS, type StaticPost } from "@/app/blog/page";
import type { Post } from "@/lib/sanity";
import type { Metadata } from "next";

// ── Static post content ────────────────────────────────────────────────────────

type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

const STATIC_CONTENT: Record<string, { publishedAt: string; blocks: Block[] }> = {
  "activity-tracking-using-video-analytics": {
    publishedAt: "Dec 23, 2025",
    blocks: [
      { type: "h2", text: "From Passive CCTV to Active Intelligence" },
      { type: "p",  text: "For decades, CCTV cameras have been installed across factories, warehouses, offices, utilities, and public infrastructure — primarily for surveillance and post-incident review. However, most video data remains underutilized." },
      { type: "p",  text: "With advancements in video analytics and lightweight Vision AI models, enterprises can now transform existing camera feeds into continuous sources of operational intelligence — without replacing infrastructure or deploying expensive hardware. Activity tracking is at the center of this shift." },

      { type: "h2", text: "What Is Activity Tracking in Video Analytics?" },
      { type: "p",  text: "Activity tracking refers to the automated detection, classification, and analysis of human or object movement and actions within a video stream. Unlike traditional motion detection, modern Vision AI systems understand what is happening, not just that something moved." },
      { type: "p",  text: "Typical activities tracked include:" },
      { type: "ul", items: [
        "Human movement and dwell time",
        "Task execution and sequence adherence",
        "Equipment usage and idle time",
        "Unsafe or non-compliant actions",
        "Zone entry, exit, and congestion patterns",
      ]},
      { type: "p",  text: "The result is structured data extracted from unstructured video — delivered in real time or as actionable reports." },

      { type: "h2", text: "Why Lightweight Vision AI Models Matter" },
      { type: "p",  text: "Many early video analytics systems relied on large, compute-heavy deep learning models that required GPUs, cloud processing, and high bandwidth. These approaches often fail in real-world enterprise environments due to cost, latency, and data security concerns." },
      { type: "p",  text: "Lightweight Vision AI models are designed differently:" },
      { type: "ul", items: [
        "Optimized CNNs and task-specific models",
        "Edge or near-edge deployment capability",
        "Lower compute and power requirements",
        "Faster inference with minimal latency",
        "Easier integration with on-prem systems",
      ]},
      { type: "p",  text: "This makes them ideal for continuous activity tracking at scale, especially in industrial and infrastructure settings." },

      { type: "h2", text: "Leveraging Existing CCTV Infrastructure" },
      { type: "p",  text: "One of the biggest advantages of modern video analytics is the ability to work with existing CCTV cameras." },
      { type: "p",  text: "Most enterprises already have:" },
      { type: "ul", items: [
        "Fixed-angle cameras",
        "Mixed resolutions and lighting conditions",
        "Legacy VMS systems",
      ]},
      { type: "p",  text: "Lightweight Vision AI models can be trained and tuned to operate reliably on these feeds, eliminating the need for new sensors or hardware upgrades. This dramatically reduces deployment friction and accelerates ROI." },

      { type: "h2", text: "Key Use Cases Across Industries" },

      { type: "h3", text: "Manufacturing & Warehousing" },
      { type: "ul", items: [
        "Tracking worker movement and task cycles",
        "Identifying bottlenecks and idle time",
        "Verifying SOP compliance on shop floors",
        "Improving productivity and safety simultaneously",
      ]},

      { type: "h3", text: "Energy & Utilities" },
      { type: "ul", items: [
        "Monitoring field activity during installations and maintenance",
        "Verifying work completion through visual evidence",
        "Detecting unsafe practices near live equipment",
        "Supporting audit and compliance workflows",
      ]},

      { type: "h3", text: "Retail & Facilities" },
      { type: "ul", items: [
        "Measuring footfall and dwell time",
        "Staff activity tracking during operating hours",
        "Queue and congestion analysis",
        "Loss prevention and operational optimization",
      ]},

      { type: "h3", text: "Infrastructure & Smart Cities" },
      { type: "ul", items: [
        "Crowd flow and congestion analysis",
        "Restricted zone violation detection",
        "Public asset usage monitoring",
        "Data-driven urban planning insights",
      ]},

      { type: "h2", text: "How Activity Tracking Works: A Simplified Architecture" },
      { type: "ol", items: [
        "Video Ingestion from CCTV or IP cameras",
        "Frame Sampling & Preprocessing",
        "Lightweight Vision AI Inference (person detection, pose, action recognition)",
        "Activity Classification & Event Logic",
        "Metadata Generation (timestamps, counts, durations)",
        "Dashboards, Alerts, or API Integration",
      ]},
      { type: "p",  text: "This modular architecture allows enterprises to start small and scale use cases incrementally." },

      { type: "h2", text: "Why Enterprises Are Moving Away from Heavy Models" },
      { type: "p",  text: "Heavy, generalized models often struggle with:" },
      { type: "ul", items: [
        "High operational cost",
        "Poor performance in constrained environments",
        "Long deployment cycles",
        "Cloud dependency and data privacy risks",
      ]},
      { type: "p",  text: "Enterprises today prefer purpose-built, efficient Vision AI models that solve specific operational problems reliably — rather than one-size-fits-all AI." },

      { type: "h2", text: "XenReality's Approach to Activity Tracking" },
      { type: "p",  text: "At XenReality, we focus on deployable Vision AI, not experimental demos." },
      { type: "p",  text: "Our activity tracking solutions are built on:" },
      { type: "ul", items: [
        "Lightweight, optimized vision models",
        "On-prem or hybrid deployment flexibility",
        "Compatibility with existing CCTV systems",
        "Custom logic tailored to enterprise workflows",
        "Structured outputs that integrate with business systems",
      ]},
      { type: "p",  text: "The goal is simple: convert video into measurable productivity, safety, and compliance outcomes." },

      { type: "h2", text: "From Video to Measurable Outcomes" },
      { type: "p",  text: "Cameras already see everything. The missing layer has been intelligence. With modern video analytics and lightweight Vision AI, enterprises can finally move from passive monitoring to continuous, data-driven decision making — using the infrastructure they already own." },
    ],
  },

  "vision-ai-based-inspection-systems": {
    publishedAt: "May 7, 2025",
    blocks: [
      { type: "h2", text: "What Are Vision AI-Based Inspection Systems?" },
      { type: "p",  text: "At their core, vision AI systems combine computer vision and artificial intelligence to inspect products or processes using images or video streams. These systems are trained to recognize patterns, detect defects, and make real-time decisions that previously required human intervention." },
      { type: "p",  text: "They typically include:" },
      { type: "ul", items: [
        "High-resolution cameras and lighting",
        "AI algorithms (e.g., deep learning models)",
        "Edge or cloud computing for processing",
        "Integration with manufacturing systems (e.g., PLCs, MES)",
      ]},

      { type: "h2", text: "Key Benefits" },

      { type: "h3", text: "1. Unmatched Accuracy and Consistency" },
      { type: "p",  text: "AI-powered systems can detect defects and subtle anomalies that humans may miss — especially over long shifts." },

      { type: "h3", text: "2. Faster Throughput" },
      { type: "p",  text: "Unlike human inspectors, AI systems don't tire. They process images at high speed, enabling manufacturers to maintain or even increase production rates without compromising quality." },

      { type: "h3", text: "3. Reduced Costs" },
      { type: "p",  text: "While the upfront investment can be significant, long-term savings come from fewer product recalls, less rework, reduced labor costs, and minimized waste." },

      { type: "h3", text: "4. Scalability and Adaptability" },
      { type: "p",  text: "Modern vision AI platforms adapt to different inspection tasks, from surface defect detection to dimension measurement and label verification." },

      { type: "h3", text: "5. Real-Time Analytics and Traceability" },
      { type: "p",  text: "Advanced systems provide insights into defect trends, helping improve upstream processes and enabling full traceability for regulatory compliance." },

      { type: "h2", text: "Technology Under the Hood" },
      { type: "p",  text: "Vision AI systems leverage several cutting-edge technologies:" },
      { type: "ul", items: [
        "Convolutional Neural Networks (CNNs): Ideal for image classification and object detection.",
        "Edge Computing: Enables real-time processing on the production floor, reducing latency.",
        "Machine Learning Ops (MLOps): Tools to manage, monitor, and update AI models at scale.",
        "3D Vision and Depth Sensing: For more complex inspections like volume measurement or assembly verification.",
      ]},

      { type: "h2", text: "Use Cases Across Industries" },
      { type: "ul", items: [
        "Automotive: Detect paint defects, verify assembly, or measure part dimensions.",
        "Electronics: Inspect PCBs for soldering defects or component misplacements.",
        "Pharmaceuticals: Ensure correct labeling, packaging integrity, and tablet uniformity.",
        "Food & Beverage: Check for contamination, labeling errors, and fill levels.",
      ]},

      { type: "h2", text: "Conclusion" },
      { type: "p",  text: "Vision AI-based inspection systems represent a strategic asset combining industrial camera precision with AI intelligence. As models become more accessible and hardware costs decrease, adoption is expected to grow. Now is the time for manufacturers to explore how Vision AI can future-proof their quality control operations." },
    ],
  },
};

// ── Data fetching ──────────────────────────────────────────────────────────────

async function fetchSanityPost(slug: string): Promise<Post | null> {
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

// ── Portable text components ───────────────────────────────────────────────────

const portableComponents = {
  types: {
    image: ({ value }: { value: { asset: unknown; alt?: string; caption?: string } }) => {
      const url = urlFor(value).width(1200).url();
      return (
        <figure className="my-8">
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <Image src={url} alt={value.alt ?? ""} fill className="object-cover" />
          </div>
          {value.caption && (
            <figcaption className="text-sm text-gray-500 text-center mt-2">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
};

// ── Back link ──────────────────────────────────────────────────────────────────

function BackLink() {
  return (
    <Link
      href="/blog"
      className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-10 mt-8"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Back to blog
    </Link>
  );
}

// ── Static post view ───────────────────────────────────────────────────────────

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-3">{block.text}</h2>;
    case "h3":
      return <h3 key={i} className="text-lg font-semibold text-blue-400 mt-6 mb-2">{block.text}</h3>;
    case "p":
      return <p key={i} className="text-gray-300 text-base md:text-lg leading-relaxed">{block.text}</p>;
    case "ul":
      return (
        <ul key={i} className="flex flex-col gap-2 pl-1">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-gray-300 text-base md:text-lg leading-relaxed">
              <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i} className="flex flex-col gap-2 pl-1">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-gray-300 text-base md:text-lg leading-relaxed">
              <span className="shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex items-center justify-center mt-0.5">
                {j + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      );
  }
}

function StaticPostView({ post }: { post: StaticPost }) {
  const content = STATIC_CONTENT[post.slug];

  return (
    <article className="max-w-3xl mx-auto px-6 pb-28">
      <BackLink />

      <p className="text-sm text-gray-500 mb-3">{content?.publishedAt} · {post.readTime}</p>

      <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-10">
        {post.title}
      </h1>

      {/* Hero gradient banner */}
      <div className={`w-full h-48 rounded-2xl bg-gradient-to-br ${post.gradient} mb-12`} />

      <div className="flex flex-col gap-5">
        {content?.blocks.map((block, i) => renderBlock(block, i))}
      </div>
    </article>
  );
}

// ── Sanity post view ───────────────────────────────────────────────────────────

async function SanityPostContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await fetchSanityPost(slug);
  if (!post) notFound();

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1400).height(700).url()
    : null;

  return (
    <article className="max-w-3xl mx-auto px-6 pb-28">
      <BackLink />

      {post.category && (
        <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4">{post.category}</p>
      )}

      <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">{post.title}</h1>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-10">
        {post.author && <span className="font-medium text-gray-400">{post.author}</span>}
        {post.publishedAt && (
          <span>
            {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </span>
        )}
      </div>

      {imageUrl && (
        <div className="relative aspect-[2/1] rounded-2xl overflow-hidden mb-12 bg-gray-800">
          <Image
            src={imageUrl}
            alt={(post.mainImage as { alt?: string })?.alt ?? post.title}
            fill className="object-cover" priority
          />
        </div>
      )}

      {post.body && (
        <div className="prose prose-lg prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
          <PortableText
            value={post.body as Parameters<typeof PortableText>[0]["value"]}
            components={portableComponents}
          />
        </div>
      )}
    </article>
  );
}

// ── Metadata ───────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const staticPost = STATIC_POSTS.find((p) => p.slug === slug);
  if (staticPost) {
    return { title: staticPost.title, description: staticPost.excerpt };
  }

  const post = await fetchSanityPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const staticPost = STATIC_POSTS.find((p) => p.slug === slug);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-950 pt-24">
        {staticPost ? (
          <StaticPostView post={staticPost} />
        ) : (
          <Suspense
            fallback={
              <div className="max-w-3xl mx-auto px-6 py-24 text-gray-500 text-sm">
                Loading post…
              </div>
            }
          >
            <SanityPostContent params={params} />
          </Suspense>
        )}
      </main>
      <Footer />
    </>
  );
}
