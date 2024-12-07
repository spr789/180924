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
import { useProducts } from "@/lib/api/hooks/useProducts"
import { Product } from "@/lib/api/types/product"

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [showSort, setShowSort] = useState(false)
  const { products, isLoading } = useProducts()

  console.log('Fetched product:', products?.data?.items?.[0] || 'No product data available');
  console.log('Loading state:', isLoading); // Log the loading state
  console.log('Products data structure:', products);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!products?.data?.items?.length) {
    return <div>No products found.</div>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-24">
        <div className="container py-4">
          <h1 className="text-2xl font-bold mb-4">All Products</h1>
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {products.data.items.map((product: Product) => {
              console.log('Rendering product:', product);
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  brand={product.brand}
                  original_price={product.original_price}
                  discounted_price={product.discounted_price}
                  image={product.images[0] || ''}
                />
              );
            })}
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
                    console.log('Sort by:', value);
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
                <ProductFilters onClose={() => {
                  setShowFilters(false);
                  console.log('Filters closed');
                }} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
