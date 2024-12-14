import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { VendorService } from '../services/vendors';
import { useToast } from '@/hooks/use-toast';
import { VendorLoginRequest } from '../types/vendor';

const vendorService = new VendorService();

export function useVendors() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const vendors = null;
  const isLoading = false;
  const error = null;

  const loginVendor = useMutation({
    mutationFn: (credentials: VendorLoginRequest) => vendorService.loginVendor(credentials),
    onSuccess: (data) => {
      const user = data.data.data.user;
      const token = data.data.data.token; // Assuming the token is part of the response
      localStorage.setItem('token1', token); // Save token in local storage
      console.log('Token saved to localStorage:', token); // Log the token
           toast({
        title: 'Login Successful',
        description: `Welcome back, ${user.phone_number}!`,
      });
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
    },
    onError: (error: Error) => {
      console.error('Vendor login failed:', error);
      toast({
        title: 'Login Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const followVendor = useMutation({
    mutationFn: (vendorId: string) => vendorService.followVendor(vendorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      toast({
        title: 'Following vendor',
        description: 'You are now following this vendor.',
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

  const unfollowVendor = useMutation({
    mutationFn: (vendorId: string) => vendorService.unfollowVendor(vendorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      toast({
        title: 'Unfollowed vendor',
        description: 'You are no longer following this vendor.',
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

  const getVendorOrders = (vendorId: string) => {
    return useQuery({
      queryKey: ['vendorOrders', vendorId],
      queryFn: () => vendorService.getVendorOrders(vendorId),
    });
  };

  const getVendorPayouts = (vendorId: string) => {
    return useQuery({
      queryKey: ['vendorPayouts', vendorId],
      queryFn: () => vendorService.getVendorPayouts(vendorId),
    });
  };

  const getVendorShipments = (vendorId: string) => {
    return useQuery({
      queryKey: ['vendorShipments', vendorId],
      queryFn: () => vendorService.getVendorShipments(vendorId),
    });
  };

  const getVendorNotifications = (vendorId: string) => {
    return useQuery({
      queryKey: ['vendorNotifications', vendorId],
      queryFn: () => vendorService.getVendorNotifications(vendorId),
    });
  };

  return {
    vendors,
    isLoading,
    error,
    loginVendor,
    followVendor,
    unfollowVendor,
    getVendorOrders,
    getVendorPayouts,
    getVendorShipments,
    getVendorNotifications,
  };
}