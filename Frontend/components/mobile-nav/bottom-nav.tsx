"use client"

import Link from "next/link"
import { Home, Search, Heart, ShoppingCart, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home
    },
    {
      label: "Search",
      href: "/search",
      icon: Search
    },
    {
      label: "Wishlist",
      href: "/wishlist",
      icon: Heart
    },
    {
      label: "Cart",
      href: "/cart",
      icon: ShoppingCart
    },
    {
      label: "Account",
      href: "/account",
      icon: User
    }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t lg:hidden safe-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center py-2 px-3 text-xs",
                isActive ? "text-red-600" : "text-gray-600"
              )}
            >
              <Icon className="h-6 w-6 mb-1" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}