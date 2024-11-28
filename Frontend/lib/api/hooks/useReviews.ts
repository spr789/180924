import { useState, useCallback } from 'react';
import { ReviewService } from '../services/reviews';
import { Review, ReviewCreateData, ReviewStats } from '../types/review';
import { ApiError } from '../types/types';
import { useToast } from '@/hooks/use-toast';

export function useReviews(productId: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const { toast } = useToast();
  const reviewService = new ReviewService();

  const fetchReviews = useCallback(
    async (params?: {
      page?: number;
      limit?: number;
      sort?: 'latest' | 'rating' | 'helpful';
      rating?: number;
    }) => {
      setLoading(true);
      try {
        const response = await reviewService.getProductReviews(
          productId,
          params
        );
        setReviews(response.data);
        setTotalCount(response.meta.total);
        return response;
      } catch (error) {
        const apiError = error as ApiError;
        toast({
          title: 'Failed to fetch reviews',
          description: apiError.message,
          variant: 'destructive',
        });
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [productId, toast]
  );

  const createReview = useCallback(
    async (data: ReviewCreateData) => {
      setLoading(true);
      try {
        const response = await reviewService.createReview(productId, data);
        toast({
          title: 'Review Submitted',
          description: 'Thank you for your review!',
        });
        return response;
      } catch (error) {
        const apiError = error as ApiError;
        toast({
          title: 'Failed to submit review',
          description: apiError.message,
          variant: 'destructive',
        });
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [productId, toast]
  );

  const voteReview = useCallback(
    async (reviewId: string, vote: 'helpful' | 'not_helpful') => {
      try {
        const response = await reviewService.voteReview(reviewId, vote);
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === reviewId ? { ...review, ...response } : review
          )
        );
        return response;
      } catch (error) {
        const apiError = error as ApiError;
        toast({
          title: 'Failed to vote',
          description: apiError.message,
          variant: 'destructive',
        });
        throw error;
      }
    },
    [toast]
  );

  return {
    reviews,
    stats,
    loading,
    totalCount,
    fetchReviews,
    createReview,
    voteReview,
  };
}
