import axiosInstance from '../utils/axios';
import { Product, PaginatedResponse } from '../types/types';

export class WishlistService {
  async getWishlist(params?: { page?: number; limit?: number }) {
    try {
      const response = await axiosInstance.get<PaginatedResponse<Product>>(
        '/wishlist',
        { params }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async addToWishlist(productId: string) {
    try {
      const response = await axiosInstance.post('/wishlist/add', {
        product_id: productId,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async removeFromWishlist(productId: string) {
    try {
      const response = await axiosInstance.delete(`/wishlist/${productId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async clearWishlist() {
    try {
      const response = await axiosInstance.delete('/wishlist');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async moveToCart(productId: string) {
    try {
      const response = await axiosInstance.post('/wishlist/move-to-cart', {
        product_id: productId,
      });
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
