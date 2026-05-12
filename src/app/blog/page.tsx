"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import Link from "next/link";
import {
  Search,
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  Terminal,
  RotateCcw,
  WifiOff,
  Loader2,
  ChevronRight,
  ChevronDown,
  FileText,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { LogEvent, RunHistory } from "@/src/types/blog.types";
import ENDPOINTS from "@/src/services/endpoints";
import StatItem from "@/src/components/blog/StatsItem";

const BLOG_ARTICLES_KEY = "blog-articles";

function collapseLangGraphToEnd(events: LogEvent[]): LogEvent[] {
  const rest: LogEvent[] = [];
  let lastLangGraph: LogEvent | null = null;
  for (const e of events) {
    if (e.node_name === "LangGraph") lastLangGraph = e;
    else rest.push(e);
  }
  return lastLangGraph ? [...rest, lastLangGraph] : rest;
}

function extractFinalMarkdown(output: unknown): string | null {
  if (output == null) return null;
  if (typeof output === "object" && "final" in output) {
    const v = (output as { final: unknown }).final;
    if (typeof v === "string") return v;
  }
  if (typeof output === "object" && "output" in output) {
    const inner = (output as { output: unknown }).output;
    if (inner && typeof inner === "object" && "final" in inner) {
      const v = (inner as { final: unknown }).final;
      if (typeof v === "string") return v;
    }
  }
  return null;
}

function persistBlogArticle(
  id: string,
  payload: { topic: string; title: string; markdown: string },
) {
  try {
    const raw = localStorage.getItem(BLOG_ARTICLES_KEY);
    const map = (raw ? JSON.parse(raw) : {}) as Record<string, unknown>;
    map[id] = { ...payload, savedAt: Date.now() };
    localStorage.setItem(BLOG_ARTICLES_KEY, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

const BlogStreamPage = () => {
  const [events, setEvents] = useState<LogEvent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [topic, setTopic] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentRunId, setCurrentRunId] = useState<string | null>(null);
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());
  const [copiedUrl, setCopiedUrl] = useState(false);

  const eventSourceRef = useRef<EventSource | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  const [history, setHistory] = useState<RunHistory[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("langgraph-history");
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved) as RunHistory[];
      return parsed.map((h) => ({ ...h, date: new Date(h.date) }));
    } catch (e) {
      console.error("Failed to load history", e);
      return [];
    }
  });

  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("langgraph-history", JSON.stringify(history));
    }
  }, [history]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [events]);

  const startStream = () => {
    if (!topic.trim() || isStreaming) return;

    const newRunId = Date.now().toString();
    setCurrentRunId(newRunId);
    setEvents([]);
    setExpandedLogs(new Set());

    const newRun: RunHistory = {
      id: newRunId,
      topic: topic,
      date: new Date(),
      events: [],
      status: "running",
    };
    setHistory((prev) => [newRun, ...prev]);

    // Use relative path for SSE (goes through Next.js proxy, sends cookies automatically)
    const sseUrl = `https://api.deepthinkai.anjul.cloud/api/v1${ENDPOINTS.BLOG.STREAM}?topic=${encodeURIComponent(topic)}`;

    const eventSource = new EventSource(sseUrl);
    eventSourceRef.current = eventSource;
    setIsStreaming(true);
    setIsConnected(true);

    eventSource.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        const eventWithId = {
          ...parsedData,
          id: `${parsedData.node_name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        };

        console.log(
          "[SSE Event]",
          eventWithId.node_name,
          eventWithId.status,
          new Date().toLocaleTimeString(),
        );

        if (eventWithId.output != null || eventWithId.status === "error") {
          setExpandedLogs((prev) => new Set(prev).add(eventWithId.id));
        }

        setEvents((prev) => {
          const runningIdx = prev.findIndex(
            (e) =>
              e.node_name === eventWithId.node_name && e.status === "running",
          );

          let newEvents: LogEvent[];
          if (
            runningIdx !== -1 &&
            (eventWithId.status === "completed" ||
              eventWithId.status === "error")
          ) {
            newEvents = [...prev];
            newEvents[runningIdx] = {
              ...eventWithId,
              id: prev[runningIdx].id,
            };
          } else if (
            (eventWithId.status === "completed" ||
              eventWithId.status === "error") &&
            prev.length > 0
          ) {
            const lastSame = prev.findLastIndex(
              (e) => e.node_name === eventWithId.node_name,
            );
            if (lastSame !== -1) {
              newEvents = [...prev];
              newEvents[lastSame] = {
                ...eventWithId,
                id: prev[lastSame].id,
              };
            } else {
              newEvents = [...prev, eventWithId];
            }
          } else {
            newEvents = [...prev, eventWithId];
          }

          const md =
            eventWithId.status === "completed" &&
            eventWithId.output !== undefined
              ? extractFinalMarkdown(eventWithId.output)
              : null;

          if (md) {
            persistBlogArticle(newRunId, {
              topic: topic.trim(),
              title: topic.trim(),
              markdown: md,
            });
          }

          const graphDone =
            eventWithId.node_name === "LangGraph" &&
            eventWithId.status === "completed";
          const runFailed = eventWithId.status === "error";

          const readPath = origin ? `${origin}/blog/read/${newRunId}` : "";

          setHistory((hist) =>
            hist.map((h) => {
              if (h.id !== newRunId) return h;
              const nextContent = md ?? h.articleContent;
              const nextUrl = nextContent && readPath ? readPath : h.articleUrl;
              let nextStatus = h.status;
              if (runFailed) nextStatus = "error";
              else if (graphDone) nextStatus = "completed";
              return {
                ...h,
                events: newEvents,
                status: nextStatus,
                articleContent: nextContent,
                articleTitle: topic.trim(),
                articleUrl: nextUrl,
              };
            }),
          );

          return newEvents;
        });
      } catch (e) {
        console.error("Failed to parse event:", e);
      }
    };

    eventSource.onerror = () => {
      setIsConnected(false);
      setIsStreaming(false);
      eventSource.close();

      setHistory((hist) =>
        hist.map((h) =>
          h.id === newRunId
            ? { ...h, status: h.status === "running" ? "error" : h.status }
            : h,
        ),
      );
    };
  };

  const stopStream = () => {
    eventSourceRef.current?.close();
    setIsStreaming(false);
    setIsConnected(false);
  };

  const clearLogs = () => {
    setEvents([]);
    setCurrentRunId(null);
    setExpandedLogs(new Set());
  };

  const toggleLogExpansion = (logId: string) => {
    setExpandedLogs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(logId)) {
        newSet.delete(logId);
      } else {
        newSet.add(logId);
      }
      return newSet;
    });
  };

  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return events;
    const query = searchQuery.toLowerCase();
    return events.filter((event) => {
      const outStr =
        event.output !== undefined
          ? JSON.stringify(event.output).toLowerCase()
          : "";
      return (
        event.node_name.toLowerCase().includes(query) ||
        event.message.toLowerCase().includes(query) ||
        outStr.includes(query)
      );
    });
  }, [events, searchQuery]);

  const displayedLogEvents = useMemo(
    () => collapseLangGraphToEnd(filteredEvents),
    [filteredEvents],
  );

  const stats = useMemo(() => {
    return {
      total: events.length,
      running: events.filter((e) => e.status === "running").length,
      completed: events.filter((e) => e.status === "completed").length,
      errors: events.filter((e) => e.status === "error").length,
    };
  }, [events]);

  const currentRun = history.find((h) => h.id === currentRunId);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "running":
        return {
          icon: Loader2,
          color: "text-amber-400",
          bg: "bg-amber-400/10",
          border: "border-amber-400/20",
          glow: "shadow-[0_0_12px_-4px_rgba(251,191,36,0.4)]",
        };
      case "completed":
        return {
          icon: CheckCircle2,
          color: "text-emerald-400",
          bg: "bg-emerald-400/10",
          border: "border-emerald-400/20",
          glow: "shadow-[0_0_12px_-4px_rgba(52,211,153,0.4)]",
        };
      case "error":
        return {
          icon: XCircle,
          color: "text-red-400",
          bg: "bg-red-400/10",
          border: "border-red-400/20",
          glow: "shadow-[0_0_12px_-4px_rgba(248,113,113,0.4)]",
        };
      default:
        return {
          icon: Terminal,
          color: "text-zinc-400",
          bg: "bg-zinc-400/10",
          border: "border-zinc-400/20",
          glow: "",
        };
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return null;
    if (seconds < 0.001) return "<1ms";
    if (seconds < 1) return `${(seconds * 1000).toFixed(0)}ms`;
    return `${seconds.toFixed(2)}s`;
  };

  const shareUrl = useMemo(() => {
    if (!currentRun?.id || !currentRun.articleContent) return "";
    if (currentRun.articleUrl) return currentRun.articleUrl;
    if (origin) return `${origin}/blog/read/${currentRun.id}`;
    return "";
  }, [currentRun, origin]);

  const copyShareUrl = async () => {
    const url =
      shareUrl ||
      (origin && currentRun?.id ? `${origin}/blog/read/${currentRun.id}` : "");
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(true);
      window.setTimeout(() => setCopiedUrl(false), 2000);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    const r = currentRun;
    if (
      !r?.id ||
      typeof r.articleContent !== "string" ||
      !r.articleContent.trim()
    ) {
      return;
    }
    persistBlogArticle(r.id, {
      topic: r.topic,
      title: (r.articleTitle || r.topic).trim(),
      markdown: r.articleContent,
    });
  }, [currentRun]);

  return (
    <div className="flex flex-col h-full">
      {/* Topic Input Section */}
      <div className="border-b border-white/[0.06] bg-zinc-950/40 backdrop-blur-sm">
        <div className="px-4 py-4 sm:px-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="group relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-violet-400" />
              <input
                type="text"
                placeholder="Enter topic to analyze..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && startStream()}
                disabled={isStreaming}
                className="w-full rounded-xl border border-white/[0.08] bg-zinc-950/80 py-2.5 pl-10 pr-4 text-sm text-zinc-100 shadow-inner shadow-black/40 placeholder:text-zinc-600
                         transition-all focus:border-violet-500/40 focus:outline-none focus:ring-2 focus:ring-violet-500/20
                         disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <button
              type="button"
              onClick={isStreaming ? stopStream : startStream}
              disabled={!topic.trim() && !isStreaming}
              className={`flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-medium shadow-lg transition-all duration-200
                ${
                  isStreaming
                    ? "border border-red-500/25 bg-red-500/10 text-red-300 hover:bg-red-500/15"
                    : "border border-violet-400/30 bg-violet-600 text-white shadow-violet-600/25 hover:bg-violet-500"
                } disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none`}
            >
              {isStreaming ? (
                <>
                  <WifiOff className="w-4 h-4" />
                  <span className="hidden sm:inline">Stop</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span className="hidden sm:inline">Start</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      {events.length > 0 && (
        <div className="border-b border-white/[0.06] bg-black/40">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-5">
            <div className="flex gap-4 text-xs sm:gap-6">
              <StatItem label="Total" value={stats.total} color="slate" />
              <StatItem label="Active" value={stats.running} color="amber" />
              <StatItem label="Done" value={stats.completed} color="emerald" />
              <StatItem label="Errors" value={stats.errors} color="red" />
            </div>

            <div className="relative w-full sm:w-auto">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-zinc-600" />
              <input
                type="text"
                placeholder="Filter logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-white/[0.08] bg-zinc-950/70 py-1.5 pl-7 pr-3 text-xs text-zinc-200 placeholder:text-zinc-600
                       focus:border-violet-500/40 focus:outline-none focus:ring-1 focus:ring-violet-500/25 sm:w-40"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-4 sm:p-5">
        {filteredEvents.length === 0 && !isStreaming ? (
          <div className="flex h-full flex-col items-center justify-center text-zinc-600">
            <div
              className={`mb-4 rounded-2xl border border-white/[0.08] bg-zinc-950/60 p-5 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.9)] ${isStreaming ? "animate-pulse" : ""}`}
            >
              {isStreaming ? (
                <Loader2 className="h-6 w-6 animate-spin text-violet-400" />
              ) : (
                <Terminal className="h-6 w-6 text-zinc-600" />
              )}
            </div>
            <p className="px-4 text-center text-sm font-medium text-zinc-500">
              {isStreaming
                ? "Initializing stream..."
                : topic
                  ? "Ready to execute"
                  : "Enter a topic to begin"}
            </p>
          </div>
        ) : isStreaming && events.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-zinc-600">
            <div className="mb-4 rounded-2xl border border-white/[0.08] bg-zinc-950/60 p-5 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.9)] animate-pulse">
              <Loader2 className="h-6 w-6 animate-spin text-violet-400" />
            </div>
            <p className="px-4 text-center text-sm font-medium text-zinc-500">
              Waiting for first event...
            </p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-zinc-500">
            No matching logs found
          </div>
        ) : (
          <div className="flex min-h-0 flex-col gap-4">
            {/* Log Box */}
            <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/35 shadow-[0_32px_120px_-48px_rgba(0,0,0,0.85)] backdrop-blur-md">
              {/* Log Header */}
              <div className="flex flex-shrink-0 items-center justify-between border-b border-white/[0.06] bg-black/30 px-4 py-2.5">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                  <Terminal className="h-3.5 w-3.5 text-violet-400/90" />
                  <span className="text-zinc-300">Execution log</span>
                  {currentRun?.topic && (
                    <span className="max-w-[200px] truncate text-zinc-600 sm:max-w-md">
                      · {currentRun.topic}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-mono text-[10px] text-zinc-600">
                    {displayedLogEvents.length} events
                  </div>
                  <button
                    type="button"
                    onClick={clearLogs}
                    disabled={events.length === 0}
                    className="rounded-lg p-1.5 text-zinc-500 transition hover:bg-white/[0.06] hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-30"
                    title="Clear logs"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Log Entries */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800"
              >
                <div className="divide-y divide-white/[0.05]">
                  {displayedLogEvents.map((event, index) => {
                    const config = getStatusConfig(event.status);
                    const Icon = config.icon;
                    const duration = formatDuration(event.duration);
                    const isLatest = index === displayedLogEvents.length - 1;
                    const isExpanded = expandedLogs.has(event.id);
                    const hasDetails =
                      event.output != null ||
                      event.started_at ||
                      event.ended_at ||
                      event.status === "error";

                    return (
                      <div
                        key={event.id}
                        className={`group transition-all duration-300 ${
                          isExpanded
                            ? "bg-white/[0.04]"
                            : "hover:bg-white/[0.02]"
                        } ${isLatest ? "bg-violet-500/[0.04]" : ""}`}
                      >
                        <div
                          onClick={() =>
                            hasDetails && toggleLogExpansion(event.id)
                          }
                          className={`
                              flex items-center gap-3 px-4 py-3 sm:py-2.5 cursor-pointer
                              ${hasDetails ? "cursor-pointer" : "cursor-default"}
                            `}
                        >
                          {/* Expand Icon */}
                          {hasDetails ? (
                            <ChevronDown
                              className={`h-4 w-4 flex-shrink-0 text-zinc-600 transition-transform duration-200
                                  ${isExpanded ? "rotate-180" : ""}`}
                            />
                          ) : (
                            <div className="w-4 flex-shrink-0" />
                          )}

                          {/* Status Icon */}
                          <div
                            className={`relative flex-shrink-0 ${config.color}`}
                          >
                            {event.status === "running" && (
                              <span
                                className={`absolute inset-0 rounded-full blur-md ${config.bg} animate-pulse`}
                              />
                            )}
                            <Icon
                              className={`w-4 h-4 relative z-10 ${event.status === "running" ? "animate-spin" : ""}`}
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="truncate text-sm font-medium text-zinc-100">
                                {event.node_name}
                              </span>
                              <ChevronRight className="hidden h-3 w-3 flex-shrink-0 text-zinc-600 sm:block" />
                              <span className="truncate text-xs text-zinc-500 sm:text-sm">
                                {event.message}
                              </span>
                            </div>
                          </div>

                          {/* Duration */}
                          {duration && event.status !== "running" && (
                            <div className="flex flex-shrink-0 items-center gap-1 rounded-md border border-white/[0.06] bg-black/40 px-2 py-1 font-mono text-[10px] text-zinc-500">
                              <Clock className="h-3 w-3" />
                              {duration}
                            </div>
                          )}

                          {/* Status Dot */}
                          <div
                            className={`h-1.5 w-1.5 flex-shrink-0 rounded-full transition-colors duration-300 ${
                              event.status === "running"
                                ? "animate-pulse bg-amber-400"
                                : event.status === "completed"
                                  ? "bg-emerald-400"
                                  : event.status === "error"
                                    ? "bg-red-400"
                                    : "bg-zinc-600"
                            }`}
                          />
                        </div>

                        {/* Expanded Details */}
                        {isExpanded && hasDetails && (
                          <div className="animate-in slide-in-from-top-2 px-4 pb-4 pl-[3.25rem] duration-200">
                            <div className="space-y-2 rounded-xl border border-white/[0.08] bg-black/50 p-3">
                              {event.started_at && (
                                <div className="flex justify-between text-xs">
                                  <span className="text-zinc-500">
                                    Started:
                                  </span>
                                  <span className="font-mono text-zinc-400">
                                    {new Date(
                                      event.started_at,
                                    ).toLocaleTimeString()}
                                  </span>
                                </div>
                              )}
                              {event.ended_at && (
                                <div className="flex justify-between text-xs">
                                  <span className="text-zinc-500">Ended:</span>
                                  <span className="font-mono text-zinc-400">
                                    {new Date(
                                      event.ended_at,
                                    ).toLocaleTimeString()}
                                  </span>
                                </div>
                              )}
                              {event.duration && (
                                <div className="flex justify-between text-xs">
                                  <span className="text-zinc-500">
                                    Duration:
                                  </span>
                                  <span className="font-mono text-zinc-400">
                                    {event.duration.toFixed(3)}s
                                  </span>
                                </div>
                              )}
                              {event.output != null && (
                                <div className="border-t border-white/[0.06] pt-2">
                                  <span className="mb-1 block text-xs text-zinc-500">
                                    Output:
                                  </span>
                                  <div className="max-h-48 overflow-y-auto rounded-lg border border-white/[0.06] bg-zinc-950/80 p-2 scrollbar-thin">
                                    <pre className="break-words whitespace-pre-wrap font-mono text-xs text-zinc-300">
                                      {typeof event.output === "string"
                                        ? event.output
                                        : JSON.stringify(event.output, null, 2)}
                                    </pre>
                                  </div>
                                </div>
                              )}
                              {event.status === "error" && !event.output && (
                                <div className="flex items-center gap-2 text-xs text-red-400">
                                  <AlertCircle className="w-4 h-4" />
                                  <span>Error occurred during execution</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {currentRun?.articleContent && currentRun?.id && (
                  <div className="border-t border-emerald-500/20 bg-gradient-to-r from-emerald-500/[0.08] via-black/40 to-violet-500/[0.06] px-4 py-3">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex min-w-0 items-center gap-2 text-xs text-zinc-300">
                        <FileText className="h-4 w-4 shrink-0 text-emerald-400" />
                        <span className="truncate">
                          Blog ready —{" "}
                          <span className="text-zinc-500">
                            {currentRun.articleTitle || currentRun.topic}
                          </span>
                        </span>
                      </div>
                      <Link
                        href={`/blog/read/${currentRun.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/15 transition hover:bg-emerald-300"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Open blog
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {currentRun?.articleContent && currentRun?.id && (
              <div className="flex-shrink-0 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.08] via-black to-violet-500/[0.07] p-5 shadow-[0_24px_80px_-40px_rgba(16,185,129,0.35)]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 ring-1 ring-emerald-400/30">
                      <FileText className="h-5 w-5 text-emerald-300" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-emerald-200">
                        Blog ready
                      </h3>
                      <p className="mt-0.5 truncate text-xs text-zinc-400">
                        {currentRun.articleTitle || currentRun.topic}
                      </p>
                      <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
                        Open the reader page in this browser, or copy the link
                        (stored locally — share only works on this device).
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 flex-wrap gap-2 sm:justify-end">
                    <Link
                      href={`/blog/read/${currentRun.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/15 transition hover:bg-emerald-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open blog
                    </Link>
                    <button
                      type="button"
                      onClick={copyShareUrl}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-zinc-950/80 px-4 py-2.5 text-sm font-medium text-zinc-100 transition hover:border-white/20 hover:bg-zinc-900"
                    >
                      {copiedUrl ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      {copiedUrl ? "Copied" : "Copy URL"}
                    </button>
                  </div>
                </div>
                <div className="mt-4 rounded-xl border border-white/[0.08] bg-black/50 px-3 py-2.5">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                    Post URL
                  </p>
                  <p className="mt-1 break-all font-mono text-xs text-violet-200/90">
                    {shareUrl || `${origin || "…"}/blog/read/${currentRun.id}`}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogStreamPage;
