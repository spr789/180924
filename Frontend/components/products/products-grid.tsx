"use client"

import { useState, useEffect, useMemo } from "react"
import { ProductCard } from "@/components/product-card"
import { ProductsSort } from "@/components/products/products-sort"
import { Button } from "@/components/ui/button"
import { useProducts } from "@/lib/api/hooks/useProducts"
import { Product } from "@/lib/api/types"

export function ProductsGrid() {
  const [sortBy, setSortBy] = useState("featured")
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const { fetchProducts, loading } = useProducts()
  const productsPerPage = 12

  const totalPages = useMemo(() => Math.ceil(totalCount / productsPerPage), [totalCount])

  const params = useMemo(() => {
    const baseParams: any = {
      page,
      is_active: true,
      status: 'approved'
    }

    if (sortBy === 'price-asc') {
      baseParams.sort_by = 'price'
    } else if (sortBy === 'price-desc') {
      baseParams.sort_by = '-price'
    } else if (sortBy === 'newest') {
      baseParams.sort_by = '-created_at'
    }
    
    return baseParams
  }, [page, sortBy])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts(params)
        if (response?.results && response?.count !== undefined) {
          setProducts(response.results)
          setTotalCount(response.count)
        } else {
          console.error("Invalid response format")
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    loadProducts()
  }, [params, fetchProducts])

  const handleSort = (value: string) => {
    setSortBy(value)
    setPage(1) // Reset to first page when sorting changes
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {totalCount} products
        </p>
        <ProductsSort value={sortBy} onValueChange={handleSort} />
      </div>

      {loading ? (
        <div className="flex justify-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              material={product.category}
              price={product.price}
              image={product.images[0]}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1 || loading}
            aria-label="Previous page"
          >
            Previous
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              variant={page === i + 1 ? "default" : "outline"}
              onClick={() => setPage(i + 1)}
              disabled={loading}
              aria-label={`Page ${i + 1}`}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || loading}
            aria-label="Next page"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
