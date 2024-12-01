export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sale_price?: number;
  stock: number;
  category: string;
  images: string[];
  rating: number;
  reviews_count: number;
  vendor: {
    id: string;
    name: string;
  };
  created_at: string;
  updated_at: string;
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