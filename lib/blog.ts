/**
 * Unified blog content layer. Merges repo-authored seed posts (lib/seed-posts)
 * with Contentful entries (lib/contentful) into one Article type the blog
 * pages render. Seed posts get unique Pexels images assigned by index from
 * lib/pexels-pool.json (cover + one per section, no image repeats across the
 * seed set). Contentful posts, when present, override a seed post of the same
 * slug — so you can later replace any seed post by authoring it in Contentful.
 */
import type { Document } from "@contentful/rich-text-types";
import {
  getAllPosts as cfGetAll,
  getPostBySlug as cfGetBySlug,
  tagToSlug,
  type BlogPost,
} from "./contentful";
import { SEED_POSTS } from "./seed-posts";
import pool from "./pexels-pool.json";

export { tagToSlug };

export type ArticleSection = {
  heading: string;
  body: string[];
  imageUrl: string;
  imageAlt: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  tags: string[];
  author: string;
  publishedDate: string | null;
  coverImageUrl: string | null;
  coverImageAlt: string;
  readingMinutes: number;
  source: "seed" | "contentful";
  // Body — exactly one of these is set:
  richText?: Document | null; // Contentful posts
  intro?: string; // seed posts
  sections?: ArticleSection[]; // seed posts
  related?: string[]; // seed posts (slugs)
};

// Flatten the image pool into one ordered list; assign so every seed post
// gets a cover + up to 4 section images, each pool image used at most once.
const FLAT: { url: string; alt: string }[] = Object.values(
  pool as Record<string, { url: string; alt: string }[]>
).flat();
const BAND = SEED_POSTS.length; // 20 → images at i, i+20, i+40, i+60, i+80

function seedImage(postIndex: number, slot: number) {
  const p = FLAT[(postIndex + BAND * slot) % FLAT.length];
  return p ? { url: p.url, alt: p.alt } : { url: "", alt: "" };
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function readingMinutes(words: number): number {
  return Math.max(1, Math.round(words / 200));
}

const SEED_ARTICLES: Article[] = SEED_POSTS.map((p, i) => {
  const cover = seedImage(i, 0);
  const sections: ArticleSection[] = p.sections.map((s, j) => {
    const im = seedImage(i, j + 1);
    return { heading: s.heading, body: s.body, imageUrl: im.url, imageAlt: im.alt };
  });
  const words =
    wordCount(p.intro) +
    p.sections.reduce((n, s) => n + s.body.reduce((m, b) => m + wordCount(b), 0), 0);
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    metaDescription: p.metaDescription,
    tags: p.tags,
    author: p.author,
    publishedDate: p.publishedDate,
    coverImageUrl: cover.url,
    coverImageAlt: cover.alt || p.title,
    readingMinutes: readingMinutes(words),
    source: "seed",
    intro: p.intro,
    sections,
    related: p.related,
  };
});

// Rough word count for a Contentful Rich Text document (for reading time).
function richTextWords(doc: Document | null | undefined): number {
  if (!doc) return 0;
  let n = 0;
  const walk = (node: any) => {
    if (!node) return;
    if (node.nodeType === "text" && typeof node.value === "string") n += wordCount(node.value);
    (node.content || []).forEach(walk);
  };
  walk(doc);
  return n;
}

function contentfulToArticle(p: BlogPost): Article {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    metaDescription: p.excerpt,
    tags: p.tags,
    author: p.author,
    publishedDate: p.publishedDate,
    coverImageUrl: p.coverImageUrl,
    coverImageAlt: p.coverImageAlt,
    readingMinutes: readingMinutes(richTextWords(p.body)),
    source: "contentful",
    richText: p.body,
  };
}

function sortByDateDesc(a: Article, b: Article) {
  return (b.publishedDate || "").localeCompare(a.publishedDate || "");
}

/** All articles (Contentful overrides seed on slug collision), newest first. */
export async function getAllArticles(): Promise<Article[]> {
  const cf = (await cfGetAll()).map(contentfulToArticle);
  const bySlug = new Map<string, Article>();
  for (const a of SEED_ARTICLES) bySlug.set(a.slug, a);
  for (const a of cf) bySlug.set(a.slug, a); // Contentful wins
  return [...bySlug.values()].sort(sortByDateDesc);
}

/** A single article by slug — Contentful first, then seed. */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const cf = await cfGetBySlug(slug);
  if (cf) return contentfulToArticle(cf);
  return SEED_ARTICLES.find((a) => a.slug === slug) ?? null;
}

/** All tags across every article, alphabetical. */
export async function getAllArticleTags(): Promise<string[]> {
  const posts = await getAllArticles();
  const set = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return [...set].sort((a, b) => a.localeCompare(b, "fr"));
}

/** Articles carrying a given tag, newest first. */
export async function getArticlesByTag(tag: string): Promise<Article[]> {
  const posts = await getAllArticles();
  return posts.filter((p) => p.tags.includes(tag));
}

/** Look up a small set of related articles by slug (for internal linking). */
export async function getRelatedArticles(slugs: string[]): Promise<Article[]> {
  if (!slugs.length) return [];
  const all = await getAllArticles();
  return slugs
    .map((s) => all.find((a) => a.slug === s))
    .filter((a): a is Article => Boolean(a));
}
