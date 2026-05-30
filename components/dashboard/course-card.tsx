"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  BookOpen, 
  Code, 
  Palette, 
  Database, 
  Brain, 
  ArrowRight,
  Clock,
  CheckCircle2
} from "lucide-react"
import { Course } from "@/types/course"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CourseCardProps {
  course: Course
}

// Map icon names to static Lucide icon components
const ICON_MAP = {
  react: Code,
  code: Code,
  web: Code,
  design: Palette,
  ui: Palette,
  ux: Palette,
  data: Database,
  sql: Database,
  database: Database,
  ai: Brain,
  ml: Brain,
  brain: Brain,
}

// Get dynamic gradient styles based on icon name for visual richness
const getCardAccentStyles = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case "react":
    case "code":
      return {
        bg: "from-blue-600 to-cyan-500",
        shadow: "shadow-cyan-500/10",
        text: "text-cyan-400",
        glow: "bg-cyan-500/5",
        border: "hover:border-cyan-500/30",
      }
    case "design":
      return {
        bg: "from-pink-600 to-rose-500",
        shadow: "shadow-rose-500/10",
        text: "text-rose-400",
        glow: "bg-rose-500/5",
        border: "hover:border-rose-500/30",
      }
    case "data":
      return {
        bg: "from-emerald-600 to-teal-500",
        shadow: "shadow-teal-500/10",
        text: "text-teal-400",
        glow: "bg-teal-500/5",
        border: "hover:border-emerald-500/30",
      }
    case "ai":
      return {
        bg: "from-violet-600 to-fuchsia-500",
        shadow: "shadow-fuchsia-500/10",
        text: "text-fuchsia-400",
        glow: "bg-fuchsia-500/5",
        border: "hover:border-violet-500/30",
      }
    default:
      return {
        bg: "from-indigo-600 to-violet-500",
        shadow: "shadow-indigo-500/10",
        text: "text-indigo-400",
        glow: "bg-indigo-500/5",
        border: "hover:border-indigo-500/30",
      }
  }
}

export function CourseCard({ course }: CourseCardProps) {
  const iconNameSafe = course.icon_name || "default"
  const Icon = ICON_MAP[iconNameSafe.toLowerCase() as keyof typeof ICON_MAP] || BookOpen
  const styles = getCardAccentStyles(iconNameSafe)
  const isCompleted = course.progress === 100

  // Format date helper
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr)
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    } catch {
      return "Recently"
    }
  }

  return (
    <motion.article
      whileHover={{
        y: -2,
      }}
      transition={{ 
        duration: 0.2
      }}
      className={cn(
        "relative flex flex-col h-full rounded-2xl overflow-hidden border border-white/5 bg-slate-900/40 backdrop-blur-md p-6 shadow-xl transition-all duration-300",
        styles.border
      )}
    >
      {/* Subtle premium SVG noise grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay bg-repeat rounded-2xl" 
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noiseFilter)'/></svg>")`
        }}
      />

      {/* Background glow decoration */}
      <div className={cn("absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300 blur-2xl opacity-40 group-hover:opacity-100", styles.glow)} />

      {/* Header section with Icon & Badge */}
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr shadow-lg shadow-black/30",
          styles.bg
        )}>
          <Icon className="h-6 w-6 text-white" />
        </div>

        {/* Course status */}
        <div className="flex items-center gap-1.5">
          {isCompleted ? (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="h-3 w-3" />
              <span>Completed</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-400 text-xs font-semibold">
              <Clock className="h-3 w-3 animate-pulse" />
              <span>Active</span>
            </span>
          )}
        </div>
      </div>

      {/* Main course info */}
      <div className="flex-1 relative z-10">
        <h3 className="text-lg font-bold text-white leading-snug tracking-tight mb-2 hover:text-indigo-300 transition-colors line-clamp-2">
          {course.title}
        </h3>
        <p className="text-xs text-slate-400 flex items-center gap-1.5 mb-6">
          <Clock className="h-3.5 w-3.5" />
          <span>Enrolled {formatDate(course.created_at)}</span>
        </p>
      </div>

      {/* Progress metrics */}
      <div className="mt-auto relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-400">Progress</span>
          <span className={cn("text-xs font-bold font-mono", styles.text)}>
            {course.progress}%
          </span>
        </div>

        {/* Customized gradient progress bar */}
        <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden border border-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={cn(
              "h-full rounded-full bg-gradient-to-r shadow-inner",
              styles.bg
            )}
          />
        </div>

        {/* Card Actions */}
        <div className="flex items-center justify-end mt-6 pt-4 border-t border-white/5">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs font-semibold text-white hover:text-violet-400 group/btn rounded-xl px-3 hover:bg-white/5"
          >
            <span>{isCompleted ? "Review Modules" : "Continue"}</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </div>
    </motion.article>
  )
}
