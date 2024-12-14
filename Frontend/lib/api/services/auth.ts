import { ApiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { User, LoginCredentials, RegisterData } from '../types/auth';
import { ApiResponse } from '../types/responses';
import { setItem, getItem, removeItem } from '../utils/storage'; // Import storage utilities

export class AuthService {
  private client: ApiClient;

  constructor() {
    this.client = ApiClient.getInstance();
  }

  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    console.log('Logging in with credentials: ser/au', credentials); // Added console log
    const response = await this.client.post<{ user: User; token: string }>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    console.log('Login response:', response); // Added console log for response
    console.log('Checking if response contains token');
    if (response.data.data.token) {
      console.log('Token found, storing in local storage');
      setToken(response.data.data.token); // Store token in local storage
    } else {
      console.log('No token found in response');
    }
    return response;
  }

  async register(data: RegisterData): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await this.client.post<{ user: User; token: string }>(API_ENDPOINTS.AUTH.REGISTER, data);
    if (response.data.data.token) {
      setToken(response.data.data.token); // Store token in local storage
    }
    return response;
  }

  async logout(): Promise<void> {
    await this.client.post(API_ENDPOINTS.AUTH.LOGOUT);
    this.client.clearToken();
    removeToken(); // Remove token from local storage
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

const getToken = () => {
  const token = getItem('auth_token'); // Use storage utility
  return token ? { access: token } : null;
};

const setToken = (token: string | undefined) => {
  if (token) {
    setItem('auth_token', token); // Use storage utility
  } else {
    console.error('Attempted to set an undefined token');
  }
};

const removeToken = () => {
  removeItem('auth_token'); // Use storage utility
};

export {
  getToken,
  setToken,
  removeToken
};