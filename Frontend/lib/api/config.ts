export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login/',
  REGISTER: '/auth/register/',
  LOGOUT: '/auth/logout/',
  REFRESH_TOKEN: '/auth/refresh/',
  PROFILE: '/auth/profiles/',
  PASSWORD_CHANGE: '/auth/password/change/',
  PASSWORD_RESET: '/auth/password/reset/',

  // Rest of the endpoints remain the same...
};

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-App-Version': process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  'X-Platform': 'web',
};

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