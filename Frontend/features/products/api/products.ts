import { ApiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import { Product, ProductFilters, ProductsResponse } from '../types';

export class ProductsApi {
  private client: ApiClient;

  constructor() {
    this.client = ApiClient.getInstance();
  }

  async getProducts(filters?: ProductFilters): Promise<ProductsResponse> {
    const response = await this.client.get(API_ENDPOINTS.PRODUCTS, filters);
    return response.data;
  }

  async getProduct(id: string): Promise<Product> {
    const response = await this.client.get(API_ENDPOINTS.PRODUCT_DETAIL(id));
    return response.data;
  }

  async getCategories(): Promise<string[]> {
    const response = await this.client.get(API_ENDPOINTS.PRODUCT_CATEGORIES);
    return response.data;
  }
}