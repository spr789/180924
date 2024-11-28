// /lib/config/config.ts

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com', // Base API URL, can be overridden by environment variables
  TIMEOUT: 10000,  // Timeout for API requests in ms
  RETRY_ATTEMPTS: 3, // Number of retry attempts for failed requests
};

export const AUTH_CONFIG = {
  AUTH_TOKEN_KEY: 'auth_token',  // Key for storing authentication token in storage
  REFRESH_TOKEN_KEY: 'refresh_token',  // Key for storing refresh token in storage
  TOKEN_EXPIRES_IN: 3600,  // Token expiration time in seconds
  AUTH_HEADER: 'Authorization',  // Default Authorization header
};

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',  // Environment setting (development, production)
  isProduction: process.env.NODE_ENV === 'production', // Boolean for production environment
  isDevelopment: process.env.NODE_ENV === 'development', // Boolean for development environment
};

export const LOGGING = {
  LEVEL: process.env.LOGGING_LEVEL || 'info',  // Log level (debug, info, warn, error)
};

export const SEO_CONFIG = {
  SITE_NAME: 'My E-commerce Store', // Site name for SEO metadata
  DEFAULT_DESCRIPTION: 'Welcome to the best online store for exclusive products', // Default meta description
  DEFAULT_KEYWORDS: 'e-commerce, online store, exclusive products', // Default meta keywords
};
