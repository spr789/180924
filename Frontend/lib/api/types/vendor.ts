export interface Vendor {
  user: {
    username: string | null;
    email: string;
    phone_number: string;
    id: number;
  };
  profile: {
    business_name: string;
    business_address: string;
    website_url: string;
    verification_status: string;
  };
  analytics: {
    total_sales?: number;
    total_orders?: number;
    total_revenue?: number;
    last_updated?: string;
  };
  token: {
    access: string;
    refresh: string;
  };
  orders: VendorOrder[];
  payouts: VendorPayout[];
  shipments: VendorShipment[];
  notifications: VendorNotification[];
}

export interface VendorOrder {
  order: string;
  product: string;
  quantity: number;
  price: number;
  status: string;
  created_at: string;
}

export interface VendorPayout {
  amount: number;
  payout_date: string;
  status: string;
}

export interface VendorShipment {
  shipment: string;
  order: string;
  shipped_date: string;
  delivery_date: string;
  tracking_number: string;
  status: string;
}

export interface VendorNotification {
  message: string;
  created_at: string;
  read: boolean;
}

export interface VendorResponse {
  data: Vendor[];
  count: number;
  next: string | null;
  previous: string | null;
}

export interface VendorFollowResponse {
  message: string;
}

export interface VendorUnfollowResponse {
  message: string;
}

export interface VendorFollowRequest {
  vendor_id: number;
}

export interface VendorUnfollowRequest {
  vendor_id: number;
}

export interface VendorLoginRequest {
  phone_number: string;
  password: string;
}

