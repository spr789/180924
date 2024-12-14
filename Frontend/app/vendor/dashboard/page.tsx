"use client"

import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { TopProducts } from "@/components/dashboard/top-products"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getToken } from "@/lib/api/services/auth"

export default function VendorDashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const token = getToken()
    if (!token) {
      router.push("/login")
    }
  }, [router])

  console.log("Is authenticated?", getToken() !== null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
        <QuickActions />
      </div>

      <DashboardOverview />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <TopProducts />
      </div>

      <RecentOrders />
    </div>
  )
}