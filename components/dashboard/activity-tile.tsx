"use client"

import React from "react"
import { motion } from "framer-motion"
import { Calendar, CheckCircle2, Star, Zap } from "lucide-react"

const activityTimeline = [
  {
    id: 1,
    title: "Completed 'Advanced Hooks' in React Workshop",
    time: "2 hours ago",
    type: "milestone",
    icon: CheckCircle2,
    color: "text-cyan-400 bg-cyan-400/10",
  },
  {
    id: 2,
    title: "Earned 5-day continuous learning streak badge",
    time: "Yesterday",
    type: "badge",
    icon: Zap,
    color: "text-amber-400 bg-amber-400/10",
  },
  {
    id: 3,
    title: "Submitted Module 4 Case Study in UI/UX Design System",
    time: "2 days ago",
    type: "submission",
    icon: Star,
    color: "text-pink-400 bg-pink-400/10",
  },
]

const weeklyHours = [
  { day: "Mon", hours: 2.5, percent: "40%" },
  { day: "Tue", hours: 4.2, percent: "70%" },
  { day: "Wed", hours: 1.5, percent: "25%" },
  { day: "Thu", hours: 5.0, percent: "85%" },
  { day: "Fri", hours: 3.8, percent: "60%" },
  { day: "Sat", hours: 2.0, percent: "32%" },
  { day: "Sun", hours: 0, percent: "0%" },
]

export function ActivityTile() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
    >
      {/* Weekly learning chart panel - Spans 3 cols on desktop, 1 col on tablet/mobile */}
      <motion.div 
        whileHover={{ y: -4, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="col-span-1 md:col-span-1 lg:col-span-3 flex flex-col rounded-3xl border border-white/5 hover:border-violet-500/20 bg-slate-900/40 backdrop-blur-md p-6 shadow-xl relative overflow-hidden transition-colors duration-300 cursor-pointer"
      >
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-violet-600/5 blur-3xl pointer-events-none" />
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white leading-none mb-1">Study Hours</h3>
            <p className="text-xs text-slate-400">Your weekly study distribution</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-indigo-400 font-semibold bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            <Calendar className="h-3.5 w-3.5" />
            <span>This Week</span>
          </div>
        </div>

        {/* Customized pure CSS chart graph */}
        <div className="flex-1 flex items-end justify-between gap-2 pt-6 pb-2 min-h-[140px]">
          {weeklyHours.map((bar, i) => (
            <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
              {/* Tooltip bar on hover */}
              <div className="h-32 w-full flex items-end justify-center relative">
                {bar.hours > 0 && (
                  <div className="absolute -top-6 scale-0 group-hover:scale-100 transition-all duration-200 bg-slate-800 border border-white/10 text-[10px] text-white px-2 py-0.5 rounded font-bold pointer-events-none z-10">
                    {bar.hours}h
                  </div>
                )}
                
                {/* Visual bar container with dynamic gradient */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: bar.percent }}
                  transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                  className="w-full rounded-t-lg bg-gradient-to-t from-violet-600 to-indigo-500 shadow-lg shadow-indigo-500/10 group-hover:from-violet-500 group-hover:to-cyan-400 transition-all duration-300"
                />
              </div>
              <span className="text-xs font-medium text-slate-400">{bar.day}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Activity Timeline panel - Spans 2 cols on desktop, 1 col on tablet/mobile */}
      <motion.div 
        whileHover={{ y: -4, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col rounded-3xl border border-white/5 hover:border-indigo-500/20 bg-slate-900/40 backdrop-blur-md p-6 shadow-xl relative overflow-hidden transition-colors duration-300 cursor-pointer"
      >
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-indigo-600/5 blur-3xl pointer-events-none" />

        <div className="mb-6">
          <h3 className="text-lg font-bold text-white leading-none mb-1">Recent Activity</h3>
          <p className="text-xs text-slate-400">Your latest platform achievements</p>
        </div>

        {/* Timeline list */}
        <div className="flex-1 space-y-4">
          {activityTimeline.map((act) => {
            const ActiveIcon = act.icon
            return (
              <div key={act.id} className="flex gap-3 text-sm relative z-10 group cursor-pointer">
                {/* Icon wrapper with glow background */}
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/5 ${act.color} transition-transform group-hover:scale-110`}>
                  <ActiveIcon className="h-4 w-4" />
                </div>
                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 text-xs font-semibold leading-relaxed group-hover:text-white transition-colors">
                    {act.title}
                  </p>
                  <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                    {act.time}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>
    </motion.section>
  )
}
