/**
 * API endpoint configuration
 * Centralized endpoint management for the entire application
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login/',
    REGISTER: '/auth/register/',
    LOGOUT: '/auth/logout/',
    REFRESH: '/auth/refresh/',
    PROFILE: '/auth/profiles/',
    PASSWORD: {
      CHANGE: '/auth/password/change/',
      RESET: '/auth/password/reset/',
      RESET_CONFIRM: '/auth/password/reset/confirm/',
    },
  },
  PRODUCTS: {
    LIST: '/products/',
    DETAIL: (id: string) => `/products/${id}/`,
    REVIEWS: (id: string) => `/products/${id}/reviews/`,
    CATEGORIES: '/products/categories/',
  },
  ORDERS: {
    LIST: '/orders/',
    DETAIL: (id: string) => `/orders/${id}/`,
    CREATE: '/orders/create/',
    CANCEL: (id: string) => `/orders/${id}/cancel/`,
  },
  VENDORS: {
    LIST: '/vendors/',
    DETAIL: (id: string) => `/vendors/${id}/`,
    PRODUCTS: (id: string) => `/vendors/${id}/products/`,
    REVIEWS: (id: string) => `/vendors/${id}/reviews/`,
  },
  WISHLIST: {
    LIST: '/wishlist/',
    ADD: '/wishlist/add/',
    REMOVE: (id: string) => `/wishlist/${id}/`,
    MOVE_TO_CART: '/wishlist/move-to-cart/',
  },
} as const;