"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  X,
  History,
  Calendar,
  Trash2,
  User,
  LogOut,
  Zap,
  FileText,
  Activity,
  Eye,
  EyeOff,
  ExternalLink,
  Sparkles,
  Clock,
} from "lucide-react";
import { RunHistory } from "@/src/types/blog.types";
import { AuthAPI, BlogAPI } from "@/src/services/api";
import toast from "react-hot-toast";
import DeleteModal from "@/src/components/common/DeleteModal";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const headerMenuRef = useRef<HTMLDivElement>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);

  const [history, setHistory] = useState<RunHistory[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [publishingBlogs, setPublishingBlogs] = useState<Set<string>>(
    new Set(),
  );

  // Function to fetch history
  const fetchHistory = async () => {
    try {
      setHistoryLoading(true);
      const res = await BlogAPI.getBlogHistory();
      console.log("Fetched history:", res.data);
      if (res.data && Array.isArray(res.data)) {
        setHistory(res.data as any);
      }
    } catch (error) {
      console.error("Failed to fetch blog history:", error);
    } finally {
      setHistoryLoading(false);
    }
  };

  // Fetch history on mount
  useEffect(() => {
    fetchHistory();
  }, [pathname]);

  useEffect(() => {
    if (sidebarOpen) {
      fetchHistory();
    }
  }, [sidebarOpen]);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerMenuRef.current &&
        !headerMenuRef.current.contains(event.target as Node)
      ) {
        setHeaderMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setHeaderMenuOpen(false);
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const togglePublishStatus = async (blog: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setPublishingBlogs((prev) => new Set([...prev, blog.id]));
      await BlogAPI.updatePublishedStatus({
        blog_slug: blog.slug,
        published: !blog.is_published,
      });

      // Update local state
      setHistory((prev) =>
        prev.map((h: any) =>
          h.id === blog.id ? { ...h, is_published: !h.is_published } : h,
        ),
      );

      toast.success(
        `Blog is ${!blog.is_published ? "Published" : "Unpublished"} Now !`,
      );
    } catch (error) {
      console.error("Failed to update publish status:", error);
    } finally {
      setPublishingBlogs((prev) => {
        const newSet = new Set(prev);
        newSet.delete(blog.id);
        return newSet;
      });
    }
  };

  const handleLogout = async () => {
    try {
      await AuthAPI.logout();
    } catch {
      // fall through
    } finally {
      setHeaderMenuOpen(false);
      localStorage.removeItem("access_token");
      router.push("/login");
    }
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  return (
    <div className="min-h-dvh flex bg-gradient-to-br from-zinc-950 via-black to-zinc-950 font-sans text-zinc-100 antialiased selection:bg-violet-500/30 selection:text-white">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:sticky top-0 left-0 z-50 h-dvh w-80 border-r border-white/[0.06] bg-gradient-to-b from-zinc-950/98 via-black/98 to-zinc-950/98
        backdrop-blur-2xl transform transition-all duration-300 ease-out shadow-[4px_0_64px_-16px_rgba(139,92,246,0.2)]
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Sidebar Header */}
        <div className="border-b border-white/[0.06] px-5 py-5 lg:py-6 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent">
          {/* Desktop Branding */}
          <div className="hidden lg:mb-6 lg:flex lg:items-center lg:gap-3.5 lg:rounded-2xl lg:bg-gradient-to-r lg:from-violet-500/10 lg:via-purple-500/10 lg:to-indigo-500/10 lg:p-4 lg:ring-1 lg:ring-violet-400/20 lg:shadow-lg lg:shadow-violet-500/10">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 flex-shrink-0 shadow-lg shadow-violet-500/30">
              <Sparkles className="h-5 w-5 text-white" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-white/20 to-transparent" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight bg-gradient-to-r from-white via-violet-100 to-white bg-clip-text text-transparent">
                DeepThinkAI
              </h1>
              <p className="text-xs text-zinc-400 font-medium">
                AI Blog Studio
              </p>
            </div>
          </div>

          {/* History Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-violet-500/10 ring-1 ring-violet-400/20">
                <History className="h-4 w-4 text-violet-400" />
              </div>
              <h2 className="text-sm font-bold tracking-tight text-white">
                Recent Blogs
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-2 text-zinc-500 transition-all hover:bg-white/[0.08] hover:text-zinc-200 active:scale-95 lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* History List */}
        <div className="h-[calc(100vh-65px)] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800 hover:scrollbar-thumb-zinc-700 lg:h-[calc(100vh-165px)]">
          {historyLoading ? (
            <div className="flex flex-col items-center justify-center p-8 text-center h-full">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500/15 via-purple-500/15 to-indigo-500/15 ring-1 ring-violet-400/20 shadow-2xl shadow-violet-500/20">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-violet-400 border-r-purple-400 animate-spin" />
                  <div
                    className="absolute inset-2 rounded-full border-[3px] border-transparent border-b-indigo-400 border-l-purple-400 animate-spin"
                    style={{
                      animationDirection: "reverse",
                      animationDuration: "1.5s",
                    }}
                  />
                </div>
              </div>
              <p className="text-base font-bold text-zinc-200 mb-2">
                Loading history...
              </p>
              <p className="text-xs text-zinc-500">
                Fetching your amazing blogs
              </p>
            </div>
          ) : history.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center h-full">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-indigo-500/10 ring-1 ring-violet-400/20">
                <FileText className="h-8 w-8 text-violet-400/60" />
              </div>
              <p className="text-base font-semibold text-zinc-300 mb-2">
                No history yet
              </p>
              <p className="text-sm text-zinc-500 max-w-[200px]">
                Create your first AI-powered blog to get started
              </p>
            </div>
          ) : (
            <div className="space-y-3 p-4">
              {history.map((blog: any) => (
                <div
                  key={blog.slug}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-zinc-900/50 via-black/50 to-zinc-950/50 backdrop-blur-sm transition-all duration-300 hover:border-violet-500/30 hover:shadow-[0_8px_32px_rgba(139,92,246,0.12)] "
                >
                  <div className="relative flex flex-col gap-3.5 p-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={
                          blog.is_published
                            ? `/read/${blog.slug}`
                            : `/private-blog/${blog.slug}`
                        }
                        onClick={() => setSidebarOpen(false)}
                        className="flex-1 min-w-0 group/link"
                      >
                        <div className="space-y-2">
                          {/* Title */}
                          <h3 className="line-clamp-2 text-sm font-semibold text-white transition-colors group-hover/link:text-violet-300 leading-snug">
                            {blog.title}
                          </h3>

                          {/* Meta Info */}
                          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                            <div className="flex items-center gap-1.5 bg-white/[0.03] px-2 py-1 rounded-lg ring-1 ring-white/[0.05]">
                              <Clock className="h-3 w-3 text-violet-400" />
                              <span>{formatDate(blog.created_at)}</span>
                            </div>

                            {(blog.topic ||
                              blog.tag ||
                              (blog.tags && blog.tags[0])) && (
                              <span className="rounded-lg bg-gradient-to-r from-violet-500/10 to-purple-500/10 px-2.5 py-1 text-[10px] font-semibold text-violet-300 ring-1 ring-violet-400/20 truncate">
                                {blog.topic ||
                                  blog.tag ||
                                  (blog.tags && blog.tags[0])}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>

                      {/* Status Badge */}
                      <div className="flex-shrink-0">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ring-1 whitespace-nowrap shadow-lg ${
                            blog.status === "completed"
                              ? "bg-emerald-500/15 text-emerald-300 ring-emerald-500/25 shadow-emerald-500/20"
                              : blog.status === "error"
                                ? "bg-red-500/15 text-red-300 ring-red-500/25 shadow-red-500/20"
                                : "bg-amber-500/15 text-amber-300 ring-amber-500/25 shadow-amber-500/20"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full flex-shrink-0 shadow-lg ${
                              blog.status === "completed"
                                ? "bg-emerald-400 shadow-emerald-400/50 animate-pulse"
                                : blog.status === "error"
                                  ? "bg-red-400 shadow-red-400/50"
                                  : "bg-amber-400 shadow-amber-400/50 animate-pulse"
                            }`}
                          />
                          {blog.status}
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

                    {/* Footer */}
                    <div className="flex items-center justify-between gap-3">
                      {/* Publish Status */}
                      <div className="flex-shrink-0">
                        {blog.is_published ? (
                          <span className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500/15 to-green-500/15 px-2.5 py-1.5 text-[10px] font-bold text-emerald-300 ring-1 ring-emerald-500/30 shadow-lg shadow-emerald-500/10">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50 animate-pulse" />
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-500/10 px-2.5 py-1.5 text-[10px] font-bold text-zinc-400 ring-1 ring-white/[0.10]">
                            <div className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
                            Unpublished
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-1.5">
                        {/* Open Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const href = blog.is_published
                              ? `/read/${blog.slug}`
                              : `/private-blog/${blog.slug}`;
                            window.open(
                              window.location.origin + href,
                              "_blank",
                            );
                          }}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.10] bg-white/[0.03] hover:bg-white/[0.10] px-2.5 py-2 text-[11px] font-semibold text-zinc-300 hover:text-white transition-all duration-200 active:scale-95 hover:border-violet-400/30"
                          title="Open blog"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </button>

                        {/* Publish Toggle */}
                        <button
                          type="button"
                          onClick={(e) => togglePublishStatus(blog, e)}
                          disabled={publishingBlogs.has(blog.id)}
                          className={`inline-flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-[11px] font-bold transition-all duration-200 ring-1 active:scale-95 ${
                            blog.is_published
                              ? "bg-blue-500/15 text-blue-300 ring-blue-500/30 hover:bg-blue-500/25 hover:ring-blue-400/40"
                              : "bg-violet-500/15 text-violet-300 ring-violet-500/30 hover:bg-violet-500/25 hover:ring-violet-400/40"
                          } disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100`}
                          title={blog.is_published ? "Unpublish" : "Publish"}
                        >
                          {publishingBlogs.has(blog.id) ? (
                            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          ) : blog.is_published ? (
                            <EyeOff className="h-3.5 w-3.5" />
                          ) : (
                            <Eye className="h-3.5 w-3.5" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            setSelectedBlog(blog);
                            setShowDeleteModal(true);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 px-2.5 py-2 text-[11px] font-bold text-red-300 hover:text-red-200 ring-1 ring-red-500/25 hover:ring-red-400/40 transition-all duration-200 active:scale-95"
                          title="Delete blog"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col bg-gradient-to-br from-black via-zinc-950 to-black">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-black/90 backdrop-blur-2xl supports-[backdrop-filter]:bg-black/70 shadow-lg shadow-black/20">
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
            {/* Left Section */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl p-2.5 text-zinc-500 transition-all hover:bg-violet-500/10 hover:text-violet-300 active:scale-95 lg:hidden ring-1 ring-white/[0.05] hover:ring-violet-400/30"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 shadow-lg shadow-violet-500/30">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-bold tracking-tight bg-gradient-to-r from-white via-violet-100 to-white bg-clip-text text-transparent">
                    DeepThinkAI
                  </h1>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* User Menu */}
              <div className="relative" ref={headerMenuRef}>
                <button
                  type="button"
                  onClick={() => setHeaderMenuOpen((prev) => !prev)}
                  className="inline-flex items-center gap-2 rounded-xl  text-sm font-semibold text-zinc-100 transition-all hover:border-violet-400/40 hover:bg-white/[0.10] active:scale-95 shadow-lg shadow-black/20 hover:shadow-violet-500/20"
                  aria-haspopup="menu"
                  aria-expanded={headerMenuOpen}
                >
                  <div className="p-3 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                    <User className="h-4 w-4 text-white" />
                  </div>
                </button>

                {headerMenuOpen && (
                  <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-52 overflow-hidden rounded-2xl border border-white/[0.10] bg-zinc-950/98 shadow-[0_24px_80px_-16px_rgba(0,0,0,0.9)] backdrop-blur-2xl ring-1 ring-white/[0.05]">
                    <div className="p-1.5">
                      <Link
                        href="/profile"
                        onClick={() => setHeaderMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-200 transition-all hover:bg-gradient-to-r hover:from-violet-500/10 hover:to-purple-500/10 hover:text-white active:scale-95"
                      >
                        <div className="p-1.5 rounded-lg bg-violet-500/10 ring-1 ring-violet-400/20">
                          <User className="h-4 w-4 text-violet-400" />
                        </div>
                        Profile
                      </Link>
                      <div className="my-1.5 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium text-red-200 transition-all hover:bg-red-500/10 hover:text-red-100 active:scale-95"
                      >
                        <div className="p-1.5 rounded-lg bg-red-500/10 ring-1 ring-red-400/20">
                          <LogOut className="h-4 w-4 text-red-400" />
                        </div>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gradient-to-br from-transparent via-violet-500/[0.01] to-transparent">
          {children}
        </main>
        <DeleteModal
          slug={selectedBlog?.slug || ""}
          title={selectedBlog?.title || ""}
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedBlog(null);
            fetchHistory();
          }}
          router={router}
        />
      </div>
    </div>
  );
};

export default BlogLayout;
