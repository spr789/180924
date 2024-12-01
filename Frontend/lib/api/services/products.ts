import { ApiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { Product, ProductFilters } from '../types/product';
import { ApiResponse, PaginatedResponse } from '../types/responses';

export class ProductService {
  private client: ApiClient;

  constructor() {
    this.client = ApiClient.getInstance();
  }

  async getProducts(filters?: ProductFilters): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return this.client.get<PaginatedResponse<Product>>(API_ENDPOINTS.PRODUCTS.LIST, filters);
  }

  async getProduct(id: string): Promise<ApiResponse<Product>> {
    return this.client.get<Product>(API_ENDPOINTS.PRODUCTS.DETAIL(id));
  }

  async createProduct(data: Partial<Product>): Promise<ApiResponse<Product>> {
    return this.client.post<Product>(API_ENDPOINTS.PRODUCTS.LIST, data);
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<ApiResponse<Product>> {
    return this.client.put<Product>(API_ENDPOINTS.PRODUCTS.DETAIL(id), data);
  }

  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    return this.client.delete<void>(API_ENDPOINTS.PRODUCTS.DETAIL(id));
  }
}