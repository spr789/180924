import { BaseService } from './base.service'
import { AuthResponse, LoginCredentials, RegisterData, User } from '../types'

export class AuthService extends BaseService {
  constructor() {
    super('/auth')
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.post<AuthResponse>('/login', credentials)
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    return this.post<AuthResponse>('/register', data)
  }

  async logout(): Promise<void> {
    return this.post('/logout')
  }

  async getProfile(): Promise<User> {
    return this.get<User>('/profile')
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    return this.put<User>('/profile', data)
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    return this.post<AuthResponse>('/refresh', { refreshToken })
  }
}