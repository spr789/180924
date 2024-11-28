import { useState } from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { Star, ThumbsUp, ThumbsDown, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Review } from '@/lib/api/types/review';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface ReviewCardProps {
  review: Review;
  onVote: (vote: 'helpful' | 'not_helpful') => Promise<void>;
}

export function ReviewCard({ review, onVote }: ReviewCardProps) {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  return (
    <div className="space-y-4 rounded-lg border p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {review.user.avatar ? (
            <Image
              src={review.user.avatar}
              alt={review.user.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <span className="font-medium text-primary">
                {review.user.name[0]}
              </span>
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{review.user.name}</span>
              {review.verified_purchase && (
                <div className="flex items-center text-sm text-green-600">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Verified Purchase
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? 'fill-current text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span>•</span>
              <time>
                {formatDistanceToNow(new Date(review.created_at))} ago
              </time>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="mb-2 font-medium">{review.title}</h4>
        <p className="text-gray-600">{review.comment}</p>
      </div>

      {review.media.length > 0 && (
        <div className="flex gap-2 overflow-x-auto py-2">
          {review.media.map((media, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <button
                  className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg"
                  onClick={() => setSelectedMedia(media.url)}
                >
                  <Image
                    src={media.thumbnail || media.url}
                    alt={`Review media ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  {media.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <span className="text-white">▶</span>
                    </div>
                  )}
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                {media.type === 'video' ? (
                  <video src={media.url} controls className="w-full" />
                ) : (
                  <Image
                    src={media.url}
                    alt={`Review media ${index + 1}`}
                    width={800}
                    height={600}
                    className="object-contain"
                  />
                )}
              </DialogContent>
            </Dialog>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onVote('helpful')}
          className={review.user_vote === 'helpful' ? 'text-green-600' : ''}
        >
          <ThumbsUp className="mr-2 h-4 w-4" />
          Helpful ({review.helpful_count})
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onVote('not_helpful')}
          className={review.user_vote === 'not_helpful' ? 'text-red-600' : ''}
        >
          <ThumbsDown className="mr-2 h-4 w-4" />
          Not Helpful ({
            review.not_helpful_count
          })
        </Button>
      </div>
    </div>
  );
}
