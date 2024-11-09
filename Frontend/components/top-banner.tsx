"use client"

import { MapPin } from "lucide-react"
import Link from "next/link"

export function TopBanner() {
  return (
    <div className="bg-red-600 text-white py-2 px-4">
      <div className="container mx-auto flex justify-between items-center text-sm">
        <div className="text-center flex-1">
          Free Shipping Anywhere in India for orders above Rs.499
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <Link href="/stores" className="hover:underline">
            Locate Stores
          </Link>
        </div>
      </div>
    </div>
  )
}