import { ApiClient } from '../client'
import { API_ENDPOINTS } from '../config'
import { AuthResponse, PasswordResetRequest, PasswordResetConfirm, LoginCredentials, RegisterData, UserProfile, VendorProfile } from '../types'

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
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>(
      API_ENDPOINTS.LOGIN,
      credentials
    );
    this.client.setToken({ access: response.access, refresh: response.refresh });
    return response;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    console.log('Registering user with data:', data);
    const response = await this.client.post<AuthResponse>(
      API_ENDPOINTS.REGISTER,
      data
    );
    this.client.setToken({ access: response.access, refresh: response.refresh });
    return response;
  }

  async logout(): Promise<void> {
    console.log('Logging out user');
    await this.client.post(API_ENDPOINTS.LOGOUT)
    this.client.clearToken()  // Clear token on logout
    console.log('User logged out and token cleared');
  }

  // User Profile
  async getProfile(): Promise<ApiResponse<UserProfile>> {
    const token = this.client.getToken(); // Use the public getter method
    if (!token) {
      throw new Error('Unauthorized: Token is missing');
    }
    console.log('Fetching user profile');
    return await this.client.get<ApiResponse<UserProfile>>(API_ENDPOINTS.PROFILE);
  }

  async updateProfile(data: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    const token = this.client.getToken();  // Use the public getter method
    if (!token) {
      throw new Error('Unauthorized: Token is missing');
    }
    console.log('Updating user profile with data:', data);
    return this.client.patch<ApiResponse<UserProfile>>(API_ENDPOINTS.PROFILE, data)
  }

  async changePassword(data: { old_password: string; new_password: string }): Promise<ApiResponse<void>> {
    const token = this.client.getToken();  // Use the public getter method
    if (!token) {
      throw new Error('Unauthorized: Token is missing');
    }
    console.log('Changing user password');
    return this.client.post<ApiResponse<void>>(API_ENDPOINTS.PASSWORD_CHANGE, data)
  }

  // Vendor Authentication
  async vendorLogin(credentials: LoginCredentials): Promise<ApiResponse<{ refresh: string; access: string; user: User & { vendor_profile: VendorProfile } }>> {
    console.log('Vendor logging in with credentials:', credentials);
    const response = await this.client.post<ApiResponse<{ refresh: string; access: string; user: User & { vendor_profile: VendorProfile } }>>(
      API_ENDPOINTS.VENDOR_LOGIN,
      credentials
    )
    console.log('Vendor login successful, setting token:', response.access);
    this.client.setToken({ access: response.access, refresh: response.refresh });
    return response
  }

  async vendorRegister(data: RegisterData & { business_name: string }): Promise<ApiResponse<{ refresh: string; access: string; user: User & { vendor_profile: VendorProfile } }>> {
    console.log('Vendor registering with data:', data);
    const response = await this.client.post<ApiResponse<{ refresh: string; access: string; user: User & { vendor_profile: VendorProfile } }>>(
      API_ENDPOINTS.VENDOR_REGISTER,
      data
    )
    console.log('Vendor registration successful, setting token:', response.access);
    this.client.setToken({ access: response.access, refresh: response.refresh });
    return response
  }

  async getVendorProfile(): Promise<ApiResponse<VendorProfile>> {
    const token = this.client.getToken();  // Use the public getter method
    if (!token) {
      throw new Error('Unauthorized: Token is missing');
    }
    console.log('Fetching vendor profile');
    return this.client.get<ApiResponse<VendorProfile>>(API_ENDPOINTS.VENDOR_PROFILE)
  }

  async updateVendorProfile(data: Partial<VendorProfile>): Promise<ApiResponse<VendorProfile>> {
    const token = this.client.getToken();  // Use the public getter method
    if (!token) {
      throw new Error('Unauthorized: Token is missing');
    }
    console.log('Updating vendor profile with data:', data);
    return this.client.patch<ApiResponse<VendorProfile>>(API_ENDPOINTS.VENDOR_PROFILE, data)
  }
}
