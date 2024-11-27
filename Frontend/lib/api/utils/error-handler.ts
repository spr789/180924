import { AxiosError } from 'axios'
import { ApiError } from '../types'

export function handleApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    const response = error.response?.data
    return {
      message: response?.message || error.message,
      code: response?.code,
      errors: response?.errors,
      status: error.response?.status || 500,
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      status: 500,
    }
  }

  return {
    message: 'An unexpected error occurred',
    status: 500,
  }
}