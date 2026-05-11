import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeepThinkAI - Multi-Agent Blog Writer",
  description: "DeepThinkAI is a multi-agent blog writer UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#090b0d] text-zinc-100">
        <Providers>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 5000,
              style: {
                background: "#212623",
                color: "#fff",
              },
              success: {
                duration: 3000,
                style: {
                  background: "#212623",
                  color: "#fff",
                },
              },
            }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
