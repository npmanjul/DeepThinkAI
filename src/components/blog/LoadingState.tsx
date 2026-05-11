import React from "react";
import { Loader2 } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Loading Article
        </h2>
        <p className="text-sm text-slate-600">
          Please wait while we fetch your content...
        </p>
      </div>
    </div>
  );
};