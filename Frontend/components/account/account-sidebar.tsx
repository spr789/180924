import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Package,
  Clock,
  Heart,
  CreditCard,
  User,
  Settings,
  LogOut
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const menuItems = [
  {
    title: "Account Main",
    href: "/account",
    icon: User
  },
  {
    title: "New Orders",
    href: "/account/orders/new",
    icon: Package
  },
  {
    title: "Orders History",
    href: "/account/orders/history",
    icon: Clock
  },
  {
    title: "My Wishlist",
    href: "/account/wishlist",
    icon: Heart
  },
  {
    title: "Transactions",
    href: "/account/transactions",
    icon: CreditCard
  },
  {
    title: "Profile Settings",
    href: "/account/settings",
    icon: Settings
  }
]

export function AccountSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                pathname === item.href && "bg-gray-50 text-gray-900 font-medium"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.title}
            </Link>
          )
        })}
        <button
          onClick={() => logout()}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 w-full"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </nav>
    </div>
  )
}