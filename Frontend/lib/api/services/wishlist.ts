import { ApiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { Product } from '../types/product';
import { ApiResponse, PaginatedResponse } from '../types/responses';

export class WishlistService {
  private client: ApiClient;

  constructor() {
    this.client = ApiClient.getInstance();
  }

  async getWishlist(): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return this.client.get<PaginatedResponse<Product>>(API_ENDPOINTS.WISHLIST.LIST);
  }

  async addToWishlist(productId: string): Promise<ApiResponse<void>> {
    return this.client.post<void>(API_ENDPOINTS.WISHLIST.ADD, { product_id: productId });
  }

  async removeFromWishlist(productId: string): Promise<ApiResponse<void>> {
    return this.client.delete<void>(API_ENDPOINTS.WISHLIST.REMOVE(productId));
  }

  async moveToCart(productId: string): Promise<ApiResponse<void>> {
    return this.client.post<void>(API_ENDPOINTS.WISHLIST.MOVE_TO_CART, { product_id: productId });
  }
}