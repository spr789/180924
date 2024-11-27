export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'vendor' | 'admin'
  profile?: UserProfile
  created_at: string
  updated_at: string
}

export interface UserProfile {
  avatar?: string
  phone?: string
  address?: string
  bio?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}