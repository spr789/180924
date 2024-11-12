import axiosInstance from '../axios';
import { Order, PaginatedResponse } from '../types';

export class OrderService {
  async getOrders(params?: {
    page?: number;
    status?: string;
    limit?: number;
  }) {
    try {
      const response = await axiosInstance.get<PaginatedResponse<Order>>('/orders', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getOrder(id: string) {
    try {
      const response = await axiosInstance.get<Order>(`/orders/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createOrder(data: {
    items: Array<{ product_id: string; quantity: number }>;
    shipping_address_id: number;
    payment_method: string;
  }) {
    try {
      const response = await axiosInstance.post<Order>('/orders', data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async cancelOrder(id: string) {
    try {
      const response = await axiosInstance.post<Order>(`/orders/${id}/cancel`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async trackOrder(id: string) {
    try {
      const response = await axiosInstance.get(`/orders/${id}/tracking`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any) {
    if (error.response) {
      throw {
        message: error.response.data.message || 'An error occurred',
        status: error.response.status,
        errors: error.response.data.errors,
      };
    }
    throw {
      message: 'Network error occurred',
      status: 500,
    };
  }
}