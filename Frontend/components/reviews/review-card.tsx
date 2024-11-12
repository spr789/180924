import { useState } from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { Star, ThumbsUp, ThumbsDown, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Review } from '@/lib/api/types/review';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ReviewCardProps {
  review: Review;
  onVote: (vote: 'helpful' | 'not_helpful') => Promise<void>;
}

export function ReviewCard({ review, onVote }: ReviewCardProps) {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  return (
    <div className="border rounded-lg p-6 space-y-4">
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
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-medium">
                {review.user.name[0]}
              </span>
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{review.user.name}</span>
              {review.verified_purchase && (
                <div className="flex items-center text-green-600 text-sm">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Verified Purchase
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span>•</span>
              <time>{formatDistanceToNow(new Date(review.created_at))} ago</time>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">{review.title}</h4>
        <p className="text-gray-600">{review.comment}</p>
      </div>

      {review.media.length > 0 && (
        <div className="flex gap-2 overflow-x-auto py-2">
          {review.media.map((media, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <button
                  className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0"
                  onClick={() => setSelectedMedia(media.url)}
                >
                  <Image
                    src={media.thumbnail || media.url}
                    alt={`Review media ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  {media.type === 'video' && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white">▶</span>
                    </div>
                  )}
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                {media.type === 'video' ? (
                  <video
                    src={media.url}
                    controls
                    className="w-full"
                  />
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
          <ThumbsUp className="w-4 h-4 mr-2" />
          Helpful ({review.helpful_count})
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onVote('not_helpful')}
          className={review.user_vote === 'not_helpful' ? 'text-red-600' : ''}
        >
          <ThumbsDown className="w-4 h-4 mr-2" />
          Not Helpful ({review.not_helpful_count})
        </Button>
      </div>
    </div>
  );
}