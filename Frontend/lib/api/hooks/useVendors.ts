import { useState, useCallback } from 'react';
import { VendorService } from '../services/vendors';
import { Vendor, Product, ApiError } from '../types';
import { useToast } from '@/hooks/use-toast';

export function useVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const { toast } = useToast();
  const vendorService = new VendorService();

  const fetchVendors = useCallback(async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    rating?: number;
    search?: string;
  }) => {
    setLoading(true);
    try {
      const response = await vendorService.getVendors(params);
      setVendors(response.data);
      setTotalCount(response.meta.total);
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Failed to fetch vendors",
        description: apiError.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const getVendor = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await vendorService.getVendor(id);
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Failed to fetch vendor",
        description: apiError.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const getVendorProducts = useCallback(async (
    vendorId: string,
    params?: {
      page?: number;
      limit?: number;
      category?: string;
      sort?: string;
    }
  ) => {
    setLoading(true);
    try {
      const response = await vendorService.getVendorProducts(vendorId, params);
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Failed to fetch vendor products",
        description: apiError.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const followVendor = useCallback(async (vendorId: string) => {
    try {
      const response = await vendorService.followVendor(vendorId);
      toast({
        title: "Following Vendor",
        description: "You are now following this vendor.",
      });
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Failed to follow vendor",
        description: apiError.message,
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  const unfollowVendor = useCallback(async (vendorId: string) => {
    try {
      const response = await vendorService.unfollowVendor(vendorId);
      toast({
        title: "Unfollowed Vendor",
        description: "You are no longer following this vendor.",
      });
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Failed to unfollow vendor",
        description: apiError.message,
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  return {
    vendors,
    loading,
    totalCount,
    fetchVendors,
    getVendor,
    getVendorProducts,
    followVendor,
    unfollowVendor,
  };
}