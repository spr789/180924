import { api } from './api'

interface LoginCredentials {
  email: string
  password: string
}

interface AuthResponse {
  token: string
  refreshToken: string
  user: any
}

export const auth = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials)
    this.setTokens(response.data.token, response.data.refreshToken)
    return response.data
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout')
    this.clearTokens()
  },

  setTokens(token: string, refreshToken: string): void {
    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', refreshToken)
  },

  clearTokens(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
  },

  getToken(): string | null {
    return localStorage.getItem('token')
  },
}