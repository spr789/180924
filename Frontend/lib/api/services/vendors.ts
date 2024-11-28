import axiosInstance from '../utils/axios';
import { Vendor, PaginatedResponse, Product } from '../types/types';

export class VendorService {
  async getVendors(params?: {
    page?: number;
    limit?: number;
    category?: string;
    rating?: number;
    search?: string;
  }) {
    try {
      const response = await axiosInstance.get<PaginatedResponse<Vendor>>(
        '/vendors',
        { params }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getVendor(id: string) {
    try {
      const response = await axiosInstance.get<Vendor>(`/vendors/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getVendorProducts(
    vendorId: string,
    params?: {
      page?: number;
      limit?: number;
      category?: string;
      sort?: string;
    }
  ) {
    try {
      const response = await axiosInstance.get<PaginatedResponse<Product>>(
        `/vendors/${vendorId}/products`,
        { params }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getVendorReviews(
    vendorId: string,
    params?: {
      page?: number;
      limit?: number;
      rating?: number;
    }
  ) {
    try {
      const response = await axiosInstance.get(`/vendors/${vendorId}/reviews`, {
        params,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async followVendor(vendorId: string) {
    try {
      const response = await axiosInstance.post(`/vendors/${vendorId}/follow`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async unfollowVendor(vendorId: string) {
    try {
      const response = await axiosInstance.delete(
        `/vendors/${vendorId}/follow`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async contactVendor(
    vendorId: string,
    data: {
      subject: string;
      message: string;
    }
  ) {
    try {
      const response = await axiosInstance.post(
        `/vendors/${vendorId}/contact`,
        data
      );
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
