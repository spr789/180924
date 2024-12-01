"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/products/product-card"
import { ProductSort } from "@/components/products/product-sort"
import { ProductFilters } from "@/components/products/product-filters"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal, ArrowUpDown } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// Mock products data
const products = [
  {
    id: "1",
    name: "Kundan Bangle 164140",
    material: "Gold Plated",
    price: 4480,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
  },
  {
    id: "2",
    name: "Kundan Bangle 167652",
    material: "Gold Plated",
    price: 3900,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908"
  },
  {
    id: "3",
    name: "Kundan Earring 151613",
    material: "Gold Plated",
    price: 3600,
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a"
  },
  {
    id: "4",
    name: "Kundan Earring 164028",
    material: "Gold Plated",
    price: 4200,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e"
  },
]

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [showSort, setShowSort] = useState(false)

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-24">
        <div className="container py-4">
          <h1 className="text-2xl font-bold mb-4">All Products</h1>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                material={product.material}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        </div>

        {/* Sticky Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t safe-bottom">
          <div className="grid grid-cols-2 gap-px bg-gray-200">
            <Sheet open={showSort} onOpenChange={setShowSort}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-14 rounded-none bg-white hover:bg-gray-50"
                >
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  Sort
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[96%]">
                <SheetHeader>
                  <SheetTitle>Sort Products</SheetTitle>
                </SheetHeader>
                <ProductSort
                  value={sortBy}
                  onValueChange={(value) => {
                    setSortBy(value)
                    setShowSort(false)
                  }}
                />
              </SheetContent>
            </Sheet>

            <Sheet open={showFilters} onOpenChange={setShowFilters}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-14 rounded-none bg-white hover:bg-gray-50"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[96%]">
                <SheetHeader>
                  <SheetTitle>Filter Products</SheetTitle>
                </SheetHeader>
                <ProductFilters onClose={() => setShowFilters(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}