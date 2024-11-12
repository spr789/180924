import { ApiClient } from '../client'
import { API_ENDPOINTS } from '../config'
import { ApiResponse, LoginCredentials, RegisterData, User } from '../types'

export class AuthService {
  private client: ApiClient

  constructor() {
    this.client = ApiClient.getInstance()
  }

  async login(credentials: LoginCredentials): Promise<ApiResponse<{ token: string; user: User }>> {
    const response = await this.client.post<ApiResponse<{ token: string; user: User }>>(
      API_ENDPOINTS.LOGIN,
      credentials
    )
    this.client.setToken(response.data.token)
    return response
  }

  async register(data: RegisterData): Promise<ApiResponse<{ token: string; user: User }>> {
    const response = await this.client.post<ApiResponse<{ token: string; user: User }>>(
      API_ENDPOINTS.REGISTER,
      data
    )
    this.client.setToken(response.data.token)
    return response
  }

  async logout(): Promise<void> {
    await this.client.post(API_ENDPOINTS.LOGOUT)
    this.client.clearToken()
  }

  async getProfile(): Promise<ApiResponse<User>> {
    return this.client.get<ApiResponse<User>>(API_ENDPOINTS.PROFILE)
  }

  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return this.client.patch<ApiResponse<User>>(API_ENDPOINTS.PROFILE, data)
  }

  async changePassword(data: { old_password: string; new_password1: string; new_password2: string }): Promise<ApiResponse<void>> {
    return this.client.post<ApiResponse<void>>(API_ENDPOINTS.PASSWORD_CHANGE, data)
  }
}