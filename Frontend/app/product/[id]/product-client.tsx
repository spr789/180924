"use client"

import { ProductView } from "@/components/product-view"
import { Product } from "@/lib/api/types"

interface ProductClientProps {
  product: Product
}

export function ProductClient({ product }: ProductClientProps) {
  return <ProductView product={product} />
}