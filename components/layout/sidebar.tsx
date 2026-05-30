"use client"
 
import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { 
  LayoutDashboard, 
  BookOpen, 
  Compass, 
  BarChart3, 
  Grid,
  Settings,
  User,
  GraduationCap
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface SidebarProps {
  isExpanded: boolean
  onToggle: () => void
}

const navItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "My Courses",
    href: "/courses",
    icon: BookOpen,
  },
  {
    name: "Explore",
    href: "/explore",
    icon: Compass,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Categories",
    href: "/categories",
    icon: Grid,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar({ isExpanded, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 hidden md:flex flex-col border-r border-white/5 bg-[#242637] z-30 transition-all duration-300 py-6",
        isExpanded ? "w-64 px-4" : "w-20 px-3 items-center"
      )}
    >
      {/* Brand Header / Logo Button */}
      <div 
        className={cn(
          "flex items-center mb-8 w-full cursor-pointer group",
          isExpanded ? "justify-start px-2" : "justify-center"
        )}
        onClick={onToggle}
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#7C6CF5] shadow-lg shadow-[#7C6CF5]/20 hover:scale-105 active:scale-95 transition-transform duration-200">
          <GraduationCap className="h-6 w-6 text-[#F4F5F7]" />
        </div>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-3 flex flex-col"
          >
            <span className="text-sm font-extrabold text-[#F4F5F7] tracking-tight group-hover:text-[#9B8DFF] transition-colors leading-none">
              Aether Academy
            </span>
            <span className="text-[9px] font-bold text-[#7C6CF5] uppercase tracking-wider mt-1 leading-none">
              Student Space
            </span>
          </motion.div>
        )}
      </div>

      {/* Navigation Icons & Labels */}
      <nav className="flex flex-col gap-2 w-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          
          const linkContent = (
            <div
              className={cn(
                "group flex h-12 items-center rounded-2xl transition-all duration-300 cursor-pointer relative",
                isExpanded ? "w-full px-4 gap-3.5" : "w-12 justify-center",
                isActive
                  ? "text-[#F4F5F7] bg-[#7C6CF5] shadow-lg shadow-[#7C6CF5]/10"
                  : "text-[#A6A8B8] hover:text-[#F4F5F7] hover:bg-[#2A2D40]"
              )}
            >
              {/* Active dynamic accent glow (in collapsed state only for design fidelity) */}
              {isActive && !isExpanded && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute -left-1.5 w-1 h-6 rounded-r-full bg-[#7C6CF5]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              <item.icon
                className={cn(
                  "h-5.5 w-5.5 transition-transform duration-300 group-hover:scale-105 shrink-0",
                  isActive ? "text-[#F4F5F7]" : "text-[#A6A8B8] group-hover:text-[#9B8DFF]"
                )}
              />

              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs font-semibold tracking-wide"
                >
                  {item.name}
                </motion.span>
              )}
            </div>
          )

          return (
            <div key={item.name} className="w-full">
              {isExpanded ? (
                // No tooltip is required when fully expanded
                <Link href={item.href} className="block w-full">
                  {linkContent}
                </Link>
              ) : (
                <Tooltip delayDuration={50}>
                  <TooltipTrigger asChild>
                    <Link href={item.href} className="block w-full">
                      {linkContent}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="font-medium border-white/5 bg-[#2A2D40] text-[#F4F5F7] shadow-xl">
                    {item.name}
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          )
        })}
      </nav>

      {/* User profile bubble / card at the very bottom */}
      <div className="mt-auto pt-4 border-t border-white/5 w-full flex justify-center">
        {isExpanded ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 px-2 py-1.5 w-full rounded-2xl hover:bg-[#2A2D40]/30 transition-colors duration-200"
          >
            <div className="relative h-10 w-10 shrink-0">
              <div className="h-full w-full overflow-hidden rounded-full border border-white/5 bg-[#2A2D40] flex items-center justify-center">
                <User className="h-5 w-5 text-[#9B8DFF]" />
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#242637] bg-emerald-500" />
            </div>
            
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-[#F4F5F7] truncate leading-none">
                Alex Mercer
              </span>
              <span className="text-[10px] text-[#77798A] mt-1 truncate leading-none">
                Independent Learner
              </span>
            </div>
          </motion.div>
        ) : (
          <Tooltip delayDuration={50}>
            <TooltipTrigger asChild>
              <div className="relative h-10 w-10 cursor-pointer hover:scale-105 transition-transform duration-200">
                <div className="h-full w-full overflow-hidden rounded-full border border-white/5 bg-[#2A2D40] flex items-center justify-center">
                  <User className="h-5 w-5 text-[#9B8DFF]" />
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#242637] bg-emerald-500" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-medium border-white/5 bg-[#2A2D40] text-[#F4F5F7] shadow-xl">
              Alex Mercer (Student Mode)
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </aside>
  )
}
