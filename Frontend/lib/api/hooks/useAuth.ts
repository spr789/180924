import { useState, useCallback } from 'react'
import { AuthService } from '../services/auth'
import { LoginCredentials, RegisterData, User, ApiError, AuthResponse, PasswordResetRequest, PasswordResetConfirm } from '../types'
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

  const getProfile = useCallback(async () => {
    setLoading(true)
    try {
      const response = await authService.getProfile()
      setUser(response.data)
      return response.data
    } catch (error) {
      const apiError = error as ApiError
      toast({
        title: "Failed to fetch profile",
        description: apiError.message,
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }, [toast])

  const updateProfile = useCallback(async (data: Partial<User>) => {
    setLoading(true)
    try {
      const response = await authService.updateProfile(data)
      setUser(response.data)
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
      return response.data
    } catch (error) {
      const apiError = error as ApiError
      toast({
        title: "Profile update failed",
        description: apiError.message,
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }, [toast])

  const changePassword = useCallback(async (data: { old_password: string; new_password: string }) => {
    setLoading(true)
    try {
      await authService.changePassword(data)
      toast({
        title: "Password changed",
        description: "Your password has been successfully updated.",
      })
    } catch (error) {
      const apiError = error as ApiError
      toast({
        title: "Password change failed",
        description: apiError.message,
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }, [toast])

  const requestPasswordReset = useCallback(async (data: PasswordResetRequest) => {
    setLoading(true)
    try {
      await authService.requestPasswordReset(data)
      toast({
        title: "Reset requested",
        description: "Password reset instructions have been sent.",
      })
    } catch (error) {
      const apiError = error as ApiError
      toast({
        title: "Reset request failed",
        description: apiError.message,
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }, [toast])

  const confirmPasswordReset = useCallback(async (data: PasswordResetConfirm) => {
    setLoading(true)
    try {
      await authService.confirmPasswordReset(data)
      toast({
        title: "Password reset",
        description: "Your password has been successfully reset.",
      })
    } catch (error) {
      const apiError = error as ApiError
      toast({
        title: "Reset failed",
        description: apiError.message,
        variant: "destructive",
      })
      throw error
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
    getProfile,
    updateProfile,
    changePassword,
    requestPasswordReset,
    confirmPasswordReset
  }
}