import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductService } from '../services/products';
import { Product, ProductFilters } from '../types/product';
import { useToast } from '@/hooks/use-toast';

const productService = new ProductService();

export function useProducts(filters?: ProductFilters) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.getProducts(filters),
  });

  const createProduct = useMutation({
    mutationFn: (data: Partial<Product>) => productService.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: 'Product created',
        description: 'Product has been created successfully.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateProduct = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
      productService.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: 'Product updated',
        description: 'Product has been updated successfully.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: (id: string) => productService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: 'Product deleted',
        description: 'Product has been deleted successfully.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    products,
    isLoading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}