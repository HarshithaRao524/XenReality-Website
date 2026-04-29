import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ---- GROQ Queries ----

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  author?: string;
  category?: string;
  publishedAt?: string;
  excerpt?: string;
  mainImage?: SanityImageSource & { alt?: string };
  body?: unknown[];
}

export async function getAllPosts(): Promise<Post[]> {
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      author,
      category,
      publishedAt,
      excerpt,
      mainImage
    }`
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      author,
      category,
      publishedAt,
      excerpt,
      mainImage,
      body
    }`,
    { slug }
  );
}

export async function getAllPostSlugs(): Promise<string[]> {
  const results = await sanityClient.fetch<Array<{ slug: { current: string } }>>(
    `*[_type == "post"] { slug }`
  );
  return results.map((r) => r.slug.current);
}

// ---- News Posts ----

export interface NewsPost {
  _id: string;
  headline?: string;
  content: string;
  publishedAt: string;
  images?: Array<SanityImageSource & { alt?: string; _key: string }>;
  linkedinUrl?: string;
  tags?: string[];
}

export async function getAllNewsPosts(): Promise<NewsPost[]> {
  return sanityClient.fetch(
    `*[_type == "newsPost"] | order(publishedAt desc) {
      _id,
      headline,
      content,
      publishedAt,
      images,
      linkedinUrl,
      tags
    }`
  );
}
