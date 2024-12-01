"use client"

import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"

// Mock search results - in a real app, this would come from an API
const mockProducts = [
  {
    id: "1",
    name: "Gold Bajubandh",
    material: "22K Yellow Gold",
    price: 45999,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
  },
  {
    id: "2",
    name: "Diamond Bajubandh",
    material: "18K White Gold",
    price: 89999,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908"
  },
  // Add more mock products as needed
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  // Filter products based on search query
  const searchResults = mockProducts.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.material.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-16">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">
              Search Results for "{query}"
            </h1>
            <p className="text-gray-600">
              {searchResults.length} items found
            </p>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map((product) => (
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
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-2">No results found</h2>
              <p className="text-gray-600">
                Try adjusting your search or browse our categories
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}