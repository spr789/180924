// /lib/utils/constants.ts

export const API_CONSTANTS = {
  // API endpoints
  PRODUCTS_ENDPOINT: '/products',
  ORDERS_ENDPOINT: '/orders',
  REVIEWS_ENDPOINT: '/reviews',
  VENDORS_ENDPOINT: '/vendors',
  WISHLIST_ENDPOINT: '/wishlist',
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_REFRESH: '/auth/refresh',
};

export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized access. Please log in.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  INTERNAL_SERVER_ERROR: 'An unexpected error occurred. Please try again later.',
};

export const STORAGE_KEYS = {
  USER_TOKEN: 'auth_token',
  USER_REFRESH_TOKEN: 'refresh_token',
  USER_PROFILE: 'user_profile',
};

export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required.',
  EMAIL_INVALID: 'Please enter a valid email address.',
  PASSWORD_TOO_SHORT: 'Password must be at least 6 characters.',
};
