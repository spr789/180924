import { ApiClient } from '../client'
import { API_ENDPOINTS } from '../config'
import { ApiResponse, AuthResponse, User, PasswordResetRequest, PasswordResetConfirm, LoginCredentials, RegisterData, UserProfile, VendorProfile } from '../types'

export class AuthService {
  requestPasswordReset(data: PasswordResetRequest) {
    throw new Error('Method not implemented.')
  }
  
  confirmPasswordReset(data: PasswordResetConfirm) {
    throw new Error('Method not implemented.')
  }
  
  private client: ApiClient

  constructor() {
    this.client = ApiClient.getInstance()
  }

  // User Authentication
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ token: string; user: User }>> {
    const response = await this.client.post<ApiResponse<{ token: string; user: User }>>(
      API_ENDPOINTS.LOGIN,
      credentials
    )
    this.client.setToken(response.data.token)
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

  // User Profile
  async getProfile(): Promise<ApiResponse<UserProfile>> {
    return this.client.get<ApiResponse<UserProfile>>(API_ENDPOINTS.PROFILE)
  }

  async updateProfile(data: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    return this.client.patch<ApiResponse<UserProfile>>(API_ENDPOINTS.PROFILE, data)
  }

  async changePassword(data: { old_password: string; new_password: string }): Promise<ApiResponse<void>> {
    return this.client.post<ApiResponse<void>>(API_ENDPOINTS.PASSWORD_CHANGE, data)
  }

  // Vendor Authentication
  async vendorLogin(credentials: LoginCredentials): Promise<ApiResponse<{ token: string; user: User & { vendor_profile: VendorProfile } }>> {
    const response = await this.client.post<ApiResponse<{ token: string; user: User & { vendor_profile: VendorProfile } }>>(
      API_ENDPOINTS.VENDOR_LOGIN,
      credentials
    )
    this.client.setToken(response.data.token)
    return response
  }

  async vendorRegister(data: RegisterData & { business_name: string }): Promise<ApiResponse<{ token: string; user: User & { vendor_profile: VendorProfile } }>> {
    const response = await this.client.post<ApiResponse<{ token: string; user: User & { vendor_profile: VendorProfile } }>>(
      API_ENDPOINTS.VENDOR_REGISTER,
      data
    )
    this.client.setToken(response.data.token)
    return response
  }

  async getVendorProfile(): Promise<ApiResponse<VendorProfile>> {
    return this.client.get<ApiResponse<VendorProfile>>(API_ENDPOINTS.VENDOR_PROFILE)
  }

  async updateVendorProfile(data: Partial<VendorProfile>): Promise<ApiResponse<VendorProfile>> {
    return this.client.patch<ApiResponse<VendorProfile>>(API_ENDPOINTS.VENDOR_PROFILE, data)
  }
}