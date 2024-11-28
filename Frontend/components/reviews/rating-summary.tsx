import { Star } from 'lucide-react';
import { ReviewStats } from '@/lib/api/types/review';
import { Progress } from '@/components/ui/progress';

interface RatingSummaryProps {
  stats: ReviewStats;
  onRatingFilter: (rating: number | null) => void;
  selectedRating: number | null;
}

export function RatingSummary({
  stats,
  onRatingFilter,
  selectedRating,
}: RatingSummaryProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-4xl font-bold">
            {stats.average_rating.toFixed(1)}
          </div>
          <div className="mt-2 flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Star
                key={rating}
                className={`h-4 w-4 ${
                  rating <= Math.round(stats.average_rating)
                    ? 'fill-current text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <div className="mt-1 text-sm text-gray-600">
            {stats.total_reviews} reviews
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = stats.rating_distribution[rating] || 0;
            const percentage = (count / stats.total_reviews) * 100;

            return (
              <button
                key={rating}
                onClick={() =>
                  onRatingFilter(selectedRating === rating ? null : rating)
                }
                className={`group flex w-full items-center gap-2 ${
                  selectedRating === rating ? 'opacity-100' : 'opacity-70'
                } hover:opacity-100`}
              >
                <div className="flex w-16 items-center gap-1">
                  <span>{rating}</span>
                  <Star className="h-4 w-4 fill-current text-yellow-400" />
                </div>
                <Progress value={percentage} className="flex-1" />
                <span className="w-12 text-sm text-gray-600">{count}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
