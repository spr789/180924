import { ApiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { Order, CreateOrderData } from '../types/order';
import { ApiResponse, PaginatedResponse } from '../types/responses';

export class OrderService {
  private client: ApiClient;

  constructor() {
    this.client = ApiClient.getInstance();
  }

  async getOrders(): Promise<ApiResponse<PaginatedResponse<Order>>> {
    return this.client.get<PaginatedResponse<Order>>(API_ENDPOINTS.ORDERS.LIST);
  }

  async getOrder(id: string): Promise<ApiResponse<Order>> {
    return this.client.get<Order>(API_ENDPOINTS.ORDERS.DETAIL(id));
  }

  async createOrder(data: CreateOrderData): Promise<ApiResponse<Order>> {
    return this.client.post<Order>(API_ENDPOINTS.ORDERS.CREATE, data);
  }

  async cancelOrder(id: string): Promise<ApiResponse<Order>> {
    return this.client.post<Order>(API_ENDPOINTS.ORDERS.CANCEL(id), {});
  }
}