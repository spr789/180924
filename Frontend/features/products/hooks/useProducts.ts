import { useState, useCallback } from 'react';
import { ProductsApi } from '../api/products';
import { Product, ProductFilters } from '../types';
import { useToast } from '@/hooks/use-toast';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const { toast } = useToast();
  const productsApi = new ProductsApi();

  const fetchProducts = useCallback(async (filters?: ProductFilters) => {
    setLoading(true);
    try {
      const response = await productsApi.getProducts(filters);
      setProducts(response.products);
      setTotalCount(response.total);
      return response;
    } catch (error: any) {
      toast({
        title: "Failed to fetch products",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const fetchProduct = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const product = await productsApi.getProduct(id);
      return product;
    } catch (error: any) {
      toast({
        title: "Failed to fetch product",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    products,
    totalCount,
    loading,
    fetchProducts,
    fetchProduct,
  };
}