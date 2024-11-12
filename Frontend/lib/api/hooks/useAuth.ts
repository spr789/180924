import { useState, useCallback } from 'react'
import { AuthService } from '../services/auth'
import { LoginCredentials, RegisterData, User, ApiError } from '../types'
import { useToast } from '@/hooks/use-toast'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const authService = new AuthService()

  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true)
    try {
      const response = await authService.login(credentials)
      setUser(response.data.user)
      toast({
        title: "Login successful",
        description: "Welcome back!",
      })
      return response.data
    } catch (error) {
      const apiError = error as ApiError
      toast({
        title: "Login failed",
        description: apiError.message,
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }, [toast])

  const register = useCallback(async (data: RegisterData) => {
    setLoading(true)
    try {
      const response = await authService.register(data)
      setUser(response.data.user)
      toast({
        title: "Registration successful",
        description: "Welcome to our platform!",
      })
      return response.data
    } catch (error) {
      const apiError = error as ApiError
      toast({
        title: "Registration failed",
        description: apiError.message,
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }, [toast])

  const logout = useCallback(async () => {
    setLoading(true)
    try {
      await authService.logout()
      setUser(null)
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })
    } catch (error) {
      const apiError = error as ApiError
      toast({
        title: "Logout failed",
        description: apiError.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  return {
    user,
    loading,
    login,
    register,
    logout,
  }
}