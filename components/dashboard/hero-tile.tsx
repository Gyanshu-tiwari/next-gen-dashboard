"use client"

import React from "react"
import { motion } from "framer-motion"
import { Sparkles, Trophy, Flame, Clock, BookOpen } from "lucide-react"
import { Course } from "@/types/course"

interface HeroTileProps {
  courses: Course[]
}

export function HeroTile({ courses }: HeroTileProps) {
  // Compute some interesting stats from courses
  const totalCourses = courses.length
  const completedCourses = courses.filter(c => c.progress === 100).length

  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative overflow-hidden rounded-3xl border border-white/5 hover:border-violet-500/20 bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-slate-950 p-6 md:p-8 shadow-2xl h-full flex flex-col justify-between transition-colors duration-300 cursor-pointer"
    >
      {/* Decorative premium light leak gradients */}
      <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-violet-600/10 blur-[80px] pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-indigo-600/10 blur-[80px] pointer-events-none" />

      {/* Welcome Text Section */}
      <div className="space-y-4 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          <span>Beta Access 2.0</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
          Welcome back, <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">Alex Mercer</span>! 👋
        </h1>

        <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
          You&apos;re making incredible headway. Your average syllabus progress is up <span className="text-emerald-400 font-semibold">12%</span> this week. Keep up the streak and earn your Next-Gen Graduation badge!
        </p>
      </div>

      {/* Quick highlight metrics row */}
      <div className="grid grid-cols-3 gap-3 pt-6 relative z-10">
        <div className="p-3.5 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-indigo-400 mb-1">
            <Flame className="h-4 w-4" />
            <span className="text-[10px] uppercase font-mono tracking-wider font-semibold">Streak</span>
          </div>
          <span className="text-lg font-bold text-white">5 Days</span>
        </div>
        
        <div className="p-3.5 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-violet-400 mb-1">
            <Clock className="h-4 w-4" />
            <span className="text-[10px] uppercase font-mono tracking-wider font-semibold">Study Time</span>
          </div>
          <span className="text-lg font-bold text-white">18.4 hrs</span>
        </div>

        <div className="p-3.5 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-emerald-400 mb-1">
            <Trophy className="h-4 w-4" />
            <span className="text-[10px] uppercase font-mono tracking-wider font-semibold">Completed</span>
          </div>
          <span className="text-lg font-bold text-white">{completedCourses} / {totalCourses}</span>
        </div>
      </div>
    </motion.div>
  )
}

export function CurriculumGauge({ courses }: HeroTileProps) {
  const totalCourses = courses.length
  const averageProgress = totalCourses > 0 
    ? Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / totalCourses)
    : 0

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex flex-col items-center justify-center p-6 rounded-3xl border border-white/5 hover:border-indigo-500/20 bg-slate-900/40 backdrop-blur-md shadow-xl relative overflow-hidden h-full min-h-[220px] transition-colors duration-300 cursor-pointer"
    >
      <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-indigo-600/5 blur-2xl pointer-events-none" />
      
      <div className="relative h-32 w-32 flex items-center justify-center z-10">
        {/* Outer Ring glow */}
        <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-xl animate-pulse" />
        
        {/* SVG circle track */}
        <svg className="h-full w-full -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="52"
            className="stroke-slate-950 fill-none"
            strokeWidth="10"
          />
          <motion.circle
            cx="64"
            cy="64"
            r="52"
            className="stroke-indigo-500 fill-none"
            strokeWidth="10"
            strokeDasharray={2 * Math.PI * 52}
            initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - averageProgress / 100) }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-black text-white leading-none font-mono">
            {averageProgress}%
          </span>
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-1">
            Average
          </span>
        </div>
      </div>
      <p className="mt-4 text-xs font-semibold text-indigo-300 text-center flex items-center gap-1.5 relative z-10">
        <BookOpen className="h-3.5 w-3.5" />
        <span>Overall Curriculum Status</span>
      </p>
    </motion.div>
  )
}
