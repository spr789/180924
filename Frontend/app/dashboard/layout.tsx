"use client"

import { useState } from "react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex h-[calc(100vh-64px)]">
        <DashboardNav isOpen={isSidebarOpen} />
        
        <main className={cn(
          "flex-1 overflow-y-auto p-6 transition-all duration-300",
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        )}>
          {children}
        </main>
      </div>
    </div>
  )
}