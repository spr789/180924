export interface Vendor {
  id: string;
  name: string;
  description: string;
  logo: string;
  cover_image: string;
  average_rating: number;
  rating_count: number;
  products_count: number;
  followers_count: number;
  contact_email: string;
  contact_phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
  social_media?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  badges: string[];
  metrics: {
    response_rate: number;
    ship_on_time: number;
    order_completion: number;
  };
  created_at: string;
  updated_at: string;
}