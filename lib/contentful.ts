/**
 * Contentful integration — dual mode.
 *
 * A single client that reads either the Delivery API (published content,
 * used by the production static build) or the Preview API (published +
 * drafts, used by the live preview environment). The mode is chosen by the
 * CONTENTFUL_PREVIEW env flag:
 *
 *   production build  → CONTENTFUL_PREVIEW unset → cdn.contentful.com
 *   preview (Vercel)  → CONTENTFUL_PREVIEW=true  → preview.contentful.com
 *
 * If the env vars are absent (e.g. before credentials are wired), every
 * helper degrades gracefully to empty results so the site still builds.
 */
import {
  createClient,
  type EntryFieldTypes,
  type EntrySkeletonType,
  type Entry,
  type Asset,
} from "contentful";
import type { Document } from "@contentful/rich-text-types";

const SPACE = process.env.CONTENTFUL_SPACE_ID;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || "master";
const PREVIEW = process.env.CONTENTFUL_PREVIEW === "true";
const TOKEN = PREVIEW
  ? process.env.CONTENTFUL_PREVIEW_TOKEN
  : process.env.CONTENTFUL_DELIVERY_TOKEN;

/** The Contentful content type ID for a blog post. */
export const BLOG_POST_TYPE = "blogPost";

/** Field shape of the `blogPost` content type (see CONTENTFUL.md for the spec). */
export type BlogPostSkeleton = EntrySkeletonType<
  {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    excerpt: EntryFieldTypes.Text;
    body: EntryFieldTypes.RichText;
    coverImage: EntryFieldTypes.AssetLink;
    tags: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    publishedDate: EntryFieldTypes.Date;
    author: EntryFieldTypes.Symbol;
    lang: EntryFieldTypes.Symbol; // "fr" | "en" — set on every entry
  },
  typeof BLOG_POST_TYPE
>;

/** App-facing, flattened blog post — decoupled from Contentful's entry shape. */
export type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  body: Document | null;
  coverImageUrl: string | null;
  coverImageAlt: string;
  tags: string[];
  publishedDate: string | null;
  author: string;
};

function getClient() {
  if (!SPACE || !TOKEN) return null;
  return createClient({
    space: SPACE,
    environment: ENVIRONMENT,
    accessToken: TOKEN,
    host: PREVIEW ? "preview.contentful.com" : "cdn.contentful.com",
  });
}

/** True when Contentful credentials are configured. */
export const isContentfulConfigured = Boolean(SPACE && TOKEN);

function assetUrl(asset: Asset | undefined): string | null {
  const url = asset?.fields?.file?.url;
  if (typeof url !== "string") return null;
  // Contentful returns protocol-relative URLs (//images.ctfassets.net/...).
  return url.startsWith("//") ? `https:${url}` : url;
}

function toPost(entry: Entry<BlogPostSkeleton>): BlogPost {
  const f = entry.fields;
  const cover = f.coverImage as Asset | undefined;
  return {
    title: (f.title as string) ?? "",
    slug: (f.slug as string) ?? "",
    excerpt: (f.excerpt as string) ?? "",
    body: (f.body as Document) ?? null,
    coverImageUrl: assetUrl(cover),
    coverImageAlt:
      (cover?.fields?.title as string) ?? (f.title as string) ?? "",
    tags: Array.isArray(f.tags) ? (f.tags as string[]) : [],
    publishedDate: (f.publishedDate as string) ?? null,
    author: (f.author as string) ?? "",
  };
}

/** All posts for a locale, newest first. Returns [] when unconfigured or on error.
 *
 * Filters by the `lang` field (set explicitly on every entry — "fr" or "en"),
 * which is reliable regardless of Contentful locale-query fallback behaviour.
 */
export async function getAllPosts(locale: "en" | "fr" = "fr"): Promise<BlogPost[]> {
  const client = getClient();
  if (!client) return [];
  try {
    const res = await client.getEntries<BlogPostSkeleton>({
      content_type: BLOG_POST_TYPE,
      "fields.lang": locale,
      locale: locale === "fr" ? "fr" : "en-US",
      order: ["-fields.publishedDate"],
      include: 2,
      limit: 1000,
    });
    return res.items.map(toPost);
  } catch (err) {
    console.warn("[contentful] getAllPosts failed:", (err as Error).message);
    return [];
  }
}

/** A single post by slug and locale, or null if not found. */
export async function getPostBySlug(slug: string, locale: "en" | "fr" = "fr"): Promise<BlogPost | null> {
  const client = getClient();
  if (!client) return null;
  try {
    const res = await client.getEntries<BlogPostSkeleton>({
      content_type: BLOG_POST_TYPE,
      "fields.slug": slug,
      "fields.lang": locale,
      locale: locale === "fr" ? "fr" : "en-US",
      include: 2,
      limit: 1,
    });
    return res.items[0] ? toPost(res.items[0]) : null;
  } catch (err) {
    console.warn("[contentful] getPostBySlug failed:", (err as Error).message);
    return null;
  }
}

/** The unique set of tags across all posts for a locale, alphabetically sorted. */
export async function getAllTags(locale: "en" | "fr" = "fr"): Promise<string[]> {
  const posts = await getAllPosts(locale);
  const set = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return [...set].sort((a, b) => a.localeCompare(b, locale));
}

/** Posts filtered to a given tag and locale, newest first. */
export async function getPostsByTag(tag: string, locale: "en" | "fr" = "fr"): Promise<BlogPost[]> {
  const posts = await getAllPosts(locale);
  return posts.filter((p) => p.tags.includes(tag));
}

/** URL-safe slug for a tag (tags may contain spaces/accents). */
export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
