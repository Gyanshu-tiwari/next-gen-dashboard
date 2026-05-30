import type { Metadata } from "next"
import { Poppins, Geist_Mono } from "next/font/google"

import "./globals.css"

import { TooltipProvider } from "@/components/ui/tooltip"
import { DashboardShell } from "@/components/layout/dashboard-shell"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Aether Academy - Next Gen Student Dashboard",
  description: "A premium, futuristic student learning and activity tracker.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${poppins.variable} ${geistMono.variable} antialiased font-sans bg-background text-foreground`}
      >
        <TooltipProvider>
          <DashboardShell>
            {children}
          </DashboardShell>
        </TooltipProvider>
      </body>
    </html>
  )
}