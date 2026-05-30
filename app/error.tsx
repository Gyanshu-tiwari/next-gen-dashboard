"use client"

import React, { useEffect } from "react"
import { AlertCircle, RotateCcw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-4">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-rose-500/10 blur-[80px] pointer-events-none" />

      {/* Stylized Error Glass Card */}
      <div className="relative z-10 max-w-md w-full rounded-3xl border border-rose-500/20 bg-slate-900/60 backdrop-blur-xl p-8 text-center shadow-2xl">
        {/* Error icon badge */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400 mb-6 border border-rose-500/20 shadow-lg shadow-rose-500/5">
          <AlertCircle className="h-7 w-7" />
        </div>

        <h2 className="text-2xl font-bold text-white tracking-tight mb-3">
          Something went wrong
        </h2>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          {error.message || "An unexpected error occurred while loading your dashboard data. Please try again or contact support."}
        </p>

        {/* Error identifier digest (hidden or subtle) */}
        {error.digest && (
          <code className="block text-[10px] text-slate-500 font-mono bg-black/30 p-2 rounded-xl mb-6 truncate select-all">
            ID: {error.digest}
          </code>
        )}

        {/* Action button cluster */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            className="bg-gradient-to-r from-rose-600 to-red-500 hover:opacity-90 border-none font-semibold rounded-xl text-white flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Try again</span>
          </Button>

          <Button
            variant="ghost"
            onClick={() => window.location.reload()}
            className="text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 rounded-xl"
          >
            <Home className="h-4 w-4 mr-2" />
            <span>Reload Page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
