import React from "react";

export const markdownComponents = {
  // Headings with anchors
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="group relative mb-8 mt-12 scroll-mt-24 text-5xl font-bold tracking-tight text-slate-950 first:mt-0">
      {children}
    </h1>
  ),

  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="group relative mb-6 mt-16 scroll-mt-24 border-b border-slate-200 pb-4 text-4xl font-bold tracking-tight text-slate-950">
      {children}
      <div className="absolute bottom-0 left-0 h-0.5 w-16 bg-gradient-to-r from-indigo-500 to-purple-500" />
    </h2>
  ),

  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="mb-4 mt-12 scroll-mt-24 text-3xl font-bold text-slate-900">
      {children}
    </h3>
  ),

  h4: ({ children }: { children?: React.ReactNode }) => (
    <h4 className="mb-3 mt-8 scroll-mt-24 text-2xl font-semibold text-slate-900">
      {children}
    </h4>
  ),

  h5: ({ children }: { children?: React.ReactNode }) => (
    <h5 className="mb-2 mt-6 scroll-mt-24 text-xl font-semibold text-slate-900">
      {children}
    </h5>
  ),

  h6: ({ children }: { children?: React.ReactNode }) => (
    <h6 className="mb-2 mt-4 scroll-mt-24 text-lg font-semibold text-slate-900">
      {children}
    </h6>
  ),

  // Paragraphs
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="mb-6 text-lg leading-relaxed text-slate-700">{children}</p>
  ),

  // Lists
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="mb-8 list-disc space-y-3 pl-6 marker:text-indigo-500">
      {children}
    </ul>
  ),

  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="mb-8 list-decimal space-y-3 pl-6 marker:text-indigo-500">
      {children}
    </ol>
  ),

  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="relative pl-2 text-lg leading-relaxed text-slate-700">
      {children}
    </li>
  ),

  // Blockquotes
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="my-8 rounded-r-xl border-l-4 border-indigo-500 bg-gradient-to-r from-indigo-50/50 to-transparent py-4 pl-6 pr-4">
      <div className="text-lg italic leading-relaxed text-slate-700">
        {children}
      </div>
    </blockquote>
  ),

  // Horizontal Rule
  hr: () => <hr className="my-12 border-t-2 border-slate-200" />,

  // Links
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="font-medium text-indigo-600 underline decoration-indigo-300 decoration-2 underline-offset-4 transition-all hover:text-indigo-700 hover:decoration-indigo-500"
    >
      {children}
    </a>
  ),
  code: ({
    className,
    children,
    ...props
  }: {
    className?: string;
    children?: React.ReactNode;
  }) => {
    const match = /language-(\w+)/.exec(className || "");
    const language = match?.[1];

    // INLINE CODE => `code`
    if (!className) {
      return (
        <code
          className="mx-1 rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-pink-600"
          {...props}
        >
          {children}
        </code>
      );
    }

    // BLOCK CODE => ```code```
    return (
      <div className="relative overflow-hidden rounded-xl">
        {/* Language Badge */}
        {language && (
          <div className="absolute right-1 top-1 z-10">
            <span className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-400">
              {language}
            </span>
          </div>
        )}

        <pre className="overflow-x-auto p-1">
          <code
            className={`${className} block font-mono text-sm leading-relaxed text-slate-100`}
            {...props}
          >
            {children}
          </code>
        </pre>
      </div>
    );
  },

  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="my-8 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
      {children}
    </pre>
  ),

  // Tables
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="my-10 overflow-hidden rounded-xl border border-slate-200 shadow-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          {children}
        </table>
      </div>
    </div>
  ),

  thead: ({ children }: { children?: React.ReactNode }) => (
    <thead className="bg-slate-50">{children}</thead>
  ),

  tbody: ({ children }: { children?: React.ReactNode }) => (
    <tbody className="divide-y divide-slate-200 bg-white">{children}</tbody>
  ),

  tr: ({ children }: { children?: React.ReactNode }) => (
    <tr className="transition-colors hover:bg-slate-50">{children}</tr>
  ),

  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
      {children}
    </th>
  ),

  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="px-6 py-4 text-sm text-slate-700">{children}</td>
  ),

  // Images
  img: (props: any) => {
    const { src, alt, title, ...rest } = props;
    return (
      <figure className="my-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || ""}
          title={title}
          className="w-full rounded-2xl border border-slate-200 shadow-2xl transition-transform hover:scale-[1.02]"
          {...rest}
        />
        {alt && (
          <figcaption className="mt-4 text-center text-sm italic text-slate-500">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  },

  // Text Formatting
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-bold text-slate-950">{children}</strong>
  ),

  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="italic text-slate-700">{children}</em>
  ),

  del: ({ children }: { children?: React.ReactNode }) => (
    <del className="text-slate-500 line-through">{children}</del>
  ),

  // Superscript
  sup: ({ children }: { children?: React.ReactNode }) => (
    <sup className="text-xs text-slate-700">{children}</sup>
  ),

  // Subscript
  sub: ({ children }: { children?: React.ReactNode }) => (
    <sub className="text-xs text-slate-700">{children}</sub>
  ),

  // Mark/Highlight
  mark: ({ children }: { children?: React.ReactNode }) => (
    <mark className="rounded bg-yellow-200 px-1 py-0.5 text-slate-900">
      {children}
    </mark>
  ),

  // Keyboard Input
  kbd: ({ children }: { children?: React.ReactNode }) => (
    <kbd className="rounded-md border border-slate-300 bg-slate-100 px-2 py-1 font-mono text-sm text-slate-900 shadow-sm">
      {children}
    </kbd>
  ),

  // Abbreviation
  abbr: ({
    children,
    title,
  }: {
    children?: React.ReactNode;
    title?: string;
  }) => (
    <abbr
      title={title}
      className="cursor-help border-b-2 border-dotted border-slate-400 text-slate-900 no-underline"
    >
      {children}
    </abbr>
  ),

  // Definition List
  dl: ({ children }: { children?: React.ReactNode }) => (
    <dl className="my-8 space-y-4">{children}</dl>
  ),

  dt: ({ children }: { children?: React.ReactNode }) => (
    <dt className="font-semibold text-slate-950">{children}</dt>
  ),

  dd: ({ children }: { children?: React.ReactNode }) => (
    <dd className="ml-6 text-slate-700">{children}</dd>
  ),

  // Details/Summary (Collapsible)
  details: ({ children }: { children?: React.ReactNode }) => (
    <details className="my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {children}
    </details>
  ),

  summary: ({ children }: { children?: React.ReactNode }) => (
    <summary className="cursor-pointer font-semibold text-slate-900 hover:text-indigo-600">
      {children}
    </summary>
  ),

  // Task List Items (GitHub Flavored Markdown)
  input: (props: any) => {
    if (props.type === "checkbox") {
      return (
        <input
          type="checkbox"
          disabled={props.disabled}
          checked={props.checked}
          className="mr-2 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          {...props}
        />
      );
    }
    return <input {...props} />;
  },

  // Footnote Reference (if using remark-footnotes)
  footnoteReference: ({ children }: { children?: React.ReactNode }) => (
    <sup className="ml-0.5">
      <a
        href="#"
        className="text-indigo-600 hover:text-indigo-700 hover:underline"
      >
        [{children}]
      </a>
    </sup>
  ),

  // Footnote Definition
  footnoteDefinition: ({ children }: { children?: React.ReactNode }) => (
    <div className="mt-8 border-t border-slate-200 pt-8 text-sm text-slate-600">
      {children}
    </div>
  ),

  // Thematic Break (alternative to hr)
  thematicBreak: () => (
    <div className="my-12 flex items-center justify-center">
      <div className="flex gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-slate-400"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-slate-400"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-slate-400"></div>
      </div>
    </div>
  ),

  // Section
  section: ({ children }: { children?: React.ReactNode }) => (
    <section className="my-8">{children}</section>
  ),

  // Article
  article: ({ children }: { children?: React.ReactNode }) => (
    <article className="my-8">{children}</article>
  ),

  // Aside
  aside: ({ children }: { children?: React.ReactNode }) => (
    <aside className="my-8 rounded-xl border-l-4 border-purple-500 bg-purple-50 p-6">
      <div className="text-sm text-slate-700">{children}</div>
    </aside>
  ),

  // Divider with custom styling
  div: ({
    children,
    className,
  }: {
    children?: React.ReactNode;
    className?: string;
  }) => {
    // Check if it's a special div (like for alerts or callouts)
    if (className?.includes("callout")) {
      return (
        <div className="my-6 rounded-xl border-l-4 border-blue-500 bg-blue-50 p-6">
          <div className="text-slate-700">{children}</div>
        </div>
      );
    }
    return <div className={className}>{children}</div>;
  },

  // Span for inline styling
  span: ({
    children,
    className,
  }: {
    children?: React.ReactNode;
    className?: string;
  }) => <span className={className}>{children}</span>,
};
