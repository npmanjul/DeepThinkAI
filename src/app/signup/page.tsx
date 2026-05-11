"use client";

import Link from "next/link";
import React, { useState } from "react";
import { ArrowRight, Lock, Mail, Phone, User } from "lucide-react";
import {AuthAPI} from "@/src/services/api";
import toast from "react-hot-toast";
import GoogleLoginButton from "@/src/lib/GoogleLoginButton";
import OtpVerification from "@/src/components/common/OtpVerification";
import { SignupStep } from "@/src/types/auth.types";

const SignUpPage = () => {
  const [step, setStep] = useState<SignupStep>("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      email: formData.email,
      name: formData.name,
      phone: formData.phone,
      password: formData.password,
    };
    const res = await AuthAPI.signup(payload);
    if (res.status !== 201) {
      toast.error("Signup did not complete");
      return;
    }

    const otp_res= await AuthAPI.sendOTP({ email: formData.email.trim() });
    if(otp_res.status==200){
      toast.success("Check your email for the verification code.");
      setStep("otp");
      setIsSubmitting(false);
    }

  };

  if (step === "otp") {
    return (
      <OtpVerification
        email={formData.email.trim()}
        redirectPath="/blog"
        onBack={() => setStep("form")}
      />
    );
  }

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-black px-6 py-12 text-white antialiased selection:bg-white selection:text-black">
      {/* Layer 1: Ambient Glow Effects */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-white/[0.02] blur-[120px]" />
        <div className="absolute right-[20%] top-[10%] h-[400px] w-[400px] rounded-full bg-neutral-800/20 blur-[100px]" />
        <div className="absolute bottom-[10%] left-[20%] h-[300px] w-[300px] rounded-full bg-neutral-800/20 blur-[80px]" />
      </div>

      {/* Layer 2: Dot Pattern */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Layer 3: Noise Texture */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content Container with Glass Effect */}
      <div className="relative w-full max-w-[450px]">
        {/* Glow behind card */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 opacity-0 blur-xl transition-opacity duration-1000 hover:opacity-100" />

        <div className="relative rounded-2xl border border-white/[0.08] bg-black/40 p-8 shadow-2xl backdrop-blur-md sm:p-10">
          {/* Top accent line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Header */}
          <div className="mb-8 space-y-3 text-center">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Create account
              </h1>
              <p className="mt-1.5 text-sm text-neutral-500">
                Sign up to get started with ThinkGPT
              </p>
            </div>
          </div>

          {/* Google Button */}
          <GoogleLoginButton />

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider">
              <span className="bg-[#0a0a0a] px-3 text-neutral-600">or</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              {/* Name Input */}
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <User className="h-4 w-4 text-neutral-500" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Full name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="block w-full rounded-lg border border-white/10 bg-black/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-neutral-600 transition-all duration-300 focus:border-white/30 focus:bg-black/80 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.02)] focus:outline-none"
                />
              </div>

              {/* Email Input */}
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <Mail className="h-4 w-4 text-neutral-500" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email address"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="block w-full rounded-lg border border-white/10 bg-black/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-neutral-600 transition-all duration-300 focus:border-white/30 focus:bg-black/80 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.02)] focus:outline-none"
                />
              </div>

              {/* Phone Input */}
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <Phone className="h-4 w-4 text-neutral-500" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Phone number"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                    }))
                  }
                  className="block w-full rounded-lg border border-white/10 bg-black/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-neutral-600 transition-all duration-300 focus:border-white/30 focus:bg-black/80 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.02)] focus:outline-none"
                />
              </div>

              {/* Password Input */}
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <Lock className="h-4 w-4 text-neutral-500" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="block w-full rounded-lg border border-white/10 bg-black/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-neutral-600 transition-all duration-300 focus:border-white/30 focus:bg-black/80 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.02)] focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-neutral-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-[0.98] disabled:opacity-50 disabled:hover:bg-white disabled:hover:shadow-none"
            >
              {isSubmitting ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
              ) : (
                <>
                  <span>Create account</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4 text-neutral-500" />
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 text-center border-t border-white/5">
            <p className="text-xs text-neutral-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-neutral-400 underline underline-offset-4 transition-colors duration-300 hover:text-white"
              >
                Sign in
              </Link>
            </p>
            <p className="mt-4 text-[10px] leading-relaxed text-neutral-700">
              By signing up, you agree to our{" "}
              <Link
                href="/terms"
                className="text-neutral-500 underline hover:text-neutral-400"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-neutral-500 underline hover:text-neutral-400"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
