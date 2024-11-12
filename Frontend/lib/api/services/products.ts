// frontend/lib/api/services/products.ts

import { ApiClient } from '../client'
import { API_ENDPOINTS } from '../config'
import { ApiResponse, PaginatedResponse, Product } from '../types'

// Helper function to serialize params
const serializeParams = (params: Record<string, any>): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (Array.isArray(value)) {
        return [key, value.join(',')]; // Serialize arrays to comma-separated strings
      }
      return [key, String(value)]; // Convert all other values to strings
    })
  );
};

export class ProductService {
  private client: ApiClient;

  constructor() {
    this.client = ApiClient.getInstance();
  }

  // Fetch products with optional filters
  async getProducts(params?: {
    page?: number;
    category?: string;
    search?: string;
    min_price?: number;
    max_price?: number;
    sort_by?: string;
    vendor?: number;
    is_active?: boolean;
    status?: string;
    collections?: number[];
    free_shipping?: boolean;
    returnable?: boolean;
  }): Promise<ApiResponse<PaginatedResponse<Product>>> {
    try {
      const serializedParams = params ? serializeParams(params) : undefined;
      const response = await this.client.get<ApiResponse<PaginatedResponse<Product>>>(
        API_ENDPOINTS.PRODUCTS,
        serializedParams
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error}`);
    }
  }

  // Fetch single product by ID
  async getProduct(id: string): Promise<ApiResponse<Product>> {
    try {
      return await this.client.get<ApiResponse<Product>>(API_ENDPOINTS.PRODUCT_DETAIL(id));
    } catch (error) {
      throw new Error(`Failed to fetch product: ${error}`);
    }
  }

  // Fetch all categories
  async getCategories(): Promise<ApiResponse<string[]>> {
    try {
      return await this.client.get<ApiResponse<string[]>>(API_ENDPOINTS.CATEGORIES);
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error}`);
    }
  }

  // Fetch products by specific vendor
  async getProductsByVendor(vendorId: number): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return this.getProducts({ vendor: vendorId });
  }

  // Fetch active and approved products only
  async getActiveProducts(): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return this.getProducts({ is_active: true, status: 'approved' });
  }

  // Fetch products from a specific collection
  async getProductsByCollection(collectionId: number): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return this.getProducts({ collections: [collectionId] });
  }

  // Fetch products with free shipping
  async getFreeShippingProducts(): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return this.getProducts({ free_shipping: true });
  }

  // Fetch returnable products
  async getReturnableProducts(): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return this.getProducts({ returnable: true });
  }
}
