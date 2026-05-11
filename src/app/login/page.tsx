"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { ArrowRight, Lock, Mail, User } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import {AuthAPI} from '@/src/services/api'
import GoogleLoginButton from '@/src/lib/GoogleLoginButton'


const LoginPage = () => {
  const router = useRouter()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const trimmedIdentifier = identifier.trim()
      const isPhoneNumber = /^\+?[0-9]{10,15}$/.test(trimmedIdentifier)
      const payload = {
        ...(isPhoneNumber ? { phone: trimmedIdentifier } : { email: trimmedIdentifier }),
        password,
      }

      console.log("🔐 Attempting login with payload:", payload)
      const res = await AuthAPI.login(payload)

      console.log("✅ Login response received:", res.status)
      console.log("📦 Response data:", res.data)

      if (res.status === 200 && res.data.access_token) {
        console.log("🔑 Storing token to localStorage:", res.data.access_token.substring(0, 30) + "...")
        localStorage.setItem("access_token", res.data.access_token)
        toast.success("Login successful")
        router.push("/blog")
      } else {
        console.error("❌ Invalid response or no token:", res.data)
        toast.error("Login failed: No token received from server")
      }
    } catch (error: any) {
      console.error("❌ Login error:", error)
      const errorMsg = error.response?.data?.message || error.response?.data?.detail || error.message || "Login failed"
      toast.error(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleLogin = () => {
    console.log('Google login clicked')
  }

  const handleGuestLogin = async () => {
    const guestEmail = 'guest@user.com'
    const guestPassword = '123456'
    setIsSubmitting(true)
    
    try {
      console.log("👤 Attempting guest login...")
      const res = await axios.post("http://127.0.0.1:8000/api/v1/auth/login", {
        email: guestEmail,
        password: guestPassword,
      })
      
      console.log("✅ Guest login response:", res.status)
      console.log("📦 Response data:", res.data)
      
      if (res.status === 200 && res.data.access_token) {
        console.log("🔑 Storing guest token to localStorage:", res.data.access_token.substring(0, 30) + "...")
        localStorage.setItem('access_token', res.data.access_token)
        toast.success('Guest login successful')
        router.push('/blog')
      } else {
        console.error("❌ Invalid guest response:", res.data)
        toast.error('Guest login failed: No token received')
      }
    } catch (apiError: any) {
      console.error("❌ Guest login error:", apiError)
      const errorMsg = apiError.response?.data?.message || apiError.response?.data?.detail || apiError.message || 'Guest login failed'
      toast.error(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

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
          backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Layer 3: Noise Texture */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

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
                Welcome back
              </h1>
              <p className="mt-1.5 text-sm text-neutral-500">
                Sign in to continue to ThinkGPT
              </p>
            </div>
          </div>

          {/* Google Button */}
          <GoogleLoginButton/>

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
              {/* Email / Phone Input */}
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <Mail className="h-4 w-4 text-neutral-500" />
                </div>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Email or phone number"
                  className="block w-full rounded-lg border border-white/10 bg-black/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-neutral-600 transition-all duration-300 focus:border-white/30 focus:bg-black/80 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.02)] focus:outline-none"
                />
              </div>

              {/* Password Input */}
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <Lock className="h-4 w-4 text-neutral-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="block w-full rounded-lg border border-white/10 bg-black/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-neutral-600 transition-all duration-300 focus:border-white/30 focus:bg-black/80 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.02)] focus:outline-none"
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href="/forget-password"
                className="text-xs text-neutral-500 transition-colors duration-300 hover:text-white"
              >
                Forgot password?
              </Link>
            </div>



            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-white cursor-pointer px-4 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-neutral-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-[0.98] disabled:opacity-50 disabled:hover:bg-white disabled:hover:shadow-none"
            >
              {isSubmitting ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
              ) : (
                <>
                  <span>Login</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4 text-black" />
                  </span>
                </>
              )}
            </button>

            {/* Guest Button */}
            <button
              type="button"
              onClick={handleGuestLogin}
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-transparent py-2.5 text-xs font-medium text-neutral-500 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.03] hover:text-neutral-300"
            >
              < User className="h-4 w-4 text-neutral-500" />
              <span>Continue as guest</span>
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 text-center border-t border-white/5">
            <p className="text-xs text-neutral-600">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="font-medium text-neutral-400 underline underline-offset-4 transition-colors duration-300 hover:text-white"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage