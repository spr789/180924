export interface Order {
  id: string;
  user_id: string;
  items: OrderItem[];
  total_amount: number;
  status: OrderStatus;
  payment_status: PaymentStatus;
  shipping_address: Address;
  tracking_number?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  product_id: string;
  quantity: number;
  price: number;
  product: {
    name: string;
    image: string;
  };
}

export interface CreateOrderData {
  items: Array<{
    product_id: string;
    quantity: number;
  }>;
  shipping_address_id: string;
  payment_method: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}