/**
 * Core API configuration
 */
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  version: '1.0.0',
  defaultHeaders: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-App-Version': process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    'X-Platform': 'web',
  },
} as const;

/**
 * HTTP Status codes used throughout the application
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;