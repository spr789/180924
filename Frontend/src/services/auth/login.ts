// services/auth/login.ts
import api from '../api';

export interface LoginResponse {
  token: string;
  // Add other fields returned by your API if necessary
}

export const login = async (phoneNumber: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/accounts/login/', {
      phone_number: phoneNumber,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error; // Rethrow the error to be handled in the container
  }
};
