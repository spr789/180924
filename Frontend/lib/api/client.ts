import { API_BASE_URL, DEFAULT_HEADERS } from './config'
import { ApiError } from './types'

export class ApiClient {
  private static instance: ApiClient
  private token: string | null = null

  private constructor() {
    console.log('ApiClient constructor called');
    // Initialize token from localStorage if available
    if (typeof window !== 'undefined') {
      console.log('Attempting to retrieve token from localStorage');
      this.token = localStorage.getItem('auth_token')
      console.log(`Token retrieved: ${this.token}`);
    }
  }

  static getInstance(): ApiClient {
    console.log('Attempting to get ApiClient instance');
    if (!ApiClient.instance) {
      console.log('Creating new ApiClient instance');
      ApiClient.instance = new ApiClient()
    } else {
      console.log('Using existing ApiClient instance');
    }
    return ApiClient.instance
  }

  setToken(token: string) {
    console.log(`Setting token to: ${token}`);
    this.token = token
    if (typeof window !== 'undefined') {
      console.log('Saving token to localStorage');
      localStorage.setItem('auth_token', token)
    }
  }

  clearToken() {
    console.log('Clearing token');
    this.token = null
    if (typeof window !== 'undefined') {
      console.log('Removing token from localStorage');
      localStorage.removeItem('auth_token')
    }
  }

  private getHeaders(): HeadersInit {
    console.log('Getting headers');
    const headers: HeadersInit = { ...DEFAULT_HEADERS }
    if (this.token) {
      console.log(`Adding Authorization header with token: ${this.token}`);
      headers['Authorization'] = `Bearer ${this.token}`
    }
    return headers
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    console.log('Handling response');
    const data = await response.json()
    console.log('Response data:', data);

    if (!response.ok) {
      console.log('Response not OK, throwing error');
      const error: ApiError = {
        message: data.message || 'An error occurred',
        // Ensure the ApiError type matches the expected structure
        status: response.status,
        errors: data.errors || [], // Default to an empty array if errors are undefined
      }
      throw error
    }

    console.log('Response OK, returning data');
    return data
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    console.log(`Sending GET request to: ${endpoint}`);
    const url = new URL(`${API_BASE_URL}${endpoint}`)
    if (params) {
      console.log('Adding parameters to URL');
      Object.keys(params).forEach(key => {
        console.log(`Appending parameter: ${key} = ${params[key]}`);
        url.searchParams.append(key, params[key])
      })
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.getHeaders(),
    })

    console.log('GET request sent, handling response');
    return this.handleResponse<T>(response)
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    console.log(`Sending POST request to: ${endpoint}`);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    })

    console.log('POST request sent, handling response');
    return this.handleResponse<T>(response)
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    console.log(`Sending PUT request to: ${endpoint}`);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    })

    console.log('PUT request sent, handling response');
    return this.handleResponse<T>(response)
  }

  async patch<T>(endpoint: string, data: unknown): Promise<T> {
    console.log(`Sending PATCH request to: ${endpoint}`);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    })

    console.log('PATCH request sent, handling response');
    return this.handleResponse<T>(response)
  }

  async delete<T>(endpoint: string): Promise<T> {
    console.log(`Sending DELETE request to: ${endpoint}`);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    })

    console.log('DELETE request sent, handling response');
    return this.handleResponse<T>(response)
  }
}