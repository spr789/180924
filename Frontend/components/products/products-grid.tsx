"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { ProductsSort } from "@/components/products/products-sort"
import { Button } from "@/components/ui/button"

// Mock products data - in a real app, this would come from an API
const mockProducts = [
  {
    id: "1",
    name: "Diamond Solitaire Ring",
    material: "18K White Gold",
    price: 89999,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e"
  },
  {
    id: "2",
    name: "Pearl Necklace",
    material: "Fresh Water Pearls",
    price: 45999,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
  },
  {
    id: "3",
    name: "Gold Bangles Set",
    material: "22K Yellow Gold",
    price: 125999,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908"
  },
  {
    id: "4",
    name: "Diamond Studs",
    material: "18K White Gold",
    price: 65999,
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a"
  },
  // Add more mock products as needed
]

export function ProductsGrid() {
  const [sortBy, setSortBy] = useState("featured")
  const [products, setProducts] = useState(mockProducts)
  const [page, setPage] = useState(1)
  const productsPerPage = 12
  const totalPages = Math.ceil(products.length / productsPerPage)

  const handleSort = (value: string) => {
    setSortBy(value)
    let sortedProducts = [...products]
    
    switch (value) {
      case "price-asc":
        sortedProducts.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        sortedProducts.sort((a, b) => b.price - a.price)
        break
      case "newest":
        // In a real app, you would sort by date
        break
      default:
        // Featured sorting logic
        break
    }
    
    setProducts(sortedProducts)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {products.length} products
        </p>
        <ProductsSort value={sortBy} onValueChange={handleSort} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              variant={page === i + 1 ? "default" : "outline"}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}