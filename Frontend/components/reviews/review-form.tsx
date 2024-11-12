"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Star, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4'];

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().min(1, "Title is required").max(100),
  comment: z.string().min(10, "Comment must be at least 10 characters").max(1000),
  media: z.array(z.instanceof(File)
    .refine(file => file.size <= MAX_FILE_SIZE, 'File size must be less than 5MB')
    .refine(file => ACCEPTED_FILE_TYPES.includes(file.type), 'Invalid file type')
  ).optional(),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  onSubmit: (data: ReviewFormData) => Promise<void>;
  isSubmitting: boolean;
}

export function ReviewForm({ onSubmit, isSubmitting }: ReviewFormProps) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      title: '',
      comment: '',
      media: [],
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => 
      file.size <= MAX_FILE_SIZE && ACCEPTED_FILE_TYPES.includes(file.type)
    );

    setSelectedFiles(prev => [...prev, ...validFiles]);
    
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    form.setValue('media', validFiles);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
    form.setValue('media', selectedFiles.filter((_, i) => i !== index));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    className="p-1"
                    onMouseEnter={() => setHoveredRating(rating)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => field.onChange(rating)}
                  >
                    <Star
                      className={`w-6 h-6 ${
                        rating <= (hoveredRating || field.value)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Summarize your experience" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Share your experience with this product"
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>Photos/Videos (optional)</FormLabel>
          <div className="flex flex-wrap gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative w-24 h-24">
                {selectedFiles[index]?.type.startsWith('video/') ? (
                  <video
                    src={preview}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            {previews.length < 5 && (
              <label className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-primary">
                <input
                  type="file"
                  accept={ACCEPTED_FILE_TYPES.join(',')}
                  onChange={handleFileChange}
                  className="hidden"
                  multiple
                />
                <Upload className="w-6 h-6 text-gray-400" />
              </label>
            )}
          </div>
          <p className="text-sm text-gray-500">
            Max 5 files. JPG, PNG, WEBP, or MP4. 5MB max per file.
          </p>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </Form>
  );
}