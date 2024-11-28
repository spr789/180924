'use client';

import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/auth-context';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  material: string;
}

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setItems(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, [items]);

  const addItem = useCallback(
    (item: WishlistItem) => {
      if (!user) {
        toast({
          title: 'Please log in',
          description:
            'You need to be logged in to add items to your wishlist.',
          variant: 'destructive',
        });
        return false;
      }

      setItems((currentItems) => {
        if (currentItems.some((i) => i.id === item.id)) {
          toast({
            title: 'Already in wishlist',
            description: 'This item is already in your wishlist.',
          });
          return currentItems;
        }

        toast({
          title: 'Added to Wishlist',
          description: `${item.name} has been added to your wishlist.`,
        });
        return [...currentItems, item];
      });
      return true;
    },
    [user, toast]
  );

  const removeItem = useCallback(
    (id: string) => {
      setItems((currentItems) => {
        const newItems = currentItems.filter((item) => item.id !== id);
        toast({
          title: 'Removed from Wishlist',
          description: 'Item has been removed from your wishlist.',
        });
        return newItems;
      });
    },
    [toast]
  );

  const isInWishlist = useCallback(
    (id: string) => {
      return items.some((item) => item.id === id);
    },
    [items]
  );

  const clearWishlist = useCallback(() => {
    setItems([]);
    toast({
      title: 'Wishlist Cleared',
      description: 'All items have been removed from your wishlist.',
    });
  }, [toast]);

  return {
    items,
    loading,
    addItem,
    removeItem,
    isInWishlist,
    clearWishlist,
  };
}
