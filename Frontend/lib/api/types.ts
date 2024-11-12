// Common Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  results: T[];
  count: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Order Types
export interface Order {
  id: string;
  user_id: number;
  status: OrderStatus;
  total_amount: number;
  items: OrderItem[];
  shipping_address: Address;
  payment_status: PaymentStatus;
  tracking_number?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  product: Product;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sale_price?: number;
  stock: number;
  category: string;
  images: string[];
  vendor: Vendor;
  rating: number;
  reviews_count: number;
  created_at: string;
  updated_at: string;
  is_active?: boolean;
  status?: string;
  free_shipping?: boolean;
  returnable?: boolean;
  collections?: number[];
}

// Vendor Types
export interface Vendor {
  id: string;
  name: string;
  description: string;
  logo: string;
  cover_image: string;
  rating: number;
  reviews_count: number;
  products_count: number;
  followers_count: number;
  address: Address;
  contact_email: string;
  contact_phone: string;
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
}

// Address Types
export interface Address {
  id: number;
  user_id: number;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}