"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  Settings, 
  User, 
  GraduationCap, 
  Compass,
  Bell,
  Menu
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

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
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
    badge: 3,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-slate-300 hover:text-white hover:bg-white/5 rounded-xl"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="w-[280px] bg-slate-950/95 border-r border-white/10 text-white p-0 flex flex-col backdrop-blur-2xl"
        showCloseButton={true}
      >
        <SheetHeader className="p-6 border-b border-white/5 flex flex-row items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 shadow-lg shadow-indigo-500/30">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div className="text-left">
            <SheetTitle className="text-sm font-bold bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              AETHER
            </SheetTitle>
            <span className="text-xs block text-indigo-400 font-mono tracking-widest leading-none">
              ACADEMY
            </span>
          </div>
        </SheetHeader>

        <nav className="flex-1 space-y-1 px-4 py-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setOpen(false)}
                className="block"
              >
                <span
                  className={cn(
                    "group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 cursor-pointer border relative",
                    isActive
                      ? "text-white bg-white/5 border-white/10"
                      : "text-slate-400 hover:text-white hover:bg-white/5 border-transparent"
                  )}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-md bg-gradient-to-b from-violet-500 to-indigo-500" />
                  )}

                  <div className="flex items-center gap-3">
                    <item.icon
                      className={cn(
                        "h-5 w-5",
                        isActive ? "text-violet-400" : "text-slate-400"
                      )}
                    />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-600/20 text-[10px] font-bold text-violet-400 border border-violet-500/20">
                      {item.badge}
                    </span>
                  )}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Mobile footer user context */}
        <div className="border-t border-white/5 p-4 bg-slate-950/40 mt-auto">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/10 bg-slate-800 flex items-center justify-center">
              <User className="h-5 w-5 text-indigo-400" />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-emerald-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Alex Mercer</p>
              <p className="text-xs text-slate-400 truncate">Beta student</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
