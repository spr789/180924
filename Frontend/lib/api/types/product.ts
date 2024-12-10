export interface Product {
  id: string;
  vendor: number; // Changed to match the model
  name: string;
  slug: string; // Added slug to match the model
  description: string;
  brand: string; // Added brand to match the model
  original_price: string; // Changed to string to match the API response
  discounted_price?: string; // Changed to string and made optional to match the API response
  discount_start_date?: string | null; // Added to match the model
  discount_end_date?: string | null; // Added to match the model
  category: number; // Changed to number to match the model
  collections?: number[]; // Added collections to match the model
  tags?: string[]; // Added tags to match the model
  stock: number;
  sku: string; // Added sku to match the model
  upc?: string | null; // Added upc to match the model
  weight: string; // Added weight to match the model
  dimensions: string; // Added dimensions to match the model
  condition: string; // Added condition to match the model
  shipping_cost: string; // Changed to string to match the API response
  free_shipping: boolean; // Added free_shipping to match the model
  is_digital: boolean; // Added is_digital to match the model
  backorder: boolean; // Added backorder to match the model
  low_stock_threshold: number; // Added low_stock_threshold to match the model
  warranty_period: string; // Added warranty_period to match the model
  returnable: boolean; // Added returnable to match the model
  is_active: boolean; // Added is_active to match the model
  status: string; // Added status to match the model
  average_rating: string; // Changed to string to match the API response
  rating_count: number; // Kept as rating_count to match the model
  available_from?: string | null; // Added available_from to match the model
  available_until?: string | null; // Added available_until to match the model
  created_at: string;
  updated_at: string;
  images?: {
    id: number;
    image: string;
    alt_text?: string | null;
  }[];
}

export interface Vendor {
  id: string;
  name: string;
  description: string; // Kept description to match the model
  logo: string; // Kept logo to match the model
  cover_image: string; // Kept cover_image to match the model
  average_rating: number; // Kept as average_rating to match the model
  rating_count: number; // Kept as rating_count to match the model
  products_count: number; // Kept products_count to match the model
  followers_count: number; // Kept followers_count to match the model
  contact_email: string; // Kept contact_email to match the model
  contact_phone: string; // Kept contact_phone to match the model
  social_media?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  badges: string[]; // Kept badges to match the model
  metrics: {
    response_rate: number; // Kept response_rate to match the model
    ship_on_time: number; // Kept ship_on_time to match the model
    order_completion: number; // Kept order_completion to match the model
  };
  created_at: string;
}

export interface ProductFilters {
  category?: number; // Changed to number to match the model
  min_price?: string;
  max_price?: string;
  average_rating?: number; // Kept as average_rating to match the model
  sort_by?: 'price_asc' | 'price_desc' | 'newest' | 'average_rating'; // Kept as is
  page?: number;
  limit?: number;
}