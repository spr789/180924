import { useState, useCallback } from 'react';
import { WishlistService } from '../services/wishlist';
import { Product, ApiError } from '../types';
import { useToast } from '@/hooks/use-toast';

export function useWishlist() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const { toast } = useToast();
  const wishlistService = new WishlistService();

  const fetchWishlist = useCallback(async (params?: {
    page?: number;
    limit?: number;
  }) => {
    setLoading(true);
    try {
      const response = await wishlistService.getWishlist(params);
      setItems(response.data);
      setTotalCount(response.meta.total);
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Failed to fetch wishlist",
        description: apiError.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const addToWishlist = useCallback(async (productId: string) => {
    setLoading(true);
    try {
      const response = await wishlistService.addToWishlist(productId);
      toast({
        title: "Added to Wishlist",
        description: "Item has been added to your wishlist.",
      });
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Failed to add item",
        description: apiError.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const removeFromWishlist = useCallback(async (productId: string) => {
    setLoading(true);
    try {
      const response = await wishlistService.removeFromWishlist(productId);
      toast({
        title: "Removed from Wishlist",
        description: "Item has been removed from your wishlist.",
      });
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Failed to remove item",
        description: apiError.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const moveToCart = useCallback(async (productId: string) => {
    setLoading(true);
    try {
      const response = await wishlistService.moveToCart(productId);
      toast({
        title: "Moved to Cart",
        description: "Item has been moved to your cart.",
      });
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Failed to move item",
        description: apiError.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    items,
    loading,
    totalCount,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    moveToCart,
  };
}