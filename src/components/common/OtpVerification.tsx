"use client"

import {AuthAPI} from "@/src/services/api"
import { useRouter } from "next/navigation"
import React, { useRef, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

export type OtpVerificationProps = {
  email: string
  /** Where to navigate after successful verification (default: /blog). Ignored if `onVerified` is set. */
  redirectPath?: string
  /** If set (e.g. forgot password), called instead of redirect. Does not persist access_token from OTP. */
  onVerified?: () => void
  /** Optional: return to previous step */
  onBack?: () => void
  /** Label for the back button (default: "Back to signup") */
  backLabel?: string
}

const OtpVerification = ({
  email,
  redirectPath = "/blog",
  onVerified,
  onBack,
  backLabel = "Back to signup",
}: OtpVerificationProps) => {
  const router = useRouter()
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (value: string, index: number) => {
    const digit = value.replace(/\D/g, "").slice(-1)
    const nextOtp = [...otp]
    nextOtp[index] = digit
    setOtp(nextOtp)

    if (digit && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      setError("Email is missing. Go back and try again.")
      return
    }

    const otpCode = otp.join("")
    if (otpCode.length !== 6) {
      setError("Please enter the 6-digit OTP.")
      return
    }

    setIsSubmitting(true)
    setError("")
    try {
      const res = await AuthAPI.verifyOTP({
        email: trimmedEmail,
        otp: otpCode,
      })
      if (res.status === 200 && res.data?.access_token && !onVerified) {
        localStorage.setItem("access_token", res.data.access_token)
      }
      toast.success("Verification successful")
      if (onVerified) {
        onVerified()
      } else {
        router.push(redirectPath)
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const msg =
          err.response?.data?.detail ||
          err.response?.data?.message ||
          "OTP verification failed"
        setError(typeof msg === "string" ? msg : "OTP verification failed")
      } else {
        setError(err instanceof Error ? err.message : "OTP verification failed")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResend = async () => {
    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      toast.error("Email is missing")
      return
    }
    setIsResending(true)
    try {
      await AuthAPI.sendOTP({ email: trimmedEmail })
      toast.success("OTP sent again")
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.detail ||
            err.response?.data?.message ||
            "Could not resend OTP"
        )
      } else {
        toast.error(err instanceof Error ? err.message : "Could not resend OTP")
      }
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-black px-6 py-12 text-white antialiased selection:bg-white selection:text-black">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[700px] rounded-full bg-white/[0.02] blur-[120px]" />
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

      <div className="relative w-full max-w-[500px]">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 opacity-0 blur-xl transition-opacity duration-1000 hover:opacity-100" />

        <div className="relative rounded-2xl border border-white/[0.08] bg-black/40 p-8 shadow-2xl backdrop-blur-md sm:p-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="mb-8 space-y-3 text-center">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                OTP Verification
              </h1>
              <p className="mt-1.5 text-sm text-neutral-500">
                Enter the 6-digit code sent to your email
              </p>
              {email.trim() && (
                <p className="mt-2 text-xs font-medium text-neutral-600">{email.trim()}</p>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="h-14 w-12 rounded-lg border border-white/10 bg-black/50 text-center text-lg font-semibold text-white outline-none transition-all duration-300 placeholder:text-neutral-600 focus:border-white/30 focus:bg-black/80 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.02)] sm:h-16 sm:w-14"
                  aria-label={`OTP digit ${index + 1}`}
                />
              ))}
            </div>

            {error && (
              <div className="flex items-center justify-center gap-2 rounded-md border border-red-500/10 bg-red-500/5 px-3 py-2.5 text-xs text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-neutral-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-[0.98] disabled:opacity-50 disabled:hover:bg-white disabled:hover:shadow-none"
            >
              {isSubmitting ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
              ) : (
                <span>Verify OTP</span>
              )}
            </button>
          </form>

          <div className="mt-8 space-y-4 pt-6 text-center border-t border-white/5">
            <p className="text-xs text-neutral-600">
              Didn&apos;t receive code?{" "}
              <button
                type="button"
                disabled={isResending}
                className="font-medium text-neutral-400 underline underline-offset-4 transition-colors duration-300 hover:text-white disabled:opacity-50"
                onClick={handleResend}
              >
                {isResending ? "Sending…" : "Resend"}
              </button>
            </p>
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="text-xs font-medium text-neutral-500 underline underline-offset-4 transition-colors hover:text-white"
              >
                {backLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OtpVerification
