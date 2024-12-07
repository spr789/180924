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
  current_page: number; // Changed to snake_case to match the convention
  total_pages: number; // Changed to snake_case to match the convention
  page_size: number; // Changed to snake_case to match the convention
  total_count: number; // Changed to snake_case to match the convention
  has_next_page: boolean; // Changed to snake_case to match the convention
  has_previous_page: boolean; // Changed to snake_case to match the convention
}

/**
 * Paginated response wrapper interface
 */
export interface PaginatedResponse<T> extends ApiResponse<T> {
  items: T[];
  meta: PaginationMeta;
}