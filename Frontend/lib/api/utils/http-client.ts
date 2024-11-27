import axios from 'axios'
import { storage } from '@/lib/utils/storage'
import { handleApiError } from './error-handler'

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

client.interceptors.request.use(
  (config) => {
    const token = storage.get('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(handleApiError(error))
)

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

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