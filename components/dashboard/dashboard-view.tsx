"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Settings, 
  Menu, 
  Clock, 
  BookOpen, 
  ArrowRight, 
  Code, 
  Palette, 
  Database, 
  Brain, 
  Calendar,
  Plus,
  Play,
  Pause,
  RotateCcw,
  Check,
  AlertCircle,
  Lightbulb,
  Trophy
} from "lucide-react"
import { Course } from "@/types/course"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DashboardViewProps {
  initialCourses: Course[]
  isError?: boolean
}

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

const getCourseBadgeColor = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case "react":
    case "code":
      return "bg-[#7C6CF5]/10 text-[#9B8DFF] border-[#7C6CF5]/20"
    case "design":
    case "ui":
      return "bg-rose-500/10 text-rose-400 border-rose-500/20"
    case "data":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    case "ai":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20"
    default:
      return "bg-[#7C6CF5]/10 text-[#9B8DFF] border-[#7C6CF5]/20"
  }
}

export function DashboardView({ initialCourses, isError = false }: DashboardViewProps) {
  const router = useRouter()
  // Course list state
  const [coursesState] = useState<Course[]>(initialCourses)
  const [hasError, setHasError] = useState(isError)

  // Derive display state from real data — no simulation
  const visualState: 'success' | 'empty' | 'error' = hasError
    ? 'error'
    : coursesState.length === 0
    ? 'empty'
    : 'success'

  const [activeTab, setActiveTab] = useState<"study" | "goals">("study")

  // ================= FULLY FUNCTIONAL ROADMAP STATE =================
  const [roadmapTasks, setRoadmapTasks] = useState([
    { id: "t1", time: "10:30", completed: false, title: "React Architecture Sandbox", duration: "1.5h", category: "Workshop", color: "border-[#7C6CF5]/30 bg-[#2A2D40]" },
    { id: "t2", time: "12:00", completed: false, title: "PostgreSQL Advanced Queries", duration: "1h", category: "Database Lab", color: "border-emerald-500/20 bg-[#2A2D40]/80" },
  ])

  // New Roadmap Task form states
  const [showAddTask, setShowAddTask] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskTime, setNewTaskTime] = useState("14:30")
  const [newTaskDuration, setNewTaskDuration] = useState("1h")
  const [newTaskCategory, setNewTaskCategory] = useState("Workshop")

  // ================= POMODORO TIMER STATE =================
  const [timerSeconds, setTimerSeconds] = useState(1500) // 25 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [focusStreak, setFocusStreak] = useState(2)
  const [showCompletionBanner, setShowCompletionBanner] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const handleTimerComplete = useCallback(() => {
    setIsTimerRunning(false)
    setTimerSeconds(1500)
    setFocusStreak(prev => prev + 1)
    setShowCompletionBanner(true)
    setTimeout(() => setShowCompletionBanner(false), 4000)
  }, [])

  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!)
            handleTimerComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isTimerRunning, handleTimerComplete])

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Handle roadmap task toggle check
  const handleToggleTask = (taskId: string) => {
    setRoadmapTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  // Handle adding custom roadmap task
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    const cardStyles = newTaskCategory === "Workshop" 
      ? "border-[#7C6CF5]/30 bg-[#2A2D40]"
      : "border-emerald-500/20 bg-[#2A2D40]/80"

    const newTask = {
      id: "t_" + Date.now(),
      time: newTaskTime,
      completed: false,
      title: newTaskTitle.trim(),
      duration: newTaskDuration,
      category: newTaskCategory,
      color: cardStyles
    }

    setRoadmapTasks(prev => {
      // Sort tasks by time string (e.g. 10:30, 12:00, 14:30)
      const updated = [...prev, newTask]
      return updated.sort((a, b) => a.time.localeCompare(b.time))
    })

    setNewTaskTitle("")
    setShowAddTask(false)
  }

  // Handle Coach recommendation action (adds a practice task)
  const handleAddCoachTask = () => {
    const aiTask = {
      id: "ai_" + Date.now(),
      time: "15:00",
      completed: false,
      title: "AI Focus: PostgreSQL Index Optimization Lab",
      duration: "45m",
      category: "Practice",
      color: "border-amber-500/20 bg-[#2A2D40]"
    }
    setRoadmapTasks(prev => {
      const updated = [...prev, aiTask]
      return updated.sort((a, b) => a.time.localeCompare(b.time))
    })
    alert("🚀 Added 'AI Focus: PostgreSQL Index Optimization Lab' directly to your roadmap timeline!")
  }

  // Calculate statistics from courses
  const averageProgress = coursesState.length > 0
    ? Math.round(coursesState.reduce((acc, c) => acc + c.progress, 0) / coursesState.length)
    : 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* LEFT COLUMN & ROADMAP SECTION (Spans 8 columns) */}
      <div className="lg:col-span-8 flex flex-col space-y-8">
        
        {/* ================= ONGOING COURSES (LEFT PANEL) ================= */}
        <div className="flex flex-col space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#7C6CF5] uppercase tracking-wider">
              Recent Curriculum
            </span>
            <h2 className="text-2xl font-semibold text-[#F4F5F7] tracking-tight">
              Ongoing Courses
            </h2>
            <p className="text-xs text-[#77798A]">Last active: Just now</p>
          </div>

          {/* AI COACH INTEGRATION CARD (Replaces Pro Purchase Card) */}
          <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-[#2A2D40] p-6 shadow-lg flex flex-col justify-between min-h-[170px] group">
            {/* Soft backdrop radial glows */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-300" />
            
            {/* Premium custom SVG AI brain icon animation */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 h-28 w-28 pointer-events-none drop-shadow-[0_0_15px_rgba(245,158,11,0.15)]">
              <svg viewBox="0 0 100 100" className="h-full w-full animate-pulse" style={{ animationDuration: "2.5s" }}>
                <defs>
                  <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#7C6CF5" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="30" fill="none" stroke="url(#aiGrad)" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="18" fill="none" stroke="url(#aiGrad)" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M50 20 L50 80 M20 50 L80 50" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <circle cx="50" cy="50" r="6" fill="#F59E0B" />
                <circle cx="50" cy="20" r="3" fill="#7C6CF5" />
                <circle cx="50" cy="80" r="3" fill="#7C6CF5" />
                <circle cx="20" cy="50" r="3" fill="#7C6CF5" />
                <circle cx="80" cy="50" r="3" fill="#7C6CF5" />
              </svg>
            </div>

            <div className="space-y-1.5 relative z-10 max-w-[65%]">
              <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/15">
                <Lightbulb className="h-3 w-3 text-amber-400" />
                <span>AI Coach Guide</span>
              </span>
              <h3 className="text-sm font-semibold text-[#F4F5F7] leading-snug mt-2">
                We recommend starting PostgreSQL Index Optimization practice today to push progress to 60%!
              </h3>
            </div>

            <div className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-fit"
              >
                <Button 
                  onClick={handleAddCoachTask}
                  size="sm" 
                  className="bg-[#7C6CF5] text-[#F4F5F7] hover:bg-[#9B8DFF] border-none font-semibold rounded-xl text-xs px-4 py-1.5 transition-all shadow-md shadow-[#7C6CF5]/10"
                >
                  Consult AI Coach
                </Button>
              </motion.div>
            </div>
          </div>

          {/* DYNAMIC RENDERING OF SUCCESS / EMPTY / ERROR UI STATES */}
          <div className="min-h-[220px]">
            <AnimatePresence mode="wait">
              {visualState === 'success' && (
                <motion.div 
                  key="courses-success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  {coursesState.map((course) => {
                    const iconNameSafe = course.icon_name || "default"
                    const Icon = ICON_MAP[iconNameSafe.toLowerCase() as keyof typeof ICON_MAP] || BookOpen
                    const badgeStyle = getCourseBadgeColor(iconNameSafe)

                    return (
                      <motion.div 
                        key={course.id}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-[#2A2D40] hover:border-[#7C6CF5]/20 hover:shadow-lg hover:shadow-black/10 transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#242637] border border-white/5 text-[#7C6CF5] shadow-inner">
                            <Icon className="h-5.5 w-5.5 text-[#7C6CF5]" />
                          </div>

                          <div className="flex-1 min-w-0 pr-4">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-xs font-semibold text-[#F4F5F7] truncate leading-none font-sans">
                                {course.title}
                              </h4>
                              <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full border font-mono", badgeStyle)}>
                                {iconNameSafe.toUpperCase()}
                              </span>
                            </div>
                            
                            {/* Interactive Dot-slider Progress Bar */}
                            <div className="relative w-full h-1 bg-[#1E2030] rounded-full mt-3">
                              <div 
                                className="absolute top-0 left-0 h-full bg-[#7C6CF5] rounded-full" 
                                style={{ width: `${course.progress}%` }} 
                              />
                              <div 
                                className="absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-[#F4F5F7] border-2 border-[#7C6CF5] shadow-md shadow-[#7C6CF5]/20" 
                                style={{ left: `calc(${course.progress}% - 5px)` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* NO COLLABORATIVE BUDDY AVATARS HERE */}
                        <div className="flex items-center gap-4 shrink-0 pr-1">
                          <div className="text-right shrink-0">
                            <span className="text-xs font-mono font-bold text-[#F4F5F7] block">
                              {course.progress}%
                            </span>
                            <span className="text-[9px] font-semibold text-[#77798A] uppercase tracking-wider block mt-0.5">
                              Progress
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}

              {visualState === 'empty' && (
                <motion.div 
                  key="courses-empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center justify-center p-8 rounded-3xl border border-dashed border-white/5 bg-[#2A2D40]/30 text-center min-h-[220px]"
                >
                  <BookOpen className="h-10 w-10 text-[#77798A] mb-3 animate-pulse" />
                  <h4 className="text-sm font-bold text-[#F4F5F7]">No courses enrolled yet.</h4>
                  <p className="text-xs text-[#77798A] mt-2 max-w-xs leading-relaxed">
                    Enroll in advanced full-stack or designer tracks to kickstart your customized learning dashboard roadmap.
                  </p>
                  
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      onClick={() => router.push('/explore')}
                      className="mt-5 bg-[#7C6CF5] text-xs font-semibold rounded-xl px-5 hover:bg-[#9B8DFF] border-none"
                    >
                      Browse Catalog
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {visualState === 'error' && (
                <motion.div 
                  key="courses-error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center justify-center p-8 rounded-3xl border border-rose-500/10 bg-rose-500/5 text-center min-h-[220px] gap-4"
                >
                  <div className="h-10 w-10 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20 text-rose-400">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-[#F4F5F7]">Unable to load learning data.</h4>
                    <p className="text-[11px] text-[#77798A] max-w-xs leading-relaxed">
                      Please check your network setup or database connection and try re-compiling again.
                    </p>
                  </div>

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      onClick={() => {
                        setHasError(false)
                        router.refresh()
                      }}
                      className="bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl text-xs px-5 py-2 shadow-md shadow-rose-500/10"
                    >
                      [Retry]
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ================= ROADMAP SCHEDULE (FULLY INTERACTIVE & FUNCTIONAL) ================= */}
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold text-[#F4F5F7] tracking-tight">
                  Roadmap
                </h2>
                {/* Roadmap progress indicator */}
                <span className="text-[10px] font-bold bg-[#7C6CF5]/10 text-[#9B8DFF] px-2 py-0.5 rounded-full border border-[#7C6CF5]/15">
                  {roadmapTasks.filter(t => t.completed).length} / {roadmapTasks.length} Completed
                </span>
              </div>
              <p className="text-xs text-[#77798A]">Today, May 30</p>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Dynamic Task Appender Trigger */}
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAddTask(prev => !prev)}
                className="flex items-center gap-1.5 text-xs text-[#F4F5F7] bg-[#7C6CF5] hover:bg-[#9B8DFF] px-3.5 py-2 rounded-xl font-bold cursor-pointer transition-colors shadow-md shadow-[#7C6CF5]/10"
              >
                <Plus className="h-4 w-4" />
                <span>Add Milestone</span>
              </motion.button>
            </div>
          </div>

          {/* Inline Form to Add New Task */}
          <AnimatePresence>
            {showAddTask && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleAddTask}
                className="p-5 rounded-2xl border border-white/5 bg-[#242637]/60 space-y-4 overflow-hidden relative z-10"
              >
                <h4 className="text-xs font-bold text-[#F4F5F7] uppercase tracking-wider mb-2">New Learning Goal</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-[#A6A8B8] uppercase">Task Title</label>
                    <input 
                      type="text" 
                      value={newTaskTitle}
                      onChange={e => setNewTaskTitle(e.target.value)}
                      placeholder="e.g. Flexbox Masterclass"
                      required
                      className="h-9 rounded-xl bg-[#1E2030] border border-white/5 px-3 text-xs text-[#F4F5F7] placeholder-[#77798A] focus:outline-none focus:ring-1 focus:ring-[#7C6CF5]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-[#A6A8B8] uppercase">Time</label>
                      <input 
                        type="text" 
                        value={newTaskTime}
                        onChange={e => setNewTaskTime(e.target.value)}
                        placeholder="e.g. 14:30"
                        className="h-9 rounded-xl bg-[#1E2030] border border-white/5 px-2 text-center text-xs text-[#F4F5F7] focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-[#A6A8B8] uppercase">Duration</label>
                      <input 
                        type="text" 
                        value={newTaskDuration}
                        onChange={e => setNewTaskDuration(e.target.value)}
                        placeholder="e.g. 1.5h"
                        className="h-9 rounded-xl bg-[#1E2030] border border-white/5 px-2 text-center text-xs text-[#F4F5F7] focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-[#A6A8B8] uppercase">Category</label>
                      <select 
                        value={newTaskCategory}
                        onChange={e => setNewTaskCategory(e.target.value)}
                        className="h-9 rounded-xl bg-[#1E2030] border border-white/5 px-1.5 text-xs text-[#F4F5F7] focus:outline-none"
                      >
                        <option value="Workshop">Workshop</option>
                        <option value="Lab">Lab</option>
                        <option value="Practice">Practice</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowAddTask(false)}
                    className="text-xs text-[#A6A8B8] hover:bg-white/5 rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    size="sm"
                    className="bg-[#7C6CF5] hover:bg-[#9B8DFF] text-white text-xs rounded-xl px-4"
                  >
                    Save Goal
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* ROADMAP TIMELINE CONTAINER */}
          <div className="relative border-l border-white/5 ml-3 pl-6 space-y-6 py-2">
            
            {/* TIMELINE ITEMS RENDERING */}
            <div className="space-y-6">
              {roadmapTasks.map((task) => (
                <div key={task.id} className="relative flex flex-col group">
                  {/* Timeline bullet check button */}
                  <div 
                    onClick={() => handleToggleTask(task.id)}
                    className={cn(
                      "absolute -left-[32px] top-0.5 h-3.5 w-3.5 rounded-full border-2 cursor-pointer flex items-center justify-center transition-all z-10",
                      task.completed 
                        ? "bg-emerald-500 border-emerald-500 shadow-[0_0_8px_#10B981]" 
                        : "bg-[#1E2030] border-[#7C6CF5]/50 hover:bg-[#7C6CF5]/20"
                    )}
                  >
                    {task.completed && <Check className="h-2 w-2 text-[#1E2030] stroke-[4]" />}
                  </div>

                  {/* Time slot indicator */}
                  <span className={cn(
                    "text-xs font-mono font-medium tracking-tight mb-2 block transition-colors duration-300",
                    task.completed ? "text-emerald-500 font-semibold" : "text-[#77798A]"
                  )}>
                    {task.time} {task.completed && "✓ Completed"}
                  </span>

                  {/* Task Card (Complete with visual checklist transitions) */}
                  <motion.div 
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "rounded-2xl border p-4 shadow-sm relative overflow-hidden transition-all duration-300",
                      task.completed 
                        ? "border-emerald-500/20 bg-emerald-500/[0.02]" 
                        : task.color
                    )}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={cn(
                        "text-[9px] font-bold px-2 py-0.5 rounded-full border transition-colors",
                        task.completed
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : task.category === "Workshop"
                            ? "bg-[#7C6CF5]/10 text-[#9B8DFF] border-[#7C6CF5]/20"
                            : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      )}>
                        {task.category}
                      </span>
                      
                      <div className="flex items-center gap-1 text-[10px] text-[#A6A8B8]">
                        <Clock className="h-3 w-3 text-[#7C6CF5]" />
                        <span>{task.duration}</span>
                      </div>
                    </div>

                    <h4 className={cn(
                      "text-xs font-semibold tracking-wide transition-all duration-300",
                      task.completed ? "text-[#77798A] line-through decoration-2" : "text-[#F4F5F7]"
                    )}>
                      {task.title}
                    </h4>

                    {/* ACTIONS CONTAINER (NO BUDDIES COLLABORATION) */}
                    <div className="flex items-center justify-end pt-3 border-t border-white/5 mt-4">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          onClick={() => handleToggleTask(task.id)}
                          variant="ghost" 
                          size="sm" 
                          className={cn(
                            "text-[10px] h-6 px-2.5 rounded-lg font-semibold flex items-center gap-1 hover:bg-white/5",
                            task.completed ? "text-emerald-400" : "text-[#F4F5F7] hover:text-[#7C6CF5]"
                          )}
                        >
                          {task.completed ? (
                            <>
                              <span>Unlock Goal</span>
                            </>
                          ) : (
                            <>
                              <span>Enter sandbox</span>
                              <ArrowRight className="h-3 w-3" />
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Glowing active timeline line indicator */}
            <div className="absolute left-0 top-[20%] h-[150px] w-[2px] bg-gradient-to-b from-[#7C6CF5] to-transparent pointer-events-none" />
          </div>
        </div>

      </div>

      {/* ================= RIGHT SIDEBAR PANEL (Spans 4 columns) ================= */}
      <div className="lg:col-span-4 flex flex-col space-y-8 border-l border-white/5 lg:pl-8">
        
        {/* TOP SYSTEM SETTINGS AND CONFIG TRIPPERS */}
        <div className="flex items-center justify-end gap-3 text-[#A6A8B8]">
          <div className="p-2 bg-[#2A2D40] hover:bg-[#2A2D40]/80 rounded-xl border border-white/5 cursor-pointer transition-colors hover:text-[#F4F5F7]">
            <Settings className="h-4.5 w-4.5" />
          </div>
          <div className="p-2 bg-[#2A2D40] hover:bg-[#2A2D40]/80 rounded-xl border border-white/5 cursor-pointer transition-colors hover:text-[#F4F5F7]">
            <Menu className="h-4.5 w-4.5" />
          </div>
        </div>

        {/* 1. CURRICULUM OVERALL STATUS PROGRESS GAUGE (PREMIUM WIDGET) */}
        <motion.div
          whileHover={{ y: -2, scale: 1.01 }}
          className="flex flex-col items-center justify-center p-6 rounded-3xl border border-white/5 bg-[#2A2D40]/40 shadow-xl relative overflow-hidden min-h-[220px] transition-colors"
        >
          <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-[#7C6CF5]/3 blur-2xl pointer-events-none" />
          
          <div className="relative h-32 w-32 flex items-center justify-center">
            {/* Outer Circular Ring glows */}
            <div className="absolute inset-0 rounded-full bg-indigo-500/5 blur-xl animate-pulse" />
            
            {/* SVG circle track */}
            <svg className="h-full w-full -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="52"
                className="stroke-slate-950/60 fill-none"
                strokeWidth="8"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="52"
                className="stroke-[#7C6CF5] fill-none"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 52}
                initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - averageProgress / 100) }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black text-[#F4F5F7] leading-none font-mono">
                {averageProgress}%
              </span>
              <span className="text-[9px] text-[#77798A] font-bold uppercase tracking-widest mt-1">
                Avg Progress
              </span>
            </div>
          </div>
          <p className="mt-4 text-[10px] font-bold text-[#A6A8B8] text-center flex items-center gap-1.5 uppercase tracking-wider">
            <BookOpen className="h-3.5 w-3.5 text-[#7C6CF5]" />
            <span>Overall Curriculum Mastery</span>
          </p>
        </motion.div>

        {/* 2. STUDY TIME WEEKLY DISTRIBUTION BAR CHART (PREMIUM WIDGET) */}
        <motion.div 
          whileHover={{ y: -2, scale: 1.01 }}
          className="flex flex-col rounded-3xl border border-white/5 bg-[#2A2D40]/40 p-6 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-[#7C6CF5]/3 blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-xs font-bold text-[#F4F5F7] uppercase tracking-wider leading-none mb-1">Study Hours</h3>
              <p className="text-[10px] text-[#77798A]">Last 7 days breakdown</p>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-[#9B8DFF] font-bold bg-[#7C6CF5]/10 px-2.5 py-1 rounded-lg border border-[#7C6CF5]/15 uppercase tracking-wider">
              <Calendar className="h-3 w-3 text-[#7C6CF5]" />
              <span>Weekly</span>
            </div>
          </div>

          {/* Premium customized pure CSS bar chart with responsive triggers */}
          <div className="flex items-end justify-between gap-1.5 pt-6 pb-2 min-h-[120px]">
            {[
              { id: "mon", day: "M", hours: 2.5, percent: "40%" },
              { id: "tue", day: "T", hours: 4.2, percent: "70%" },
              { id: "wed", day: "W", hours: 1.5, percent: "25%" },
              { id: "thu", day: "T", hours: 5.0, percent: "85%" },
              { id: "fri", day: "F", hours: 3.8, percent: "60%" },
              { id: "sat", day: "S", hours: 2.0, percent: "32%" },
              { id: "sun", day: "S", hours: 0, percent: "0%" },
            ].map((bar, i) => (
              <div key={bar.id} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="h-24 w-full flex items-end justify-center relative">
                  {bar.hours > 0 && (
                    <div className="absolute -top-6 scale-0 group-hover:scale-100 transition-all duration-200 bg-slate-800 border border-white/10 text-[9px] text-white px-1.5 py-0.5 rounded font-bold pointer-events-none z-10 font-mono shadow-md">
                      {bar.hours}h
                    </div>
                  )}
                  
                  {/* Glowing bars */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: bar.percent }}
                    transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                    className="w-full rounded-t-md bg-[#7C6CF5]/60 hover:bg-[#7C6CF5] group-hover:shadow-[0_0_8px_#7C6CF5] transition-all duration-200"
                  />
                </div>
                <span className="text-[10px] font-bold text-[#77798A]">{bar.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 3. INTERACTIVE FOCUS POMODORO TIMER (PREMIUM WIDGET) */}
        <motion.div 
          whileHover={{ y: -2, scale: 1.01 }}
          className="flex flex-col rounded-3xl border border-white/5 bg-[#2A2D40]/40 p-6 shadow-xl relative overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-amber-500/5 blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-[#F4F5F7] uppercase tracking-wider leading-none">Focus Session</h3>
            <span className="text-[9px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/15">
              Streak: {focusStreak}
            </span>
          </div>

          <div className="flex flex-col items-center py-3">
            {/* Completion banner */}
            <AnimatePresence>
              {showCompletionBanner && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  className="w-full mb-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold"
                >
                  <Trophy className="h-3.5 w-3.5 shrink-0" />
                  <span>Session complete! Streak updated.</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Clock display */}
            <span className="text-3xl font-black text-white font-mono tracking-wider mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]">
              {formatTimer(timerSeconds)}
            </span>
            
            {/* Timer visual waves active indicators */}
            <div className="h-4 flex items-center gap-1.5 mb-6">
              {isTimerRunning ? (
                [...Array(6)].map((_, i) => (
                  <motion.span 
                    key={i} 
                    animate={{ height: [4, 14, 4] }}
                    transition={{ duration: 0.5 + i * 0.1, repeat: Infinity, ease: "easeInOut" }}
                    className="w-0.5 bg-[#7C6CF5] rounded-full inline-block"
                  />
                ))
              ) : (
                <span className="text-[9px] font-bold text-[#77798A] uppercase tracking-widest">Ready</span>
              )}
            </div>

            {/* Controller row */}
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={() => setIsTimerRunning(prev => !prev)}
                  size="sm" 
                  className={cn(
                    "rounded-xl text-xs px-4 font-semibold flex items-center gap-1.5 border-none",
                    isTimerRunning ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-[#7C6CF5] hover:bg-[#9B8DFF] text-white"
                  )}
                >
                  {isTimerRunning ? (
                    <>
                      <Pause className="h-3.5 w-3.5 fill-white" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5 fill-white" />
                      <span>Focus</span>
                    </>
                  )}
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={() => {
                    setIsTimerRunning(false)
                    setTimerSeconds(1500)
                  }}
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-xl bg-white/5 hover:bg-white/10 text-[#A6A8B8]"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* PILLS TABS SWITCHER */}
        <div className="flex bg-[#242637] p-1 rounded-xl border border-white/5">
          <button 
            onClick={() => setActiveTab("study")}
            className={cn(
              "flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-300",
              activeTab === "study"
                ? "bg-[#7C6CF5] text-[#F4F5F7] shadow-sm shadow-[#7C6CF5]/10"
                : "text-[#A6A8B8] hover:text-[#F4F5F7]"
            )}
          >
            Study Plan
          </button>
          <button 
            onClick={() => setActiveTab("goals")}
            className={cn(
              "flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-300",
              activeTab === "goals"
                ? "bg-[#7C6CF5] text-[#F4F5F7] shadow-sm"
                : "text-[#A6A8B8] hover:text-[#F4F5F7]"
            )}
          >
            Personal Goals
          </button>
        </div>

        {/* ACTIVE TAB METRICS BOX */}
        <div className="p-4 bg-[#2A2D40] rounded-2xl border border-white/5 text-xs text-[#A6A8B8] space-y-2">
          {activeTab === "study" ? (
            <>
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="font-semibold text-[#F4F5F7]">This Week&apos;s Goal</span>
                <span className="text-emerald-400 font-mono font-bold">12 / 15 hrs</span>
              </div>
              <p className="text-[11px] text-[#77798A] leading-relaxed pt-1">
                You are on track! Complete today&apos;s focus sessions and index tasks to hit 90% of your weekly quota.
              </p>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="font-semibold text-[#F4F5F7]">Syllabus Milestones</span>
                <span className="text-[#9B8DFF] font-mono font-bold">4 / 6 Done</span>
              </div>
              <p className="text-[11px] text-[#77798A] leading-relaxed pt-1">
                Complete Next.js Performance Optimization by Friday to unlock your Next-Gen Graduation certificate badge.
              </p>
            </>
          )}
        </div>

      </div>
    </div>
  )
}
