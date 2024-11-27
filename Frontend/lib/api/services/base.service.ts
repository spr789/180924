import { client } from '../utils/http-client'
import { ApiResponse, PaginationParams } from '../types'

export class BaseService {
  constructor(protected readonly baseUrl: string) {}

  protected async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const response = await client.get(`${this.baseUrl}${endpoint}`, { params })
    return response.data
  }

  protected async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    const response = await client.post(`${this.baseUrl}${endpoint}`, data)
    return response.data
  }

  protected async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    const response = await client.put(`${this.baseUrl}${endpoint}`, data)
    return response.data
  }

  protected async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await client.delete(`${this.baseUrl}${endpoint}`)
    return response.data
  }

  protected buildQueryString(params: Record<string, any>): string {
    const query = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query.append(key, String(value))
      }
    })
    return query.toString()
  }
}