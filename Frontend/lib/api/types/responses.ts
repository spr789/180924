/**
 * Base API response interface
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
  timestamp: string;
  requestId?: string;
}

/**
 * API error response interface
 */
export interface ApiError {
  code: string;
  message: string;
  status: number;
  errors?: Record<string, string[]>;
  timestamp: string;
  requestId?: string;
}

/**
 * Pagination metadata interface
 */
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Paginated response wrapper interface
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}