import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ReviewService } from '../services/reviews';
import { Review, ReviewCreateData } from '../types/review';
import { useToast } from '@/hooks/use-toast';

const reviewService = new ReviewService();

export function useReviews(productId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => reviewService.getProductReviews(productId),
  });

  const createReview = useMutation({
    mutationFn: (data: ReviewCreateData) => reviewService.createReview(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
      toast({
        title: 'Review submitted',
        description: 'Your review has been submitted successfully.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const voteReview = useMutation({
    mutationFn: ({ reviewId, vote }: { reviewId: string; vote: 'helpful' | 'not_helpful' }) =>
      reviewService.voteReview(reviewId, vote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    reviews,
    isLoading,
    error,
    createReview,
    voteReview,
  };
}