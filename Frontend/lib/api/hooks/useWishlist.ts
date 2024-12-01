import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { WishlistService } from '../services/wishlist';
import { useToast } from '@/hooks/use-toast';

const wishlistService = new WishlistService();

export function useWishlist() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: items,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => wishlistService.getWishlist(),
  });

  const addToWishlist = useMutation({
    mutationFn: (productId: string) => wishlistService.addToWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast({
        title: 'Added to wishlist',
        description: 'Item has been added to your wishlist.',
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

  const removeFromWishlist = useMutation({
    mutationFn: (productId: string) => wishlistService.removeFromWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast({
        title: 'Removed from wishlist',
        description: 'Item has been removed from your wishlist.',
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

  const moveToCart = useMutation({
    mutationFn: (productId: string) => wishlistService.moveToCart(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({
        title: 'Moved to cart',
        description: 'Item has been moved to your cart.',
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
    items,
    isLoading,
    error,
    addToWishlist,
    removeFromWishlist,
    moveToCart,
  };
}