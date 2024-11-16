import { ApiClient } from '../client'
import { API_ENDPOINTS } from '../config'
import { ApiResponse, AuthResponse, User, PasswordResetRequest, PasswordResetConfirm, LoginCredentials, RegisterData, UserProfile, VendorProfile } from '../types'

export class AuthService {
  requestPasswordReset(data: PasswordResetRequest) {
    console.log("Requesting password reset with data:", data);
    throw new Error('Method not implemented.')
  }
  
  confirmPasswordReset(data: PasswordResetConfirm) {
    console.log("Confirming password reset with data:", data);
    throw new Error('Method not implemented.')
  }
  
  private client: ApiClient

  constructor() {
    console.log("Initializing AuthService and getting ApiClient instance");
    this.client = ApiClient.getInstance()
  }

  // User Authentication
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ refresh: string; access: string; user: User }>> {
    console.log("Logging in with credentials:", credentials);
    const response = await this.client.post<ApiResponse<{ refresh: string; access: string; user: User }>>(
      API_ENDPOINTS.LOGIN,
      credentials
    )
    console.log("Login response received:", response);
    this.client.setToken(response.data.access)  // Ensure the access token is set
    return response
  }

  async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
    console.log("Registering with data:", data);
    const response = await this.client.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.REGISTER,
      data
    )
    console.log("Registration response received:", response);
    this.client.setToken(response.data.access)  // Ensure the access token is set
    return response
  }

  async logout(): Promise<void> {
    console.log("Logging out");
    await this.client.post(API_ENDPOINTS.LOGOUT)
    this.client.clearToken()  // Clear token on logout
    console.log("Logged out and token cleared");
  }

  // User Profile
  async getProfile(): Promise<ApiResponse<UserProfile>> {
    console.log("Fetching user profile");
    const token = this.client.getToken();  // Ensure token is included in the request
    if (!token) {
      throw new Error('Unauthorized: Token is missing')
    }
    return this.client.get<ApiResponse<UserProfile>>(API_ENDPOINTS.PROFILE)
  }

  async updateProfile(data: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    console.log("Updating user profile with data:", data);
    const token = this.client.getToken();  // Ensure token is included in the request
    if (!token) {
      throw new Error('Unauthorized: Token is missing')
    }
    return this.client.patch<ApiResponse<UserProfile>>(API_ENDPOINTS.PROFILE, data)
  }

  async changePassword(data: { old_password: string; new_password: string }): Promise<ApiResponse<void>> {
    console.log("Changing password with data:", data);
    const token = this.client.getToken();  // Ensure token is included in the request
    if (!token) {
      throw new Error('Unauthorized: Token is missing')
    }
    return this.client.post<ApiResponse<void>>(API_ENDPOINTS.PASSWORD_CHANGE, data)
  }

  // Vendor Authentication
  async vendorLogin(credentials: LoginCredentials): Promise<ApiResponse<{ refresh: string; access: string; user: User & { vendor_profile: VendorProfile } }>> {
    console.log("Vendor logging in with credentials:", credentials);
    const response = await this.client.post<ApiResponse<{ refresh: string; access: string; user: User & { vendor_profile: VendorProfile } }>>(
      API_ENDPOINTS.VENDOR_LOGIN,
      credentials
    )
    console.log("Vendor login response received:", response);
    this.client.setToken(response.data.access)  // Ensure the access token is set
    return response
  }

  async vendorRegister(data: RegisterData & { business_name: string }): Promise<ApiResponse<{ refresh: string; access: string; user: User & { vendor_profile: VendorProfile } }>> {
    console.log("Vendor registering with data:", data);
    const response = await this.client.post<ApiResponse<{ refresh: string; access: string; user: User & { vendor_profile: VendorProfile } }>>(
      API_ENDPOINTS.VENDOR_REGISTER,
      data
    )
    console.log("Vendor registration response received:", response);
    this.client.setToken(response.data.access)  // Ensure the access token is set
    return response
  }

  async getVendorProfile(): Promise<ApiResponse<VendorProfile>> {
    console.log("Fetching vendor profile");
    const token = this.client.getToken();  // Ensure token is included in the request
    if (!token) {
      throw new Error('Unauthorized: Token is missing')
    }
    return this.client.get<ApiResponse<VendorProfile>>(API_ENDPOINTS.VENDOR_PROFILE)
  }

  async updateVendorProfile(data: Partial<VendorProfile>): Promise<ApiResponse<VendorProfile>> {
    console.log("Updating vendor profile with data:", data);
    const token = this.client.getToken();  // Ensure token is included in the request
    if (!token) {
      throw new Error('Unauthorized: Token is missing')
    }
    return this.client.patch<ApiResponse<VendorProfile>>(API_ENDPOINTS.VENDOR_PROFILE, data)
  }
}
