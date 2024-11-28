// Base response type for all API responses
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
  timestamp: string;
  requestId?: string;
}

// Error response structure
export interface ApiError {
  code: string;
  message: string;
  status: number;
  errors?: Record<string, string[]>;
  timestamp: string;
  requestId?: string;
}

// Pagination metadata
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Paginated response wrapper
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}
