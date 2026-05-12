"use client";
import React, { useState } from "react";
import {
  Sparkles,
  Zap,
  Globe,
  FileText,
  Rocket,
  ArrowRight,
  CheckCircle2,
  BrainCircuit,
  Image as ImageIcon,
  Search,
  Cpu,
  Layers,
  ChevronRight,
  Terminal,
  ExternalLink,
  Play,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

const DeepThinkAIHome = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-violet-500/30 font-sans overflow-x-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_300px_at_50%_-20%,#7c3aed15,transparent)] sm:bg-[radial-gradient(circle_500px_at_50%_-20%,#7c3aed15,transparent)]" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full border-b border-zinc-800/30 bg-black/70 backdrop-blur-2xl z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="font-bold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              DeepThinkAI
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500">
            <a
              href="#workflow"
              className="hover:text-zinc-100 transition-colors"
            >
              Workflow
            </a>
            <a
              href="#features"
              className="hover:text-zinc-100 transition-colors"
            >
              Features
            </a>
            <a href="#agents" className="hover:text-zinc-100 transition-colors">
              Agents
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <button className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                Login
              </button>
            </Link>
            <Link href="/blog">
              <button className="group relative px-6 py-2.5 bg-zinc-100 text-black rounded-full text-sm font-semibold hover:bg-white transition-all hover:scale-105 active:scale-95 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-cyan-400 opacity-0 group-hover:opacity-10 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  Start Creating
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </Link>
          </div>

          {/* Mobile Right Side */}
          <div className="flex md:hidden items-center gap-3">
            <Link href="/blog">
              <button className="px-4 py-2 bg-zinc-100 text-black rounded-full text-xs font-semibold hover:bg-white transition-all active:scale-95">
                Start Free
              </button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-zinc-800/50">
            <div className="px-4 py-4 space-y-1">
              {["Workflow", "Features", "Agents"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-all"
                >
                  <span>{item}</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              ))}
              <div className="pt-3 border-t border-zinc-800/50">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-all text-left">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-28 md:pt-36 lg:pt-40 pb-12 sm:pb-16 md:pb-24 px-3 sm:px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-10 lg:gap-16">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left w-full">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 text-[11px] sm:text-xs font-medium mb-4 sm:mb-6 md:mb-8 hover:border-zinc-700 transition-colors cursor-pointer group">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
                </span>
                <span className="truncate">
                  Now with Real-time Web Scraping
                </span>
                <ChevronRight className="w-3 h-3 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 sm:mb-6 md:mb-8 leading-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-500">
                  Enter a Topic.
                </span>
                <span className="block mt-2 sm:mt-3 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400">
                  Get an Industry-Ready Blog.
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8 md:mb-10 leading-relaxed">
                Our multi-agent system curates trending topics, researches from
                50+ sources, generates custom visuals, and composes
                publication-ready content —
                <span className="text-zinc-200 font-medium">
                  {" "}
                  fully automated
                </span>
                .
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-4 justify-center lg:justify-start">
                <button className="w-full sm:w-auto group relative px-5 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full font-semibold text-xs sm:text-sm md:text-base hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] overflow-hidden active:scale-95">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                  <span className="relative flex items-center justify-center gap-2">
                    Try Free — Generate Blog
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                  </span>
                </button>
                <button className="w-full sm:w-auto group flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-full border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900 hover:border-zinc-700 transition-all active:scale-95">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white ml-0.5" />
                  </div>
                  <span className="text-zinc-300 font-medium text-xs sm:text-sm md:text-base">
                    Watch Demo
                  </span>
                </button>
              </div>

              {/* Trust Signals */}
              <div className="mt-6 sm:mt-8 md:mt-12 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 md:gap-6 text-[11px] sm:text-xs text-zinc-500 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 flex-shrink-0" />
                  <span>No API keys needed</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 flex-shrink-0" />
                  <span>Publish to Medium, Hashnode, Dev.to</span>
                </div>
              </div>
            </div>

            {/* Demo Card */}
            <div className="flex-1 w-full max-w-lg lg:max-w-none">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl sm:rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                  {/* Terminal Header */}
                  <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-950/50 border-b border-zinc-800">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-amber-500/20 border border-amber-500/30" />
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-500/20 border border-emerald-500/30" />
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-[10px] sm:text-xs text-zinc-500 font-mono truncate">
                        deepthink-agent-console
                      </span>
                    </div>
                  </div>

                  <div className="p-3 sm:p-6 space-y-3 sm:space-y-4">
                    {/* Input Simulation */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="text-[10px] sm:text-xs font-medium text-zinc-500 uppercase tracking-wider">
                        Enter Topic
                      </label>
                      <div className="flex items-center gap-2 p-2.5 sm:p-3 bg-black/50 rounded-lg border border-zinc-800 font-mono text-[10px] sm:text-xs md:text-sm text-zinc-300 overflow-hidden">
                        <span className="text-violet-400 flex-shrink-0">$</span>
                        <span className="truncate">
                          "Future of AI Agents in 2025"
                        </span>
                        <span className="w-1.5 h-3 sm:w-2 sm:h-4 bg-violet-500 ml-1 animate-pulse flex-shrink-0" />
                      </div>
                    </div>

                    {/* Processing Steps */}
                    <div className="space-y-2 sm:space-y-3 py-1.5 sm:py-2">
                      {[
                        {
                          icon: CheckCircle2,
                          label: "Curating trending sources...",
                          style: "bg-emerald-500/10 border-emerald-500/20",
                          iconStyle: "text-emerald-400",
                          opacity: "opacity-100",
                          textStyle: "text-zinc-400",
                        },
                        {
                          icon: Globe,
                          label: "Scraping 12 authoritative sites...",
                          style: "bg-violet-500/10 border-violet-500/20",
                          iconStyle: "text-violet-400 animate-spin",
                          opacity: "opacity-100",
                          textStyle: "text-zinc-300",
                        },
                        {
                          icon: ImageIcon,
                          label: "Generating hero image...",
                          style: "bg-zinc-800",
                          iconStyle: "text-zinc-500",
                          opacity: "opacity-50",
                          textStyle: "text-zinc-500",
                        },
                      ].map((step, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-2.5 sm:gap-3 text-sm ${step.opacity}`}
                        >
                          <div
                            className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full ${step.style} border flex items-center justify-center flex-shrink-0`}
                          >
                            <step.icon
                              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${step.iconStyle}`}
                            />
                          </div>
                          <span
                            className={`text-[10px] sm:text-xs md:text-sm ${step.textStyle}`}
                          >
                            {step.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Pipeline */}
      <section
        id="workflow"
        className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_100%,#7c3aed10,transparent)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white">
              The Complete Content Pipeline
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base px-2">
              From a single keyword to a publish-ready article. Watch our agents
              orchestrate the entire process.
            </p>
          </div>

          {/* Pipeline Steps — Scroll on mobile, grid on md+ */}
          <div className="relative">
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent -translate-y-1/2 z-0" />

            {/* Mobile: horizontal scroll */}
            <div className="flex md:grid md:grid-cols-5 gap-3 sm:gap-4 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory md:overflow-visible scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              {[
                {
                  step: "01",
                  icon: Search,
                  title: "Topic Curation",
                  desc: "AI scans trending topics & news",
                  color: "from-blue-500 to-cyan-500",
                  detail: "Sources: Reddit, HN, Twitter, Google Trends",
                },
                {
                  step: "02",
                  icon: Globe,
                  title: "Web Scraping",
                  desc: "Extract data from 50+ sources",
                  color: "from-cyan-500 to-teal-500",
                  detail: "Academic papers, Blogs, Documentation",
                },
                {
                  step: "03",
                  icon: Cpu,
                  title: "Multi-Agent Synthesis",
                  desc: "Cross-reference & fact-check",
                  color: "from-violet-500 to-purple-500",
                  detail: "Research, Writing & Editing agents",
                },
                {
                  step: "04",
                  icon: ImageIcon,
                  title: "Visual Generation",
                  desc: "Create custom hero images",
                  color: "from-fuchsia-500 to-pink-500",
                  detail: "AI-generated infographics & banners",
                },
                {
                  step: "05",
                  icon: Rocket,
                  title: "One-Click Publish",
                  desc: "Deploy to all platforms",
                  color: "from-orange-500 to-amber-500",
                  detail: "SEO optimized & formatted",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative z-10 group flex-shrink-0 w-[180px] xs:w-[200px] sm:w-[220px] md:w-auto snap-start"
                >
                  <div className="h-full p-3 sm:p-5 md:p-6 bg-zinc-950 border border-zinc-800/50 rounded-xl sm:rounded-2xl hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-2.5 sm:mb-4">
                      <span className="text-[10px] sm:text-xs font-mono text-zinc-600">
                        {item.step}
                      </span>
                      <div
                        className={`p-1 sm:p-1.5 md:p-2 rounded-lg bg-gradient-to-br ${item.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                      >
                        <item.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-zinc-200 mb-1 sm:mb-2 text-[11px] sm:text-xs md:text-sm">
                      {item.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs md:text-xs text-zinc-500 mb-2 sm:mb-3 leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="pt-2 sm:pt-3 border-t border-zinc-800/50">
                      <p className="text-[8px] sm:text-[9px] md:text-[10px] text-zinc-600 font-mono uppercase tracking-wider leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile scroll hint */}
            <div className="flex md:hidden justify-center mt-4 gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full ${i === 0 ? "w-4 bg-violet-500" : "w-1.5 bg-zinc-700"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Agent Ecosystem */}
      <section
        id="agents"
        className="py-12 sm:py-16 md:py-24 px-3 sm:px-6 bg-zinc-950/30"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 items-center">
            {/* Left Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-[11px] sm:text-xs font-medium mb-4 sm:mb-5 md:mb-6">
                <Layers className="w-3 h-3 flex-shrink-0" />
                <span>Multi-Agent Architecture</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight">
                Specialized Agents for
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                  {" "}
                  Every Task
                </span>
              </h2>

              <p className="text-zinc-400 mb-4 sm:mb-6 md:mb-8 leading-relaxed text-xs sm:text-sm md:text-base">
                Unlike single-model solutions, DeepThinkAI deploys a swarm of
                specialized agents that debate, verify, and refine content.
                Research agents scrape live data. Writing agents craft
                narratives. Editor agents ensure accuracy.
              </p>

              <div className="space-y-3">
                {[
                  {
                    name: "Research Agent",
                    role: "Real-time web scraping & source validation",
                    icon: Globe,
                    color: "text-cyan-400",
                  },
                  {
                    name: "Synthesis Agent",
                    role: "Cross-referencing facts across sources",
                    icon: BrainCircuit,
                    color: "text-violet-400",
                  },
                  {
                    name: "Creative Agent",
                    role: "Narrative structure & storytelling",
                    icon: Sparkles,
                    color: "text-pink-400",
                  },
                  {
                    name: "Visual Agent",
                    role: "Image generation & diagram creation",
                    icon: ImageIcon,
                    color: "text-amber-400",
                  },
                ].map((agent, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 sm:gap-3 md:gap-4 p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/50 hover:border-zinc-800 transition-all group"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <agent.icon
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 ${agent.color}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-zinc-200 text-xs sm:text-sm">
                        {agent.name}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-zinc-500 truncate">
                        {agent.role}
                      </p>
                    </div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500/50 animate-pulse flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal Log */}
            <div className="relative mt-6 sm:mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-2xl sm:rounded-3xl blur-3xl" />
              <div className="relative bg-black border border-zinc-800 rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-5 md:p-8 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between mb-3 sm:mb-5 md:mb-8">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500" />
                    <span className="text-[10px] sm:text-xs font-mono text-zinc-500 truncate">
                      AGENT_NETWORK.log
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-emerald-500 font-mono flex-shrink-0">
                    ● LIVE
                  </span>
                </div>

                <div className="space-y-1.5 sm:space-y-2.5 md:space-y-3 font-mono text-[9px] sm:text-[10px] md:text-xs overflow-x-auto">
                  {[
                    {
                      time: "[09:42:01]",
                      agent: "Research_Agent_01",
                      color: "text-cyan-400",
                      msg: "→ Scraping https://arxiv.org/abs/2401...",
                    },
                    {
                      time: "[09:42:03]",
                      agent: "Research_Agent_02",
                      color: "text-cyan-400",
                      msg: "→ Extracting data from TechCrunch...",
                    },
                    {
                      time: "[09:42:05]",
                      agent: "Synthesis_Agent",
                      color: "text-violet-400",
                      msg: "→ Cross-referencing 12 sources...",
                    },
                    {
                      time: "[09:42:08]",
                      agent: "Creative_Agent",
                      color: "text-pink-400",
                      msg: "→ Generating outline...",
                    },
                    {
                      time: "[09:42:12]",
                      agent: "Visual_Agent",
                      color: "text-amber-400",
                      msg: "→ Creating hero image (1024x1024)...",
                    },
                  ].map((log, i) => (
                    <div
                      key={i}
                      className="flex gap-1.5 sm:gap-2 md:gap-3 text-zinc-500"
                    >
                      <span className="text-zinc-700 flex-shrink-0">
                        {log.time}
                      </span>
                      <span className={`${log.color} flex-shrink-0`}>
                        {log.agent}
                      </span>
                      <span className="truncate">{log.msg}</span>
                    </div>
                  ))}
                  <div className="flex gap-1.5 sm:gap-2 md:gap-3 items-center mt-2 sm:mt-3 md:mt-4 pt-2 sm:pt-3 md:pt-4 border-t border-zinc-800">
                    <span className="text-zinc-700 flex-shrink-0">
                      [09:42:15]
                    </span>
                    <span className="text-emerald-400 flex-shrink-0">
                      Orchestrator
                    </span>
                    <span className="text-emerald-400/80 truncate">
                      → Blog assembly complete ✓
                    </span>
                  </div>
                </div>

                <button className="w-full mt-3 sm:mt-5 md:mt-6 py-2 sm:py-2.5 md:py-3 bg-zinc-100 text-black rounded-lg font-medium text-xs sm:text-sm hover:bg-white transition-colors flex items-center justify-center gap-2 active:scale-95">
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Preview Generated Blog
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-12 sm:py-16 md:py-24 px-3 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-white">
              Everything You Need
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto">
              A complete suite of tools built for modern content creators.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {[
              {
                title: "Live Web Scraping",
                desc: "Real-time data extraction from authoritative sources. No stale datasets.",
                icon: Globe,
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                title: "Auto-Image Generation",
                desc: "Unique hero images and infographics generated per article using AI.",
                icon: ImageIcon,
                gradient: "from-violet-500 to-fuchsia-500",
              },
              {
                title: "Multi-Platform Export",
                desc: "One-click publish to Medium, Dev.to, Hashnode, or your custom CMS.",
                icon: Rocket,
                gradient: "from-orange-500 to-pink-500",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                />
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-3 sm:mb-4 md:mb-6`}
                >
                  <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                    <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                </div>
                <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-1.5 sm:mb-2 md:mb-3 text-zinc-100">
                  {feature.title}
                </h3>
                <p className="text-zinc-500 text-xs sm:text-sm md:text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 md:py-32 px-3 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_300px_at_50%_50%,#7c3aed20,transparent)] sm:bg-[radial-gradient(circle_400px_at_50%_50%,#7c3aed20,transparent)] md:bg-[radial-gradient(circle_600px_at_50%_50%,#7c3aed20,transparent)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
              Stop Writing.
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Start Creating.
            </span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm md:text-base lg:text-lg mb-6 sm:mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
            Join 10,000+ developers and writers who've automated their content
            workflow. Generate your first industry-ready blog in under 2
            minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button className="w-full sm:w-auto group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full font-bold text-xs sm:text-sm md:text-base hover:scale-105 transition-all shadow-[0_0_60px_-15px_rgba(255,255,255,0.4)] active:scale-95">
              Generate Blog Now — It's Free
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity blur-xl" />
            </button>
          </div>

          <p className="mt-4 sm:mt-5 md:mt-6 text-[10px] sm:text-xs text-zinc-600">
            No credit card required • 3 free generations • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 pt-4 sm:pt-6 pb-8 sm:pb-10 md:pb-12 px-3 sm:px-6 bg-black overflow-hidden">
        {/* Large Brand Name */}
        <div className="flex items-center justify-center w-full overflow-hidden mb-4 sm:mb-6 md:mb-12">
          <span className="font-bold text-[clamp(2rem,15vw,220px)] leading-none bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent whitespace-nowrap select-none py-4">
            DeepThinkAI
          </span>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 md:gap-6">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 md:gap-8 text-xs sm:text-sm text-zinc-600">
            {["Documentation", "API", "GitHub", "Twitter"].map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-zinc-300 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
          <p className="text-[10px] sm:text-xs md:text-sm text-zinc-700 text-center">
            © {new Date().getFullYear()} DeepThinkAI. Built for creators.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DeepThinkAIHome;
