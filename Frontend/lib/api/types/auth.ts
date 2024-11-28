export interface User {
  id: number; // Changed from string to number to match the model
  phone_number: string; // Changed from email to phone_number to match the model
  email?: string; // Made optional to match the model
  is_active: boolean; // Added to match the model
  is_staff: boolean; // Added to match the model
  is_superuser: boolean; // Added to match the model
  is_vendor: boolean; // Added to match the model
  is_customer: boolean; // Added to match the model
  date_joined: string; // Added to match the model
  last_login?: string; // Added to match the model
  profile?: UserProfile; // Kept as is
}

export interface UserProfile {
  profile_picture?: string | null; // Changed from avatar to profile_picture and allowed null
  date_of_birth?: string | null; // Added to match the model
  gender?: 'M' | 'F' | 'O' | null; // Added to match the model
  bio?: string | null; // Kept as is
  website_url?: string | null; // Added to match the model
  timezone?: string | null; // Added to match the model
}

export interface LoginCredentials {
  phone_number: string; // Changed from email to phone_number to match the model
  password: string;
}

export interface RegisterData {
  phone_number: string; // Changed from email to phone_number to match the model
  email?: string; // Made optional to match the model
  password: string;
  password2: string; // Added to confirm password during registration
}

export interface AuthResponse {
  token: { // Changed structure to match the model
    access: string;
    refresh: string;
  };
  user: User; // Kept as is
}
