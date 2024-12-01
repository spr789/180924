import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { OrderService } from '../services/orders';
import { Order, CreateOrderData } from '../types/order';
import { useToast } from '@/hooks/use-toast';

const orderService = new OrderService();

export function useOrders() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: () => orderService.getOrders(),
  });

  const createOrder = useMutation({
    mutationFn: (data: CreateOrderData) => orderService.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: 'Order placed',
        description: 'Your order has been placed successfully.',
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

  const cancelOrder = useMutation({
    mutationFn: (orderId: string) => orderService.cancelOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: 'Order cancelled',
        description: 'Your order has been cancelled.',
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
    orders,
    isLoading,
    error,
    createOrder,
    cancelOrder,
  };
}