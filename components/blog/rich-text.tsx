import * as React from "react";
import {
  documentToReactComponents,
  type Options,
} from "@contentful/rich-text-react-renderer";
import {
  BLOCKS,
  INLINES,
  MARKS,
  type Document,
} from "@contentful/rich-text-types";

/**
 * RichText — renders a Contentful Rich Text document using the site's own
 * design tokens (rather than a generic prose plugin), so articles read like
 * the rest of Virtus Lever. Embedded assets render as plain <img> so the
 * static export needs no image config.
 */
const options: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong className="font-semibold text-neutral-90">{text}</strong>,
    [MARKS.ITALIC]: (text) => <em className="italic">{text}</em>,
    [MARKS.UNDERLINE]: (text) => <span className="underline underline-offset-4">{text}</span>,
    [MARKS.CODE]: (text) => (
      <code className="rounded-sm bg-neutral-10 border border-neutral-20 px-1.5 py-0.5 text-[0.9em] font-mono text-neutral-90">
        {text}
      </code>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children) => (
      <p className="text-body text-neutral-80 leading-relaxed my-5">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (_node, children) => (
      <h2 className="font-display text-h3 tracking-tight text-neutral-90 mt-12 mb-4">{children}</h2>
    ),
    [BLOCKS.HEADING_2]: (_node, children) => (
      <h2 className="font-display text-h4 tracking-tight text-neutral-90 mt-12 mb-4">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node, children) => (
      <h3 className="font-display text-h5 tracking-tight text-neutral-90 mt-10 mb-3">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (_node, children) => (
      <h4 className="font-display text-h6 tracking-tight text-neutral-90 mt-8 mb-3">{children}</h4>
    ),
    [BLOCKS.UL_LIST]: (_node, children) => (
      <ul className="my-5 space-y-2 pl-1">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node, children) => (
      <ol className="my-5 space-y-2 pl-5 list-decimal marker:text-neutral-60">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node, children) => (
      <li className="text-body text-neutral-80 [&>p]:my-0 pl-4 relative before:absolute before:left-0 before:top-[0.7em] before:size-1.5 before:rounded-full before:bg-neutral-30 marker:before:hidden">
        {children}
      </li>
    ),
    [BLOCKS.QUOTE]: (_node, children) => (
      <blockquote className="my-8 border-l-2 border-purple-60 pl-5 text-h6 font-display tracking-tight text-neutral-90 [&>p]:my-0">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-10 border-neutral-20" />,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const file = node.data?.target?.fields?.file;
      const title = node.data?.target?.fields?.title ?? "";
      const url = typeof file?.url === "string" ? file.url : null;
      if (!url) return null;
      const src = url.startsWith("//") ? `https:${url}` : url;
      return (
        <figure className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={title}
            loading="lazy"
            className="w-full rounded-lg border border-neutral-20"
          />
          {title ? (
            <figcaption className="mt-2 text-small text-neutral-60">{title}</figcaption>
          ) : null}
        </figure>
      );
    },
    [INLINES.HYPERLINK]: (node, children) => {
      const uri = String(node.data?.uri ?? "#");
      const external = /^https?:\/\//.test(uri);
      return (
        <a
          href={uri}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="text-purple-60 underline underline-offset-4 hover:text-purple-90 transition-colors duration-200 ease-soft"
        >
          {children}
        </a>
      );
    },
  },
};

export function RichText({ document }: { document: Document | null }) {
  if (!document) return null;
  return <>{documentToReactComponents(document, options)}</>;
}
