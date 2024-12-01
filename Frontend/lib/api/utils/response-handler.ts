import { ApiResponse, PaginatedResponse, PaginationMeta } from '../types/responses';
import { HTTP_STATUS } from '../config';

/**
 * Handles API response formatting and processing
 */
export class ResponseHandler {
  /**
   * Format successful API response
   */
  static formatSuccess<T>(data: T, status = HTTP_STATUS.OK): ApiResponse<T> {
    return {
      data,
      status,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Format paginated API response
   */
  static formatPaginated<T>(
    data: T[],
    meta: PaginationMeta,
    status = HTTP_STATUS.OK
  ): PaginatedResponse<T> {
    return {
      data,
      meta,
      status,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Validate response status code
   */
  static isSuccessStatus(status: number): boolean {
    return status >= 200 && status < 300;
  }

  /**
   * Process API response with validation
   */
  static handleResponse<T>(response: ApiResponse<T>): T {
    if (this.isSuccessStatus(response.status)) {
      return response.data;
    }
    throw new Error('Invalid response status');
  }
}