import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { VendorService } from '../services/vendors';
import { useToast } from '@/hooks/use-toast';
import { VendorLoginRequest } from '../types/vendor';

const vendorService = new VendorService();

export function useVendors() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: vendors,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['vendors'],
    queryFn: () => vendorService.getVendors(),
    onSuccess: (data) => {
      console.log('Fetched vendors:', data);
    },
    onError: (error) => {
      console.error('Error fetching vendors:', error);
    },
  });

  const loginVendor = useMutation({
    mutationFn: (credentials: VendorLoginRequest) => vendorService.loginVendor(credentials),
    onSuccess: (data) => {
      console.log('Vendor login successful:', data);
      toast({
        title: 'Login Successful',
        description: `Welcome back, ${data.data.user.id}!`,
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