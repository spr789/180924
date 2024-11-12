"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { VendorStats } from "@/components/vendor/vendor-stats"
import { VendorChart } from "@/components/vendor/vendor-chart"
import { VendorOrders } from "@/components/vendor/vendor-orders"
import { VendorProducts } from "@/components/vendor/vendor-products"
import { VendorHeader } from "@/components/vendor/vendor-header"

export default function VendorDashboardPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <VendorHeader />
        <div className="container py-8">
          <VendorStats />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <VendorChart />
            </div>
            <div>
              <VendorProducts />
            </div>
          </div>
          <div className="mt-8">
            <VendorOrders />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}