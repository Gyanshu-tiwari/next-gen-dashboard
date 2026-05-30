"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Sidebar } from "./sidebar"
import { MobileNav } from "./mobile-nav"
import { 
  Search, 
  Bell, 
  Sparkles,
  LayoutDashboard,
  BookOpen,
  Compass,
  Settings
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DashboardShellProps {
  children: React.ReactNode
}

const mobileNavItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Explore", href: "/explore", icon: Compass },
  { name: "Categories", href: "/categories", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname()
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true)

  return (
    <div className="relative min-h-screen bg-[#1E2030] text-[#F4F5F7] overflow-x-hidden font-sans">
      {/* Background decoration - very subtle soft purple light glow */}
      <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-[#7C6CF5]/3 blur-[120px] pointer-events-none z-0 animate-pulse" />
      <div className="absolute bottom-10 left-20 h-[500px] w-[500px] rounded-full bg-[#9B8DFF]/2 blur-[150px] pointer-events-none z-0" />

      {/* Sidebar - Desktop & Tablet */}
      <Sidebar isExpanded={isSidebarExpanded} onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)} />

      {/* Main Content Area */}
      <div className={cn(
        "flex flex-col min-h-screen relative z-10 transition-all duration-300",
        isSidebarExpanded ? "md:pl-64" : "md:pl-20"
      )}>
        {/* Sticky Header */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/5 bg-[#1E2030]/80 backdrop-blur-md px-4 md:px-8">
          <div className="flex items-center gap-4 flex-1">
            {/* Hamburger Trigger for Mobile */}
            <MobileNav />

            {/* Folder / Team Workspace Selector (similar to the reference image) */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/5 bg-[#2A2D40] text-xs font-semibold text-[#F4F5F7] cursor-pointer hover:border-[#7C6CF5]/30 hover:bg-[#2A2D40]/80 transition-all duration-200">
              <span className="inline-block h-2 w-2 rounded-full bg-[#7C6CF5] animate-ping" />
              <span>Web Development 2026</span>
              <span className="text-[#77798A] text-[10px] ml-1">▼</span>
            </div>

            {/* Global Search Bar (Desktop/Tablet) */}
            <div className="hidden md:flex max-w-sm w-full relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A6A8B8]" />
              <input
                type="text"
                placeholder="Search courses, roadmap and groups..."
                className="w-full h-9.5 rounded-xl bg-[#2A2D40]/60 border border-white/5 pl-10 pr-4 text-xs text-[#F4F5F7] placeholder-[#77798A] focus:outline-none focus:ring-1 focus:ring-[#7C6CF5] focus:border-[#7C6CF5] focus:bg-[#2A2D40] transition-all duration-200"
              />
            </div>
          </div>

          {/* Action Area */}
          <div className="flex items-center gap-3">
            {/* Streak Counter */}
            <div className="hidden xs:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#7C6CF5]/10 bg-[#7C6CF5]/5 text-[#9B8DFF] text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-[#7C6CF5] fill-[#7C6CF5]/20 animate-pulse" />
              <span>5 Day Study Streak</span>
            </div>

            {/* Notification Indicator */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-[#A6A8B8] hover:text-[#F4F5F7] hover:bg-[#2A2D40] rounded-xl transition-colors"
            >
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-[#7C6CF5] ring-2 ring-[#1E2030]" />
              <span className="sr-only">Notifications</span>
            </Button>

            {/* Quick upgrade button (header version) */}
            <Button 
              size="sm" 
              className="hidden lg:flex bg-[#7C6CF5] text-[#F4F5F7] hover:bg-[#9B8DFF] border-none font-semibold rounded-xl text-xs px-4 py-1.5 transition-colors shadow-md shadow-[#7C6CF5]/15"
            >
              Pro Workspace
            </Button>
          </div>
        </header>

        {/* Dynamic Page content */}
        <main className="flex-1 p-4 md:p-8 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (< 768px) */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 border-t border-white/10 bg-slate-950/80 backdrop-blur-lg flex items-center justify-around px-6 md:hidden z-30 pb-safe">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href} className="flex flex-col items-center justify-center flex-1 py-1">
              <div className="relative">
                <item.icon
                  className={cn(
                    "h-5 w-5 transition-transform duration-200",
                    isActive ? "text-violet-400 scale-110" : "text-slate-400"
                  )}
                />
                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-violet-400" />
                )}
              </div>
              <span className={cn(
                "text-[10px] mt-1.5 font-medium tracking-wide transition-colors",
                isActive ? "text-violet-400 font-semibold" : "text-slate-500"
              )}>
                {item.name}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
