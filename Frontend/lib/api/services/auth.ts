import { ApiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { User, LoginCredentials, RegisterData } from '../types/auth';
import { ApiResponse } from '../types/responses';

export class AuthService {
  private client: ApiClient;

  constructor() {
    this.client = ApiClient.getInstance();
    console.log("AuthService initialized with ApiClient instance.");
  }

  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    console.log("Attempting to log in with credentials:", credentials);
    const response = await this.client.post<{ user: User; token: string }>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    console.log("Login response received:", response);
    return response;
  }

  async register(data: RegisterData): Promise<ApiResponse<{ user: User; token: string }>> {
    console.log("Attempting to register with data:", data);
    const response = await this.client.post<{ user: User; token: string }>(API_ENDPOINTS.AUTH.REGISTER, data);
    console.log("Registration response received:", response);
    return response;
  }

  async logout(): Promise<void> {
    console.log("Logging out...");
    await this.client.post(API_ENDPOINTS.AUTH.LOGOUT);
    this.client.clearToken();
    console.log("Logged out and token cleared.");
  }

  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    console.log("Updating profile with data:", data);
    const response = await this.client.patch<User>(API_ENDPOINTS.AUTH.PROFILE, data);
    console.log("Profile update response received:", response);
    return response;
  }

  async changePassword(data: { old_password: string; new_password: string }): Promise<ApiResponse<void>> {
    console.log("Changing password...");
    const response = await this.client.post<void>(API_ENDPOINTS.AUTH.PASSWORD.CHANGE, data);
    console.log("Password change response received:", response);
    return response;
  }
}