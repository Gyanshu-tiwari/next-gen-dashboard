import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Welcome Hero Skeleton */}
      <div className="w-full rounded-3xl border border-white/5 bg-slate-900/20 p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6">
        <div className="flex-1 space-y-4">
          <Skeleton className="h-6 w-24 bg-white/5 rounded-full" />
          <Skeleton className="h-10 w-2/3 bg-white/5" />
          <Skeleton className="h-4 w-full bg-white/5" />
          <Skeleton className="h-4 w-5/6 bg-white/5" />
          
          <div className="grid grid-cols-3 gap-3 pt-4">
            <Skeleton className="h-16 rounded-2xl bg-white/5" />
            <Skeleton className="h-16 rounded-2xl bg-white/5" />
            <Skeleton className="h-16 rounded-2xl bg-white/5" />
          </div>
        </div>

        {/* Progress Gauge Circular Skeleton */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/5 w-full md:w-48 h-48 shrink-0">
          <Skeleton className="h-28 w-28 rounded-full bg-white/5" />
          <Skeleton className="h-4 w-24 bg-white/5 mt-4" />
        </div>
      </div>

      {/* Activity Section Grid Skeleton */}
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 rounded-3xl border border-white/5 bg-slate-900/20 p-6 h-56 flex flex-col justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32 bg-white/5" />
            <Skeleton className="h-3.5 w-48 bg-white/5" />
          </div>
          <div className="flex items-end justify-between gap-2 h-24">
            <Skeleton className="h-[40%] flex-1 bg-white/5" />
            <Skeleton className="h-[70%] flex-1 bg-white/5" />
            <Skeleton className="h-[25%] flex-1 bg-white/5" />
            <Skeleton className="h-[85%] flex-1 bg-white/5" />
            <Skeleton className="h-[60%] flex-1 bg-white/5" />
            <Skeleton className="h-[30%] flex-1 bg-white/5" />
            <Skeleton className="h-[0%] flex-1 bg-white/5" />
          </div>
        </div>

        <div className="lg:col-span-2 rounded-3xl border border-white/5 bg-slate-900/20 p-6 h-56 flex flex-col gap-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32 bg-white/5" />
            <Skeleton className="h-3.5 w-48 bg-white/5" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-xl bg-white/5 shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-full bg-white/5" />
                <Skeleton className="h-2.5 w-24 bg-white/5" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-xl bg-white/5 shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-5/6 bg-white/5" />
                <Skeleton className="h-2.5 w-24 bg-white/5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Heading Skeleton */}
      <div className="flex items-center justify-between pt-4">
        <Skeleton className="h-8 w-40 bg-white/5" />
        <Skeleton className="h-8 w-24 bg-white/5" />
      </div>

      {/* Course Cards Grid Skeleton */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((n) => (
          <div 
            key={n} 
            className="rounded-2xl border border-white/5 bg-slate-900/20 p-6 space-y-5 flex flex-col"
          >
            <div className="flex justify-between items-center">
              <Skeleton className="h-12 w-12 rounded-xl bg-white/5" />
              <Skeleton className="h-6 w-20 rounded-full bg-white/5" />
            </div>
            
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-5/6 bg-white/5" />
              <Skeleton className="h-5 w-2/3 bg-white/5" />
              <Skeleton className="h-3 w-28 bg-white/5" />
            </div>

            <div className="space-y-2.5 pt-4">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-12 bg-white/5" />
                <Skeleton className="h-3 w-8 bg-white/5" />
              </div>
              <Skeleton className="h-2 w-full bg-white/5 rounded-full" />
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <Skeleton className="h-6 w-12 rounded-full bg-white/5" />
              <Skeleton className="h-8 w-24 bg-white/5" />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
