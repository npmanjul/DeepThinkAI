"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  Eye,
  Globe,
  Lock,
  MoreVertical,
  Settings,
  Share2,
  Trash2,
} from "lucide-react";
import { BlogAPI } from "@/src/services/api";
import { LoadingState } from "@/src/components/blog/LoadingState";
import { NotFoundState } from "@/src/components/blog/NotFoundState";
import { markdownComponents } from "@/src/components/blog/MarkdownComponents";
import toast from "react-hot-toast";
import DeleteModal from "@/src/components/common/DeleteModal";

type BlogArticle = {
  id: string;
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

const BlogPage = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [article, setArticle] = useState<BlogArticle | null | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [readingTime, setReadingTime] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const handlePublishToggle = async () => {
    if (!article) return;

    try {
      setIsPublishing(true);
      const resp = await BlogAPI.updatePublishedStatus({
        blog_slug: slug,
        published: !article.is_published,
      });

      if (resp.status) {
        setArticle({
          ...article,
          is_published: !article.is_published,
        });
      }
    } catch (error) {
      console.error("Error toggling publish status:", error);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/read/${slug}`;
    navigator.clipboard.writeText(url);
    // Optional: Show toast notification
    alert("Link copied to clipboard!");
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!article) {
    return <NotFoundState />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Fixed Header with Admin Controls */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left Side - Logo & Back */}
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 font-bold text-slate-950 transition-all hover:text-indigo-600"
              >
                <span className="text-xl">DeepThinkAI</span>
              </Link>

              <div className="hidden h-6 w-px bg-slate-200 sm:block" />

              <Link
                href="/blog"
                className="group hidden items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-950 sm:flex"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span>Back to Studio</span>
              </Link>
            </div>

            {/* Right Side - Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Status Badge */}
              <div
                className={`hidden items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium sm:flex ${
                  article.is_published
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                    : "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20"
                }`}
              >
                {article.is_published ? (
                  <>
                    <Globe className="h-4 w-4" />
                    <span>Published</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    <span>
                      {article.status == "completed" ? "Completed" : "Failed"}
                    </span>
                  </>
                )}
              </div>

              {/* Publish/Unpublish Button */}
              <button
                onClick={handlePublishToggle}
                disabled={isPublishing}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 ${
                  article.is_published
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {isPublishing ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>
                      {article.is_published
                        ? "Unpublishing..."
                        : "Publishing..."}
                    </span>
                  </>
                ) : (
                  <>
                    {article.is_published ? (
                      <>
                        <Lock className="h-4 w-4" />
                        <span>Unpublish</span>
                      </>
                    ) : (
                      <>
                        <Globe className="h-4 w-4" />
                        <span>Publish</span>
                      </>
                    )}
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  setShowDeleteModal(true);
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors bg-red-500"
              >
                <Trash2 className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        {/* Admin Info Bar */}
        <div className="mb-8 rounded-xl border border-indigo-200 bg-indigo-50 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-indigo-100 p-2">
              <Settings className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 font-semibold text-indigo-900">
                Admin Preview Mode
              </h3>
              <p className="text-sm text-indigo-700">
                You're viewing this article in admin mode. You can publish,
                edit, or manage settings from the controls above.
              </p>
            </div>
          </div>
        </div>

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
          <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-4xl prose-h1:text-slate-950 prose-h2:text-3xl prose-h2:text-slate-950 prose-h3:text-2xl prose-h3:text-slate-900 prose-h4:text-xl prose-h4:text-slate-900 prose-p:leading-relaxed prose-p:text-slate-700 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:text-indigo-700 prose-blockquote:border-l-indigo-500 prose-blockquote:bg-indigo-50/50 prose-blockquote:text-slate-700 prose-strong:font-semibold prose-strong:text-slate-950 prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-slate-900 prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-slate-950 prose-pre:shadow-2xl prose-img:rounded-2xl prose-img:shadow-xl">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents as any}
            >
              {renderedContent}
            </ReactMarkdown>
          </div>
        </article>
      </main>
      <DeleteModal
        slug={slug}
        title={article.title}
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        router={router}
      />
    </div>
  );
};

export default BlogPage;
