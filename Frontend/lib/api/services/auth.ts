import { ApiClient } from '../client'
import { API_ENDPOINTS } from '../config'
import { ApiResponse, LoginCredentials, RegisterData, User, AuthResponse, PasswordResetRequest, PasswordResetConfirm } from '../types'

export class AuthService {
  private client: ApiClient

  constructor() {
    this.client = ApiClient.getInstance()
  }

  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    const response = await this.client.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.LOGIN,
      credentials
    )
    this.client.setToken(response.data.access)
    return response
  }

  async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
    const response = await this.client.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.REGISTER,
      data
    )
    this.client.setToken(response.data.access)
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

  async changePassword(data: { old_password: string; new_password: string }): Promise<ApiResponse<void>> {
    return this.client.post<ApiResponse<void>>(API_ENDPOINTS.PASSWORD_CHANGE, data)
  }

  async requestPasswordReset(data: PasswordResetRequest): Promise<ApiResponse<void>> {
    return this.client.post<ApiResponse<void>>(API_ENDPOINTS.PASSWORD_RESET, data)
  }

  async confirmPasswordReset(data: PasswordResetConfirm): Promise<ApiResponse<void>> {
    return this.client.post<ApiResponse<void>>(API_ENDPOINTS.PASSWORD_RESET, data)
  }
}