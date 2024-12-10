import { ApiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { Product, ProductFilters } from '../types/product';
import { ApiResponse, PaginatedApiResponse } from '../types/responses'; // Corrected import for PaginatedApiResponse

export class ProductService {
  private client: ApiClient;

  constructor() {
    this.client = ApiClient.getInstance();
  }

  async getProducts(filters?: ProductFilters): Promise<ApiResponse<PaginatedApiResponse<Product>>> {
    return this.client.get<PaginatedApiResponse<Product>>(API_ENDPOINTS.PRODUCTS.LIST, filters);
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