import { ApiError, ApiResponse } from '../types/responses';

export class ResponseHandler {
  static validateStatus(status: number): boolean {
    return status >= 200 && status < 300;
  }

  static formatError(error: any): ApiError {
    if (error.response) {
      // Server responded with error
      return {
        code: error.response.data.code || 'SERVER_ERROR',
        message: error.response.data.message || 'An error occurred',
        status: error.response.status,
        errors: error.response.data.errors,
        timestamp: new Date().toISOString(),
        requestId: error.response.headers['x-request-id'],
      };
    }

    if (error.request) {
      // Request made but no response
      return {
        code: 'NETWORK_ERROR',
        message: 'Network error occurred',
        status: 0,
        timestamp: new Date().toISOString(),
      };
    }

    // Something else happened
    return {
      code: 'CLIENT_ERROR',
      message: error.message || 'An unexpected error occurred',
      status: 500,
      timestamp: new Date().toISOString(),
    };
  }

  static formatSuccess<T>(data: T, status: number): ApiResponse<T> {
    return {
      data,
      status,
      timestamp: new Date().toISOString(),
    };
  }

  static handleError(error: any): never {
    const formattedError = this.formatError(error);
    console.error('[API Error]', formattedError);

    // Log to monitoring service if available
    if (process.env.NEXT_PUBLIC_ENABLE_MONITORING === 'true') {
      // Implement error logging to your monitoring service
    }

    throw formattedError;
  }
}
