"use client";

import Link from "next/link";
import { ArrowLeft, UserCircle2 } from "lucide-react";

export default function ProfilePage() {
  return (
    <main className="min-h-dvh bg-black px-4 py-10 text-zinc-100">
      <div className="mx-auto max-w-2xl rounded-3xl border border-white/[0.08] bg-zinc-950/70 p-6 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.85)] backdrop-blur-xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/15 ring-1 ring-violet-400/20">
            <UserCircle2 className="h-6 w-6 text-violet-300" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
            <p className="text-sm text-zinc-500">Your account area</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-black/40 p-5 text-sm text-zinc-300">
          Profile details can be added here.
        </div>

        <div className="mt-6 flex gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-zinc-100 transition hover:bg-white/[0.08]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
        </div>
      </div>
    </main>
  );
}