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
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ refresh: string; access: string; user: User }>> {
    console.log('--- Login Attempt ---');
    console.log('Input Credentials:', {
      phone_number: credentials.phone_number,
      password: credentials.password,
    });
    
    try {
      const response = await this.client.post<ApiResponse<{ refresh: string; access: string; user: User }>>(
        API_ENDPOINTS.LOGIN,
        credentials
      );
      console.log('Login successful! Access token received:', response.data.access);
      this.client.setToken(response.data.access);  // Ensure the access token is set
      console.log('Access token has been set successfully.');
      return response;
    } catch (error) {
      console.error('Login failed due to an error:', error);
      throw new Error('Login failed. Please check your credentials and try again.');
    }
  }

  async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
    console.log('Registering user with data:', data);
    const response = await this.client.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.REGISTER,
      data
    )
    console.log('Registration successful, setting token:', response.data.access);
    this.client.setToken(response.data.access)  // Ensure the access token is set
    return response
  }

  async logout(): Promise<void> {
    console.log('Logging out user');
    await this.client.post(API_ENDPOINTS.LOGOUT)
    this.client.clearToken()  // Clear token on logout
    console.log('User logged out and token cleared');
  }

  // User Profile
  async getProfile(): Promise<any> {
    try {
      const token = this.client.getToken(); // Use the public getter method
      if (!token) {
        throw new Error('No token found');
      }

      // Fetch user profile using the token
      return await this.client.get(API_ENDPOINTS.PROFILE);
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }

  async updateProfile(data: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    const token = this.client.getToken();  // Use the public getter method
    if (!token) {
      throw new Error('Unauthorized: Token is missing')
    }
    console.log('Updating user profile with data:', data);
    return this.client.patch<ApiResponse<UserProfile>>(API_ENDPOINTS.PROFILE, data)
  }

  async changePassword(data: { old_password: string; new_password: string }): Promise<ApiResponse<void>> {
    const token = this.client.getToken();  // Use the public getter method
    if (!token) {
      throw new Error('Unauthorized: Token is missing')
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
    console.log('Vendor login successful, setting token:', response.data.access);
    this.client.setToken(response.data.access)  // Ensure the access token is set
    return response
  }

  async vendorRegister(data: RegisterData & { business_name: string }): Promise<ApiResponse<{ refresh: string; access: string; user: User & { vendor_profile: VendorProfile } }>> {
    console.log('Vendor registering with data:', data);
    const response = await this.client.post<ApiResponse<{ refresh: string; access: string; user: User & { vendor_profile: VendorProfile } }>>(
      API_ENDPOINTS.VENDOR_REGISTER,
      data
    )
    console.log('Vendor registration successful, setting token:', response.data.access);
    this.client.setToken(response.data.access)  // Ensure the access token is set
    return response
  }

  async getVendorProfile(): Promise<ApiResponse<VendorProfile>> {
    const token = this.client.getToken();  // Use the public getter method
    if (!token) {
      throw new Error('Unauthorized: Token is missing')
    }
    console.log('Fetching vendor profile');
    return this.client.get<ApiResponse<VendorProfile>>(API_ENDPOINTS.VENDOR_PROFILE)
  }

  async updateVendorProfile(data: Partial<VendorProfile>): Promise<ApiResponse<VendorProfile>> {
    const token = this.client.getToken();  // Use the public getter method
    if (!token) {
      throw new Error('Unauthorized: Token is missing')
    }
    console.log('Updating vendor profile with data:', data);
    return this.client.patch<ApiResponse<VendorProfile>>(API_ENDPOINTS.VENDOR_PROFILE, data)
  }
}
