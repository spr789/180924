// /lib/api/utils/response-interceptor.ts

import axiosClient from './axios'; // Import the Axios client
import { ERROR_MESSAGES } from './constants'; // Import error messages
import { handleError } from './error-handler'; // Import error handler

// Response interceptor to handle the response globally
axiosClient.interceptors.response.use(
  (response) => {
    return response; // Return the response if it's successful
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // Handle specific HTTP status codes
      switch (status) {
        case 401:
          console.error(ERROR_MESSAGES.UNAUTHORIZED); // Unauthorized, handle accordingly
          break;
        case 403:
          console.error(ERROR_MESSAGES.FORBIDDEN); // Forbidden, handle accordingly
          break;
        case 404:
          console.error(ERROR_MESSAGES.NOT_FOUND); // Not Found, handle accordingly
          break;
        case 500:
          console.error(ERROR_MESSAGES.INTERNAL_SERVER_ERROR); // Internal Server Error, handle accordingly
          break;
        default:
          console.error(ERROR_MESSAGES.UNKNOWN_ERROR); // Handle unknown errors
      }
    }

    // Call custom error handler
    handleError(error); // Handle the error globally (e.g., show notifications, log the error, etc.)

    return Promise.reject(error); // Reject the error so it can be handled by individual requests
  }
);
