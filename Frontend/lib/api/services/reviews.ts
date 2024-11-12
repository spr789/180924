import axiosInstance from '../axios';
import { PaginatedResponse } from '../types';
import { Review, ReviewCreateData } from './types/review';

export class ReviewService {
  async getProductReviews(productId: string, params?: {
    page?: number;
    limit?: number;
    sort?: 'latest' | 'rating' | 'helpful';
    rating?: number;
  }) {
    try {
      const response = await axiosInstance.get<PaginatedResponse<Review>>(
        `/products/${productId}/reviews`,
        { params }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createReview(productId: string, data: ReviewCreateData) {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'media') {
          (value as File[]).forEach((file) => {
            formData.append('media[]', file);
          });
        } else {
          formData.append(key, value.toString());
        }
      });

      const response = await axiosInstance.post<Review>(
        `/products/${productId}/reviews`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async voteReview(reviewId: string, vote: 'helpful' | 'not_helpful') {
    try {
      const response = await axiosInstance.post(`/reviews/${reviewId}/vote`, { vote });
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