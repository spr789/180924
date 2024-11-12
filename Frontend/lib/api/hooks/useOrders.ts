import { useState, useCallback } from 'react';
import { OrderService } from '../services/orders';
import { Order, ApiError } from '../types';
import { useToast } from '@/hooks/use-toast';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const { toast } = useToast();
  const orderService = new OrderService();

  const fetchOrders = useCallback(async (params?: {
    page?: number;
    status?: string;
    limit?: number;
  }) => {
    setLoading(true);
    try {
      const response = await orderService.getOrders(params);
      setOrders(response.data);
      setTotalCount(response.meta.total);
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Failed to fetch orders",
        description: apiError.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const getOrder = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await orderService.getOrder(id);
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Failed to fetch order",
        description: apiError.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const createOrder = useCallback(async (data: {
    items: Array<{ product_id: string; quantity: number }>;
    shipping_address_id: number;
    payment_method: string;
  }) => {
    setLoading(true);
    try {
      const response = await orderService.createOrder(data);
      toast({
        title: "Order Created",
        description: "Your order has been placed successfully.",
      });
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Failed to create order",
        description: apiError.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const cancelOrder = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await orderService.cancelOrder(id);
      toast({
        title: "Order Cancelled",
        description: "Your order has been cancelled successfully.",
      });
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Failed to cancel order",
        description: apiError.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    orders,
    loading,
    totalCount,
    fetchOrders,
    getOrder,
    createOrder,
    cancelOrder,
  };
}