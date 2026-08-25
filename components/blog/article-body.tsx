import * as React from "react";
import Link from "next/link";
import { RichText } from "./rich-text";
import { tagToSlug, type Article } from "@/lib/blog";

/**
 * Renders lightweight inline markup used in seed posts:
 *   [texte](/blog/slug) → internal link · **gras** → bold
 */
function renderInline(text: string, keyBase: string): React.ReactNode[] {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let i = 0;
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1] && m[2]) {
      nodes.push(
        <Link
          key={`${keyBase}-${i}`}
          href={m[2]}
          className="text-purple-60 underline underline-offset-4 hover:text-purple-90 transition-colors duration-200 ease-soft"
        >
          {m[1]}
        </Link>
      );
    } else if (m[3]) {
      nodes.push(
        <strong key={`${keyBase}-${i}`} className="font-semibold text-neutral-90">
          {m[3]}
        </strong>
      );
    }
    last = m.index + m[0].length;
    i++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function ArticleBody({ article }: { article: Article }) {
  // Contentful posts render their Rich Text document.
  if (article.source === "contentful") {
    return <RichText document={article.richText ?? null} />;
  }

  // Seed posts render intro + sections (each with its illustration).
  return (
    <div>
      {article.intro ? (
        <p className="text-lead text-neutral-80 leading-relaxed">
          {renderInline(article.intro, "intro")}
        </p>
      ) : null}

      {article.sections?.map((s, idx) => (
        <section key={idx} className="mt-12 first:mt-10">
          <h2
            id={tagToSlug(s.heading)}
            className="scroll-mt-24 font-display text-h4 tracking-tight text-neutral-90"
          >
            {s.heading}
          </h2>
          {s.body.map((para, j) => (
            <p key={j} className="mt-4 text-body text-neutral-80 leading-relaxed">
              {renderInline(para, `${idx}-${j}`)}
            </p>
          ))}
          {s.imageUrl ? (
            <figure className="mt-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.imageUrl}
                alt={s.imageAlt}
                loading="lazy"
                className="w-full rounded-lg border border-neutral-20"
              />
            </figure>
          ) : null}
        </section>
      ))}
    </div>
  );
}
