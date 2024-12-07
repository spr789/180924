import { ApiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { User, LoginCredentials, RegisterData } from '../types/auth';
import { ApiResponse } from '../types/responses';

export class AuthService {
  private client: ApiClient;

  constructor() {
    this.client = ApiClient.getInstance();
  }

  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await this.client.post<{ user: User; token: string }>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response;
  }

  async register(data: RegisterData): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await this.client.post<{ user: User; token: string }>(API_ENDPOINTS.AUTH.REGISTER, data);
    return response;
  }

  async logout(): Promise<void> {
    await this.client.post(API_ENDPOINTS.AUTH.LOGOUT);
    this.client.clearToken();
  }

  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    const response = await this.client.patch<User>(API_ENDPOINTS.AUTH.PROFILE, data);
    return response;
  }

  async changePassword(data: { old_password: string; new_password: string }): Promise<ApiResponse<void>> {
    const response = await this.client.post<void>(API_ENDPOINTS.AUTH.PASSWORD.CHANGE, data);
    return response;
  }
}