import React from "react";
import Link from "next/link";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";

export const NotFoundState = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50 px-4">
      <div className="w-full max-w-lg text-center">
        {/* Icon */}
        <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100">
          <FileQuestion className="h-12 w-12 text-indigo-600" />
        </div>

        {/* Title */}
        <h1 className="mb-4 text-4xl font-bold text-slate-950">
          Article Not Found
        </h1>

        {/* Description */}
        <p className="mb-10 text-lg text-slate-600">
          The article you're looking for doesn't exist or has been removed. 
          It may have been deleted or the link might be incorrect.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3 font-medium text-white transition-all hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Studio
          </Link>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3 font-medium text-slate-900 transition-all hover:border-slate-300 hover:bg-slate-50"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};