import { AxiosError } from 'axios';
import { AppError } from '..';

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

export interface ErrorResponse {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

export function handleResponse<T>(response: ApiResponse<T>): T {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new AppError(response.message || 'Request failed', response.status);
}

export function handleError(error: unknown): never {
  if (error instanceof AppError) {
    throw error;
  }

  if (error instanceof AxiosError) {
    const response = error.response?.data as ErrorResponse;
    throw new AppError(
      response?.message || error.message,
      error.response?.status || 500,
      response?.code
    );
  }

  throw new AppError('An unexpected error occurred');
}
