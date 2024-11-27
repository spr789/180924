export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  material: string;
  image: string;
  category: string;
  vendor: {
    id: string;
    name: string;
  };
  rating: number;
  reviews: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  category?: string;
  material?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'rating';
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}