import { ApiClient } from '../utils/client';
import { API_ENDPOINTS } from '../../config/config';
import { ApiResponse, PaginatedResponse, Product } from '../types/types';

export class ProductService {
  private client: ApiClient;

  constructor() {
    this.client = ApiClient.getInstance();
  }

  async getProducts(params?: {
    page?: number;
    category?: string;
    search?: string;
    min_price?: number;
    max_price?: number;
    sort_by?: string;
  }): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return this.client.get<ApiResponse<PaginatedResponse<Product>>>(
      API_ENDPOINTS.PRODUCTS,
      params as Record<string, string>
    );
  }

  async getProduct(id: string): Promise<ApiResponse<Product>> {
    return this.client.get<ApiResponse<Product>>(
      API_ENDPOINTS.PRODUCT_DETAIL(id)
    );
  }

  async getCategories(): Promise<ApiResponse<string[]>> {
    return this.client.get<ApiResponse<string[]>>(
      API_ENDPOINTS.PRODUCT_CATEGORIES
    );
  }
}
