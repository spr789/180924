import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { handleApiError } from '../errors'
import { storage } from '../storage'

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Request interceptor
client.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = storage.get('token')
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(handleApiError(error))
  }
)

// Response interceptor
client.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config
    
    if (error.response?.status === 401 && originalRequest) {
      try {
        const refreshToken = storage.get('refreshToken')
        const response = await client.post('/auth/refresh', { refreshToken })
        const { token } = response.data
        
        storage.set('token', token)
        originalRequest.headers.Authorization = `Bearer ${token}`
        
        return client(originalRequest)
      } catch (refreshError) {
        storage.remove('token')
        storage.remove('refreshToken')
        window.location.href = '/login'
        return Promise.reject(handleApiError(refreshError))
      }
    }
    
    return Promise.reject(handleApiError(error))
  }
)

export { client }