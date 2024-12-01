"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Store,
  Settings,
} from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Vendors",
    href: "/dashboard/vendors",
    icon: Store,
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

interface DashboardNavProps {
  isOpen: boolean
}

export function DashboardNav({ isOpen }: DashboardNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn(
      "fixed left-0 h-full bg-white border-r transition-all duration-300",
      isOpen ? "w-64" : "w-0 md:w-16"
    )}>
      <div className="flex flex-col h-full">
        <div className="flex-1 py-6 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 mx-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  isActive && "bg-gray-50 text-gray-900 font-medium",
                  !isOpen && "md:justify-center md:px-0 md:mx-2"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className={cn(
                  "transition-opacity duration-300",
                  !isOpen && "md:hidden"
                )}>
                  {item.title}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}