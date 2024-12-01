"use client"

import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronRight } from "lucide-react"

const menuItems = [
  {
    title: "Necklaces",
    submenu: {
      byStyle: ["Chokers", "Layered", "Pendant"],
      byMaterial: ["Gold", "Silver", "Platinum"],
      featured: ["New Arrivals", "Bestsellers"]
    }
  },
  {
    title: "Earrings",
    submenu: {
      byStyle: ["Studs", "Drops", "Hoops"],
      byMaterial: ["Gold", "Silver", "Diamond"],
      collections: ["Traditional", "Contemporary"]
    }
  },
  {
    title: "Bangles",
    submenu: {
      byStyle: ["Kada", "Bracelet", "Bangle Set"],
      byMaterial: ["Gold", "Silver", "Diamond"],
      collections: ["Bridal", "Daily Wear"]
    }
  },
  {
    title: "Accessories",
    submenu: {
      categories: ["Anklets", "Nose Pins", "Hair Accessories"],
      collections: ["Traditional", "Modern", "Fusion"],
      trending: ["New Arrivals", "Bestsellers"]
    }
  },
  {
    title: "92.5 Silver",
    submenu: {
      categories: ["Necklaces", "Earrings", "Rings"],
      collections: ["Oxidized", "Temple", "Contemporary"],
      featured: ["New Arrivals", "Bestsellers"]
    }
  },
  {
    title: "Wedding Store",
    submenu: {
      byOccasion: ["Engagement", "Wedding Day", "Reception"],
      byStyle: ["Traditional", "Contemporary", "Fusion"],
      collections: ["Bridal Sets", "Solitaires"]
    }
  }
]

const simpleLinks = [
  "Occasions",
  "Collection",
  "Happy Customers",
  "Become Vendor"
]

export function MobileMenu() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 bg-red-600">
        <Link href="/" className="text-2xl font-bold text-white">
          Kushals
        </Link>
      </div>

      <div className="p-4">
        <Accordion type="single" collapsible className="w-full">
          {menuItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-sm hover:text-red-600">
                {item.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pl-4">
                  {Object.entries(item.submenu).map(([category, items]) => (
                    <div key={category}>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <ul className="space-y-2">
                        {items.map((subItem) => (
                          <li key={subItem}>
                            <Link
                              href={`/${item.title.toLowerCase()}/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                              className="text-sm hover:text-red-600 flex items-center justify-between"
                            >
                              {subItem}
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-4 border-t pt-4">
          {simpleLinks.map((link) => (
            <Link
              key={link}
              href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center justify-between py-2 text-sm hover:text-red-600"
            >
              {link}
              <ChevronRight className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}