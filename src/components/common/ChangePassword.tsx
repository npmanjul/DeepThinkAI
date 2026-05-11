"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Lock } from "lucide-react";
import {AuthAPI} from "@/src/services/api";
import { toast } from "react-hot-toast";
import axios from "axios";

export type ChangePasswordProps = {
  email: string;
  onBack?: () => void;
};

const ChangePassword = ({ email, onBack }: ChangePasswordProps) => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("Email is missing. Please restart the reset flow.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password.length > 20) {
      setError("Password must be at most 20 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    try {
      const res = await AuthAPI.resetPassword({
        email: trimmedEmail,
        new_password: password,
      });
      if (res.status === 200) {
        toast.success("Password reset successfully");
        router.push("/login");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const msg =
          err.response?.data?.detail ||
          err.response?.data?.message ||
          "Password reset failed";
        setError(typeof msg === "string" ? msg : "Password reset failed");
      } else {
        setError(err instanceof Error ? err.message : "Password reset failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-black px-6 py-12 text-white antialiased selection:bg-white selection:text-black">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-white/[0.02] blur-[120px]" />
        <div className="absolute right-[20%] top-[10%] h-[400px] w-[400px] rounded-full bg-neutral-800/20 blur-[100px]" />
        <div className="absolute bottom-[10%] left-[20%] h-[300px] w-[300px] rounded-full bg-neutral-800/20 blur-[80px]" />
      </div>

      <div
        className="pointer-events-none fixed inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative w-full max-w-[450px]">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 opacity-0 blur-xl transition-opacity duration-1000 hover:opacity-100" />

        <div className="relative rounded-2xl border border-white/[0.08] bg-black/40 p-8 shadow-2xl backdrop-blur-md sm:p-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="mb-8 space-y-3 text-center">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Reset password
              </h1>
              <p className="mt-1.5 text-sm text-neutral-500">
                Set your new password to complete account recovery
              </p>
              {email.trim() && (
                <p className="mt-2 text-xs font-medium text-neutral-600">
                  {email.trim()}
                </p>
              )}
            </div>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-3">
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <Lock className="h-4 w-4 text-neutral-500" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password"
                  className="block w-full rounded-lg border border-white/10 bg-black/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-neutral-600 transition-all duration-300 focus:border-white/30 focus:bg-black/80 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.02)] focus:outline-none"
                />
              </div>

              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <Lock className="h-4 w-4 text-neutral-500" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="block w-full rounded-lg border border-white/10 bg-black/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-neutral-600 transition-all duration-300 focus:border-white/30 focus:bg-black/80 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.02)] focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-md border border-red-500/10 bg-red-500/5 px-3 py-2.5 text-xs text-red-400 animate-in fade-in slide-in-from-top-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" x2="12" y1="8" y2="12" />
                  <line x1="12" x2="12.01" y1="16" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-neutral-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-[0.98] disabled:opacity-50 disabled:hover:bg-white disabled:hover:shadow-none"
            >
              {isSubmitting ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
              ) : (
                <span>Reset password</span>
              )}
            </button>

            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-transparent py-2.5 text-sm font-medium text-neutral-400 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 text-neutral-500" />
                <span>Back</span>
              </button>
            ) : (
              <Link
                href="/login"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-transparent py-2.5 text-sm font-medium text-neutral-400 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 text-neutral-500" />
                <span>Back to login</span>
              </Link>
            )}
          </form>

          <div className="mt-8 pt-6 text-center border-t border-white/5">
            <p className="text-[10px] leading-relaxed text-neutral-700">
              Use 6–20 characters for your new password.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
