import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductService } from '../services/products';
import { Product, ProductFilters } from '../types/product';
import { useToast } from '@/hooks/use-toast';
import { PaginatedApiResponse, ApiResponse } from '../types/responses';

const productService = new ProductService();

export function useProducts(filters?: ProductFilters) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery<ApiResponse<PaginatedApiResponse<Product[]>>, Error>({
    queryKey: ['products', filters],
    queryFn: () => productService.getProducts(filters),
  });

  // Log the paginated products data
  console.log('Paginated products data:', products);

  const createProduct = useMutation<
    ApiResponse<Product>, 
    Error,
    Partial<Product>
  >({
    mutationFn: (data) => productService.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: 'Product created',
        description: 'Product has been created successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateProduct = useMutation<
    ApiResponse<Product>,
    Error,
    { id: string; data: Partial<Product> }
  >({
    mutationFn: ({ id, data }) => productService.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: 'Product updated',
        description: 'Product has been updated successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteProduct = useMutation<
    ApiResponse<void>,
    Error,
    string
  >({
    mutationFn: (id) => productService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: 'Product deleted',
        description: 'Product has been deleted successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return { products, isLoading, error, createProduct, updateProduct, deleteProduct };
}