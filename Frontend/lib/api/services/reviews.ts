import { ApiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { Review, ReviewCreateData } from '../types/review';
import { ApiResponse, PaginatedResponse } from '../types/responses';

export class ReviewService {
  private client: ApiClient;

  constructor() {
    this.client = ApiClient.getInstance();
  }

  async getProductReviews(productId: string): Promise<ApiResponse<PaginatedResponse<Review>>> {
    return this.client.get<PaginatedResponse<Review>>(API_ENDPOINTS.PRODUCTS.REVIEWS(productId));
  }

  async createReview(productId: string, data: ReviewCreateData): Promise<ApiResponse<Review>> {
    return this.client.post<Review>(API_ENDPOINTS.PRODUCTS.REVIEWS(productId), data);
  }

  async voteReview(reviewId: string, vote: 'helpful' | 'not_helpful'): Promise<ApiResponse<Review>> {
    return this.client.post<Review>(`/reviews/${reviewId}/vote`, { vote });
  }
}