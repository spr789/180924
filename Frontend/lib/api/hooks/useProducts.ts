// frontend/hooks/useProducts.ts

import { useState, useCallback } from 'react'
import { ProductService } from '../services/products'
import { Product, ApiError, PaginatedResponse } from '../types'
import { useToast } from '@/hooks/use-toast'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const { toast } = useToast()
  const productService = new ProductService()

  // Utility function for handling errors
  const handleError = (error: unknown, title: string) => {
    const apiError = error as ApiError;
    toast({
      title,
      description: apiError?.message || "An unknown error occurred.",
      variant: "destructive",
    });
  }

const fetchProducts = useCallback(async (params?: {
  page?: number
  category?: string
  search?: string
  min_price?: number
  max_price?: number
  sort_by?: string
  vendor?: number
  is_active?: boolean
  status?: string
  collections?: number[]
  free_shipping?: boolean
  returnable?: boolean
}) => {
  setLoading(true)
  try {
    const response = await productService.getProducts(params)
    console.log('Products API Response:', response)

    if (Array.isArray(response)) {
      // If response is directly an array of products
      setProducts(response)
      setTotalCount(response.length)
      return {
        results: response,
        count: response.length
      }
    } else if (response?.data) {
      // Handle paginated response
      const paginatedData = response.data as PaginatedResponse<Product>
      setProducts(paginatedData.results)
      setTotalCount(paginatedData.count)
      return paginatedData
    }

    throw new Error("Invalid response format from API")
  } catch (error) {
    handleError(error, "Failed to fetch products")
    throw error
  } finally {
    setLoading(false)
  }
}, [toast])

  // Fetch a single product by ID
  const fetchProduct = useCallback(async (id: string) => {
    setLoading(true)
    try {
      const response = await productService.getProduct(id)
      console.log('Single Product API Response:', response)
      return response.data
    } catch (error) {
      handleError(error, "Failed to fetch product")
      throw error
    } finally {
      setLoading(false)
    }
  }, [toast])

  // Fetch products by a specific vendor
  const fetchProductsByVendor = useCallback(async (vendorId: number) => {
    setLoading(true)
    try {
      const response = await productService.getProductsByVendor(vendorId)
      console.log('Vendor Products API Response:', response)
      setProducts(response.data.results)
      setTotalCount(response.data.count)
      return response.data
    } catch (error) {
      handleError(error, "Failed to fetch vendor products")
      throw error
    } finally {
      setLoading(false)
    }
  }, [toast])

  // Fetch only active products
  const fetchActiveProducts = useCallback(async () => {
    setLoading(true)
    try {
      const response = await productService.getActiveProducts()
      console.log('Active Products API Response:', response)
      setProducts(response.data.results)
      setTotalCount(response.data.count)
      return response.data
    } catch (error) {
      handleError(error, "Failed to fetch active products")
      throw error
    } finally {
      setLoading(false)
    }
  }, [toast])

  // Fetch products by collection ID
  const fetchProductsByCollection = useCallback(async (collectionId: number) => {
    setLoading(true)
    try {
      const response = await productService.getProductsByCollection(collectionId)
      console.log('Collection Products API Response:', response)
      setProducts(response.data.results)
      setTotalCount(response.data.count)
      return response.data
    } catch (error) {
      handleError(error, "Failed to fetch collection products")
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
    fetchProductsByVendor,
    fetchActiveProducts,
    fetchProductsByCollection
  }
}
