import { z } from 'zod';

/**
 * Common validation schemas
 */
export const validationSchemas = {
  /**
   * Login form validation
   */
  login: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  }),

  /**
   * Registration form validation
   */
  register: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    name: z.string().min(2, 'Name must be at least 2 characters'),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }),

  /**
   * Product validation
   */
  product: z.object({
    name: z.string().min(1, 'Product name is required'),
    price: z.number().positive('Price must be positive'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    category: z.string().min(1, 'Category is required'),
    stock: z.number().int().nonnegative('Stock must be 0 or greater'),
  }),

  /**
   * Review validation
   */
  review: z.object({
    rating: z.number().min(1).max(5),
    title: z.string().min(1, 'Title is required'),
    comment: z.string().min(10, 'Review must be at least 10 characters'),
  }),
};

/**
 * Validation utilities
 */
export const validation = {
  /**
   * Validate email format
   */
  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  /**
   * Validate phone number format
   */
  isValidPhone(phone: string): boolean {
    return /^\+?[\d\s-]{10,}$/.test(phone);
  },

  /**
   * Validate password strength
   */
  isStrongPassword(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  },
};