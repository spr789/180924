// /lib/api/utils/axios.ts

import axios, { AxiosInstance } from 'axios';
import { API_CONFIG } from '../../config/config'; // Import API configuration (base URL, timeout)

const axiosClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL, // Set base URL for all API requests
  timeout: API_CONFIG.TIMEOUT, // Set timeout for API requests
  headers: {
    'Content-Type': 'application/json', // Default Content-Type for API requests
    Accept: 'application/json', // Default Accept header for API responses
  },
});

export default axiosClient;
