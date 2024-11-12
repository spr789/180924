import { useState, useCallback } from 'react'
import { ProductService } from '../services/products'
import { Product, ApiError } from '../types'
import { useToast } from '@/hooks/use-toast'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const { toast } = useToast()
  const productService = new ProductService()

  const fetchProducts = useCallback(async (params?: {
    page?: number
    category?: string
    search?: string
    min_price?: number
    max_price?: number
    sort_by?: string
  }) => {
    setLoading(true)
    try {
      const response = await productService.getProducts(params)
      setProducts(response.data.results)
      setTotalCount(response.data.count)
      return response.data
    } catch (error) {
      const apiError = error as ApiError
      toast({
        title: "Failed to fetch products",
        description: apiError.message,
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }, [toast])

  const fetchProduct = useCallback(async (id: string) => {
    setLoading(true)
    try {
      const response = await productService.getProduct(id)
      return response.data
    } catch (error) {
      const apiError = error as ApiError
      toast({
        title: "Failed to fetch product",
        description: apiError.message,
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }, [toast])

  return {
    products,
    totalCount,
    loading,
    fetchProducts,
    fetchProduct,
  }
}