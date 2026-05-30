"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Construction, ArrowLeft, Terminal, Hammer } from "lucide-react"
import { Button } from "@/components/ui/button"
import img404 from "@/app/404.webp"

interface UnderDevelopmentProps {
  pageName: string
}

export function UnderDevelopment({ pageName }: UnderDevelopmentProps) {
  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center px-8 py-12 overflow-hidden">
      {/* Full-width ambient glows */}
      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-[#7C6CF5]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/4 blur-[100px] pointer-events-none animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full flex flex-col lg:flex-row items-center gap-16"
      >
        {/* LEFT — text content */}
        <div className="flex-1 flex flex-col items-start gap-6 max-w-xl">
          {/* Route badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#2A2D40] border border-white/5 text-[10px] font-mono text-[#A6A8B8]">
            <Terminal className="h-3 w-3 text-[#7C6CF5]" />
            <span>GET /{pageName.toLowerCase().replace(/ /g, "-")}</span>
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse ml-1" />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <Construction className="h-6 w-6 text-[#7C6CF5] animate-bounce" />
              <h1 className="text-3xl md:text-4xl font-black text-[#F4F5F7] tracking-tight leading-none">
                {pageName}
              </h1>
            </div>
            <p className="text-base font-semibold text-[#A6A8B8] leading-none mb-1">
              is Under Construction
            </p>
          </div>

          <p className="text-sm text-[#77798A] leading-relaxed max-w-md">
            Our engineering team is handcrafting the next-generation modules for this section. 
            Check back soon for a custom analytics workshop tailored to your learning profile.
          </p>

          {/* Progress bar */}
          <div className="w-full max-w-sm">
            <div className="flex justify-between items-center text-[10px] font-bold text-[#77798A] uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <Hammer className="h-2.5 w-2.5 animate-pulse" />
                <span>Compiling modules</span>
              </span>
              <span className="font-mono text-[#7C6CF5]">74%</span>
            </div>
            <div className="h-1.5 w-full bg-[#1E2030] rounded-full overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "74%" }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                className="h-full bg-gradient-to-r from-[#7C6CF5] to-violet-400 rounded-full"
              />
            </div>
          </div>

          {/* CTA */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button
              asChild
              className="bg-[#7C6CF5] hover:bg-[#9B8DFF] border-none font-semibold rounded-xl text-sm px-6 py-2.5 shadow-lg shadow-[#7C6CF5]/15 flex items-center gap-2"
            >
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                <span>Return to Dashboard</span>
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* RIGHT — image */}
        <div className="flex-shrink-0 flex flex-col items-center gap-4">
          <div className="relative h-72 w-72 md:h-80 md:w-80 rounded-3xl overflow-hidden border border-white/8 shadow-2xl shadow-black/40 bg-[#2A2D40]/60 group">
            <Image
              src={img404}
              alt={`${pageName} page under development`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E2030] via-transparent to-transparent opacity-50" />
          </div>

          {/* Module status pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {["UI Layer", "API Routes", "Data Models"].map((mod, i) => (
              <motion.span
                key={mod}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-[#2A2D40] border border-white/5 text-[#77798A] font-mono"
              >
                {mod} <span className="text-amber-500">• pending</span>
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
