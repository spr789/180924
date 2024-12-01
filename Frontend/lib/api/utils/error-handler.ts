import { ApiError } from '../types/responses';
import { HTTP_STATUS } from '../config';

/**
 * Centralized error handling utility
 * Formats and processes API errors consistently
 */
export class ErrorHandler {
  /**
   * Format API error response
   */
  static formatError(error: unknown): ApiError {
    if (error instanceof Error) {
      return {
        message: error.message,
        code: 'UNKNOWN_ERROR',
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
      };
    }

    // Handle axios error responses
    if (error && typeof error === 'object' && 'response' in error) {
      const response = (error as any).response?.data;
      return {
        message: response?.message || 'An error occurred',
        code: response?.code || 'API_ERROR',
        status: response?.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
        errors: response?.errors,
        timestamp: new Date().toISOString(),
      };
    }

    // Default error
    return {
      message: 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR',
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Log error to monitoring service
   */
  static logError(error: ApiError): void {
    console.error('[API Error]', error);
    
    // Add monitoring service integration here
    if (process.env.NEXT_PUBLIC_ENABLE_MONITORING === 'true') {
      // Implement error logging
    }
  }

  /**
   * Handle API error with logging and formatting
   */
  static handleError(error: unknown): never {
    const formattedError = this.formatError(error);
    this.logError(formattedError);
    throw formattedError;
  }
}