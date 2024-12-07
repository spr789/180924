export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sale_price?: number;
  stock: number;
  category: string;
  images: string[];
  vendor: Vendor; // Updated to use Vendor interface
  rating: number;
  reviews_count: number;
  created_at: string;
  updated_at: string;
}

export interface Vendor {
  id: string;
  name: string;
  description: string; // Added description to match the model
  logo: string; // Added logo to match the model
  cover_image: string; // Added cover_image to match the model
  rating: number;
  reviews_count: number;
  products_count: number; // Added products_count to match the model
  followers_count: number; // Added followers_count to match the model
  contact_email: string; // Added contact_email to match the model
  contact_phone: string; // Added contact_phone to match the model
  social_media?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  badges: string[]; // Added badges to match the model
  metrics: {
    response_rate: number; // Added metrics to match the model
    ship_on_time: number; // Added metrics to match the model
    order_completion: number; // Added metrics to match the model
  };
  created_at: string;
}

export interface ProductFilters {
  category?: string;
  min_price?: number;
  max_price?: number;
  rating?: number;
  sort_by?: 'price_asc' | 'price_desc' | 'newest' | 'rating';
  page?: number;
  limit?: number;
}