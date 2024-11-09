"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function DesktopMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex items-center justify-center gap-8 py-4">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm font-medium hover:text-red-600">
            Necklaces
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-4 gap-8 p-6 w-[800px]">
              <div className="col-span-3 grid grid-cols-3 gap-8">
                <div>
                  <h4 className="text-sm font-medium mb-4">By Style</h4>
                  <ul className="space-y-2">
                    <li><Link href="/necklaces/chokers" className="text-sm hover:text-red-600">Chokers</Link></li>
                    <li><Link href="/necklaces/layered" className="text-sm hover:text-red-600">Layered</Link></li>
                    <li><Link href="/necklaces/pendant" className="text-sm hover:text-red-600">Pendant</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-4">By Material</h4>
                  <ul className="space-y-2">
                    <li><Link href="/necklaces/gold" className="text-sm hover:text-red-600">Gold</Link></li>
                    <li><Link href="/necklaces/silver" className="text-sm hover:text-red-600">Silver</Link></li>
                    <li><Link href="/necklaces/platinum" className="text-sm hover:text-red-600">Platinum</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-4">Featured</h4>
                  <ul className="space-y-2">
                    <li><Link href="/necklaces/new" className="text-sm hover:text-red-600">New Arrivals</Link></li>
                    <li><Link href="/necklaces/bestsellers" className="text-sm hover:text-red-600">Bestsellers</Link></li>
                  </ul>
                </div>
              </div>
              <div className="relative h-full">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2787&auto=format&fit=crop"
                  alt="Featured Necklace"
                  className="rounded-lg object-cover h-full w-full"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <Button className="w-full bg-white/90 text-black hover:bg-white">Shop Now</Button>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Add similar NavigationMenuItem components for other menu items */}
        {/* For brevity, I'm showing just one example. The rest follow the same pattern */}
        
        <NavigationMenuItem>
          <Link href="/occasions" className="text-sm font-medium hover:text-red-600">
            Occasions
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/collection" className="text-sm font-medium hover:text-red-600">
            Collection
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/happy-customers" className="text-sm font-medium hover:text-red-600">
            Happy Customers
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/become-vendor" className="text-sm font-medium hover:text-red-600">
            Become Vendor
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}