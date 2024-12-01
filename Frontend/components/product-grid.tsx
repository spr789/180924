"use client"

import { ProductCard } from "@/components/product-card"

// Mock products data - in a real app, this would come from an API
const mockProducts = {
  "chokers": [
    {
      id: "1",
      name: "Gold Choker",
      material: "22K Yellow Gold",
      price: 45999,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
    },
    {
      id: "2",
      name: "Diamond Choker",
      material: "18K White Gold",
      price: 89999,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908"
    },
  ],
  "layered": [
    {
      id: "3",
      name: "Pearl Layered Necklace",
      material: "Fresh Water Pearls",
      price: 12999,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
    },
  ],
  // Add more categories as needed
}

export function ProductGrid({ category }: { category: string }) {
  const products = mockProducts[category as keyof typeof mockProducts] || []

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
  )
}