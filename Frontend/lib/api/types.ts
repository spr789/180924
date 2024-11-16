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

// Auth Types
export interface User {
  id: number;
  phone_number: string;
  email?: string;
  username: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  is_vendor: boolean;
  is_customer: boolean;
  date_joined: string;
  last_login?: string;
  profile?: UserProfile;
}

export interface UserProfile {
  profile_picture?: string;
  date_of_birth?: string;
  gender?: 'M' | 'F' | 'O';
  bio?: string;
  website_url?: string;
  timezone?: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface LoginCredentials {
  phone_number: string;
  password: string;
}

export interface RegisterData {
  phone_number: string;
  username: string;
  email?: string;
  password: string;
}

export interface PasswordResetRequest {
  phone_number: string;
}

export interface PasswordResetConfirm {
  token: string;
  password: string;
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

// Vendor Profile Types
export interface VendorProfile {
  vendor_id: string;
  business_name: string;
  description: string;
  logo: string;
  cover_image: string;
  contact_email: string;
  contact_phone: string;
  social_media?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  address: Address;
  created_at: string;
  updated_at: string;
}

// Address Types
export interface Address {
  id: number;
  user?: number;
  guest_user?: string;
  address_line_1: string;
  address_line_2?: string;
  landmark?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  latitude?: number;
  longitude?: number;
  address_type: 'home' | 'work' | 'billing' | 'shipping';
  is_default: boolean;
  address_verified: boolean;
}