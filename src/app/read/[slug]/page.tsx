"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Calendar, Clock, Edit, Eye } from "lucide-react";
import { BlogAPI } from "@/src/services/api";
import { LoadingState } from "@/src/components/blog/LoadingState";
import { NotFoundState } from "@/src/components/blog/NotFoundState";
import { markdownComponents } from "@/src/components/blog/MarkdownComponents";

type BlogArticle = {
  title: string;
  content: string;
  created_at: string;
  is_published: boolean;
  status: string;
};

function stripLeadingTitleHeading(content: string, title: string) {
  const trimmedContent = content.trimStart();
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const headingPattern = new RegExp(`^#\\s+${escapedTitle}\\s*(?:\\n+|$)`, "i");

  return trimmedContent.replace(headingPattern, "");
}

const BlogReadPage = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const [article, setArticle] = useState<BlogArticle | null | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [readingTime, setReadingTime] = useState(0);
  const renderedContent = article
    ? stripLeadingTitleHeading(article.content, article.title)
    : "";

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) {
        setArticle(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const resp = await BlogAPI.readBlog(slug);
        console.log("API response for blog read:", resp.data);
        if (resp.data) {
          setArticle(resp.data);
          // Calculate reading time (average 200 words per minute)
          const wordCount = resp.data.content.split(/\s+/).length;
          setReadingTime(Math.ceil(wordCount / 200));
        } else {
          setArticle(null);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        setArticle(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!article) {
    return <NotFoundState />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Fixed Header */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 font-bold text-slate-950 transition-all hover:text-indigo-600"
              >
                <span className="text-xl">DeepThinkAI</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/blog"
                className="flex items-center gap-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-indigo-700 active:scale-95"
              >
                Write Blog
                <Edit className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        {/* Article Header */}
        <div className="mb-16">
          {/* Meta Info */}
          <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={article.created_at}>
                {new Date(article.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <span className="h-1 w-1 rounded-full bg-slate-300" />

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>

            <span className="h-1 w-1 rounded-full bg-slate-300" />

            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span className="capitalize">{article.status}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            {article.title}
          </h1>

          {/* Divider */}
          <div className="h-1 w-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
        </div>

        {/* Article Content */}
        <article className="relative">
          {/* Content Container */}
          <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-4xl prose-h1:text-slate-950 prose-h2:text-3xl prose-h2:text-slate-950 prose-h3:text-2xl prose-h3:text-slate-900 prose-h4:text-xl prose-h4:text-slate-900 prose-p:leading-relaxed prose-p:text-slate-700 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:text-indigo-700 prose-blockquote:border-l-indigo-500 prose-blockquote:bg-indigo-50/50 prose-blockquote:text-slate-700 prose-strong:font-semibold prose-strong:text-slate-950 prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-slate-900 prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-slate-950 prose-pre:shadow-2xl prose-img:rounded-2xl prose-img:shadow-xl">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents as any}
            >
              {renderedContent}
            </ReactMarkdown>
          </div>
        </article>

        {/* Footer CTA */}
        <div className="mt-20 rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 text-center shadow-sm">
          <h3 className="mb-2 text-2xl font-bold text-slate-950">
            Enjoyed this article?
          </h3>
          <p className="mb-6 text-slate-600">
            Discover more insights and stories in our blog collection.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3 font-medium text-white transition-all hover:bg-slate-800"
          >
            Explore More Articles
          </Link>
        </div>
      </main>
    </div>
  );
};

export default BlogReadPage;
