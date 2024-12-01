import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { VendorService } from '../services/vendors';
import { Vendor } from '../types/vendor';
import { useToast } from '@/hooks/use-toast';

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

  return {
    vendors,
    isLoading,
    error,
    followVendor,
    unfollowVendor,
  };
}