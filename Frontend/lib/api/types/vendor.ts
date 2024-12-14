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
}