import React from "react";
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
} from "lucide-react";
import Link from "next/link";

const DeepThinkAIHome = () => {
  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-violet-500/30 font-sans">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_500px_at_50%_-20%,#7c3aed15,transparent)]" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full border-b border-zinc-800/30 bg-black/70 backdrop-blur-2xl z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              DeepThinkAI
            </span>
          </div>

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

          <div className="flex items-center gap-4">
            <Link href={"/login"}>
              <button className="hidden sm:block px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                Login
              </button>
            </Link>
            <Link href={"/blog"}>
              <button className="group relative px-6 py-2.5 bg-zinc-100 text-black rounded-full text-sm font-semibold hover:bg-white transition-all hover:scale-105 active:scale-95 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-cyan-400 opacity-0 group-hover:opacity-10 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  Start Creating
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 text-xs font-medium mb-8 hover:border-zinc-700 transition-colors cursor-pointer group">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                </span>
                <span>Now with Real-time Web Scraping</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-500">
                  Enter a Topic.
                </span>
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400">
                  Get an Industry-Ready Blog.
                </span>
              </h1>

              <p className="text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                Our multi-agent system curates trending topics, researches from
                50+ sources, generates custom visuals, and composes
                publication-ready content —
                <span className="text-zinc-200 font-medium">
                  {" "}
                  fully automated
                </span>
                .
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <button className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold text-base hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                  <span className="relative flex items-center gap-2">
                    Try Free — Generate Blog
                    <Zap className="w-4 h-4 fill-current" />
                  </span>
                </button>
                <button className="group flex items-center gap-3 px-6 py-4 rounded-full border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900 hover:border-zinc-700 transition-all">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-3 h-3 fill-white ml-0.5" />
                  </div>
                  <span className="text-zinc-300 font-medium">Watch Demo</span>
                </button>
              </div>

              <div className="mt-12 flex items-center gap-6 text-xs text-zinc-500 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>No API keys needed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Publish to Medium, Hashnode, Dev.to</span>
                </div>
              </div>
            </div>

            {/* Interactive Demo Card */}
            <div className="flex-1 w-full max-w-lg">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
                  {/* Terminal Header */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950/50 border-b border-zinc-800">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/30" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/30" />
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-xs text-zinc-500 font-mono">
                        deepthink-agent-console
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Input Simulation */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                        Enter Topic
                      </label>
                      <div className="flex items-center gap-2 p-3 bg-black/50 rounded-lg border border-zinc-800 font-mono text-sm text-zinc-300">
                        <span className="text-violet-400">$</span>
                        <span className="animate-pulse">
                          "Future of AI Agents in 2025"
                        </span>
                        <span className="w-2 h-4 bg-violet-500 ml-1 animate-pulse" />
                      </div>
                    </div>

                    {/* Processing Steps */}
                    <div className="space-y-3 py-2">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        </div>
                        <span className="text-zinc-400">
                          Curating trending sources...
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                          <Globe className="w-3 h-3 text-violet-400 animate-spin" />
                        </div>
                        <span className="text-zinc-300">
                          Scraping 12 authoritative sites...
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm opacity-50">
                        <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center">
                          <ImageIcon className="w-3 h-3 text-zinc-500" />
                        </div>
                        <span className="text-zinc-500">
                          Generating hero image...
                        </span>
                      </div>
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
      <section id="workflow" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_100%,#7c3aed10,transparent)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              The Complete Content Pipeline
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              From a single keyword to a publish-ready article. Watch our agents
              orchestrate the entire process.
            </p>
          </div>

          {/* Pipeline Steps */}
          <div className="grid md:grid-cols-5 gap-4 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent -translate-y-1/2 z-0" />

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
              <div key={i} className="relative z-10 group">
                <div className="h-full p-6 bg-zinc-950 border border-zinc-800/50 rounded-2xl hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono text-zinc-600">
                      {item.step}
                    </span>
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-br ${item.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                    >
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-zinc-200 mb-2 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mb-3 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="pt-3 border-t border-zinc-800/50">
                    <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-wider">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Ecosystem */}
      <section id="agents" className="py-24 px-6 bg-zinc-950/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-medium mb-6">
                <Layers className="w-3 h-3" />
                <span>Multi-Agent Architecture</span>
              </div>

              <h2 className="text-4xl font-bold mb-6 leading-tight">
                Specialized Agents for
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                  {" "}
                  Every Task
                </span>
              </h2>

              <p className="text-zinc-400 mb-8 leading-relaxed">
                Unlike single-model solutions, DeepThinkAI deploys a swarm of
                specialized agents that debate, verify, and refine content.
                Research agents scrape live data. Writing agents craft
                narratives. Editor agents ensure accuracy.
              </p>

              <div className="space-y-4">
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
                    className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/50 hover:border-zinc-800 transition-all group"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <agent.icon className={`w-5 h-5 ${agent.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-zinc-200 text-sm">
                        {agent.name}
                      </h4>
                      <p className="text-xs text-zinc-500">{agent.role}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500/50 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Representation */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-black border border-zinc-800 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs font-mono text-zinc-500">
                      AGENT_NETWORK.log
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-500 font-mono">
                    ● LIVE
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex gap-3 text-zinc-500">
                    <span className="text-zinc-700">[09:42:01]</span>
                    <span className="text-cyan-400">Research_Agent_01</span>
                    <span>→ Scraping https://arxiv.org/abs/2401...</span>
                  </div>
                  <div className="flex gap-3 text-zinc-500">
                    <span className="text-zinc-700">[09:42:03]</span>
                    <span className="text-cyan-400">Research_Agent_02</span>
                    <span>→ Extracting data from TechCrunch...</span>
                  </div>
                  <div className="flex gap-3 text-zinc-500">
                    <span className="text-zinc-700">[09:42:05]</span>
                    <span className="text-violet-400">Synthesis_Agent</span>
                    <span>→ Cross-referencing 12 sources...</span>
                  </div>
                  <div className="flex gap-3 text-zinc-500">
                    <span className="text-zinc-700">[09:42:08]</span>
                    <span className="text-pink-400">Creative_Agent</span>
                    <span>→ Generating outline...</span>
                  </div>
                  <div className="flex gap-3 text-zinc-500">
                    <span className="text-zinc-700">[09:42:12]</span>
                    <span className="text-amber-400">Visual_Agent</span>
                    <span>→ Creating hero image (1024x1024)...</span>
                  </div>
                  <div className="flex gap-3 items-center mt-4 pt-4 border-t border-zinc-800">
                    <span className="text-zinc-700">[09:42:15]</span>
                    <span className="text-emerald-400">Orchestrator</span>
                    <span className="text-emerald-400/80">
                      → Blog assembly complete ✓
                    </span>
                  </div>
                </div>

                <button className="w-full mt-6 py-3 bg-zinc-100 text-black rounded-lg font-medium text-sm hover:bg-white transition-colors flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Preview Generated Blog
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
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
                className="group relative p-8 rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                />
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-6`}
                >
                  <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-3 text-zinc-100">
                  {feature.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_50%,#7c3aed20,transparent)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
              Stop Writing.
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Start Creating.
            </span>
          </h2>
          <p className="text-zinc-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Join 10,000+ developers and writers who've automated their content
            workflow. Generate your first industry-ready blog in under 2
            minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-base hover:scale-105 transition-all shadow-[0_0_60px_-15px_rgba(255,255,255,0.4)]">
              Generate Blog Now — It's Free
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity blur-xl" />
            </button>
          </div>

          <p className="mt-6 text-xs text-zinc-600">
            No credit card required • 3 free generations • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 px-6 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8 text-sm text-zinc-600">
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Documentation
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              API
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Twitter
            </a>
          </div>

          <p className="text-sm text-zinc-700">
            © {new Date().getFullYear()} DeepThinkAI. Built for creators.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full justify-center mt-2">
          <span className="font-bold text-[220px] bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            DeepThinkAI
          </span>
        </div>
      </footer>
    </div>
  );
};

export default DeepThinkAIHome;
