'use client';

import { useState, useEffect } from 'react';
import { useReviews } from '@/lib/api/hooks/useReviews';
import { ReviewCard } from '@/components/reviews/review-card';
import { ReviewForm } from '@/components/reviews/review-form';
import { RatingSummary } from '@/components/reviews/rating-summary';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function ProductReviewsPage({
  params,
}: {
  params: { id: string };
}) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'latest' | 'rating' | 'helpful'>(
    'latest'
  );
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    reviews,
    stats,
    loading,
    totalCount,
    fetchReviews,
    createReview,
    voteReview,
  } = useReviews(params.id);

  useEffect(() => {
    fetchReviews({
      page,
      limit: 10,
      sort: sortBy,
      rating: selectedRating || undefined,
    });
  }, [page, sortBy, selectedRating]);

  const handleSubmitReview = async (data: any) => {
    await createReview(data);
    setIsDialogOpen(false);
    fetchReviews({ page: 1, sort: sortBy });
  };

  return (
    <main className="container py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Customer Reviews</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Write a Review</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Write a Review</DialogTitle>
                <DialogDescription>
                  Share your experience with this product
                </DialogDescription>
              </DialogHeader>
              <ReviewForm
                onSubmit={handleSubmitReview}
                isSubmitting={loading}
              />
            </DialogContent>
          </Dialog>
        </div>

        {stats && (
          <RatingSummary
            stats={stats}
            onRatingFilter={setSelectedRating}
            selectedRating={selectedRating}
          />
        )}

        <div className="flex justify-end">
          <Select
            value={sortBy}
            onValueChange={(value: any) => setSortBy(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Most Recent</SelectItem>
              <SelectItem value="rating">Highest Rating</SelectItem>
              <SelectItem value="helpful">Most Helpful</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6">
          {loading ? (
            <div className="py-12 text-center">Loading reviews...</div>
          ) : reviews.length > 0 ? (
            <>
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onVote={(vote) => voteReview(review.id, vote)}
                />
              ))}
              {totalCount > reviews.length && (
                <div className="flex justify-center pt-6">
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={loading}
                  >
                    Load More Reviews
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="py-12 text-center text-gray-500">
              No reviews yet. Be the first to review this product!
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
