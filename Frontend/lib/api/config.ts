export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login/',
  REGISTER: '/auth/register/', 
  LOGOUT: '/auth/logout/',
  PROFILE: '/auth/profiles/',
  PASSWORD_CHANGE: '/auth/password/change/',
  PASSWORD_RESET: '/auth/password/reset/',

  // Vendor Auth
  VENDOR_REGISTER: '/vendor-register/',
  VENDOR_LOGIN: '/vendor-login/',

  // Vendor Dashboard  
  VENDOR_PROFILE: '/vendor-profile/',
  VENDOR_ORDERS: '/vendor-orders/',
  VENDOR_SHIPMENTS: '/vendor-shipments/',
  VENDOR_PAYOUTS: '/vendor-payouts/',
  VENDOR_NOTIFICATIONS: '/vendor-notifications/',
  VENDOR_ANALYTICS: '/vendor-analytics/',

  // Catalog
  CATEGORIES: '/catalog/categories/',
  CATEGORY_DETAIL: (slug: string) => `/catalog/categories/${slug}/`,
  COLLECTIONS: '/catalog/collections/',
  COLLECTION_DETAIL: (slug: string) => `/catalog/collections/${slug}/`,


  // Products
  PRODUCTS: '/products/',
  PRODUCT_DETAIL: (id: string) => `/products/${id}/`,
  
  // Orders
  ORDERS: '/orders/',
  ORDER_DETAIL: (id: string) => `/orders/${id}/`,
  
  // Cart
  CART: '/cart/',
  CART_ADD: '/cart/add/',
  CART_REMOVE: '/cart/remove/',
  
  // Addresses
  ADDRESSES: '/addresses/',
  ADDRESS_DETAIL: (id: number) => `/addresses/${id}/`,
  
  // Wishlist
  WISHLIST: '/wishlist/',
  WISHLIST_ADD: '/wishlist/add/',
  WISHLIST_REMOVE: '/wishlist/remove/',
}

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}