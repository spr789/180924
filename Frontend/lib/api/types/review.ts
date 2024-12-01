export interface Review {
  id: string;
  product_id: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  rating: number;
  title: string;
  comment: string;
  media: ReviewMedia[];
  helpful_count: number;
  not_helpful_count: number;
  user_vote?: 'helpful' | 'not_helpful';
  verified_purchase: boolean;
  created_at: string;
  updated_at: string;
}

export interface ReviewMedia {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

export interface ReviewCreateData {
  rating: number;
  title: string;
  comment: string;
  media?: File[];
}

export interface ReviewStats {
  average_rating: number;
  total_reviews: number;
  rating_distribution: {
    [key: number]: number;
  };
}