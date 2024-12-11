"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { AuthService } from "@/lib/api/services/auth"
import { User, LoginCredentials, RegisterData } from "@/lib/api/types/auth"
import { useToast } from "@/hooks/use-toast"
import { User } from "lucide-react"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
  changePassword: (data: { old_password: string; new_password: string }) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()
  const authService = new AuthService()

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("auth_token")
        if (token) {
          const response = await authService.login({ phone_number: token, password: '' }) // Adjusted to match LoginCredentials
          setUser(response.data.user)
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    setLoading(true)
    try {
      const response = await authService.login(credentials)
      setUser(response.data.user)
      localStorage.setItem("auth_token", response.data.token)
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      })
      router.push("/")
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (data: RegisterData) => {
    setLoading(true)
    try {
      const response = await authService.register(data)
      setUser(response.data.user)
      localStorage.setItem("auth_token", response.data.token)
      toast({
        title: "Welcome!",
        description: "Your account has been created successfully.",
      })
      router.push("/")
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      setUser(null)
      localStorage.removeItem("auth_token")
      router.push("/login")
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      })
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      const response = await authService.updateProfile(data)
      setUser(response.data)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      })
      throw error
    }
  }

  const changePassword = async (data: { old_password: string; new_password: string }) => {
    try {
      await authService.changePassword(data)
      toast({
        title: "Password changed",
        description: "Your password has been changed successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Password change failed",
        description: error.message,
        variant: "destructive",
      })
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  console.log("Current user from contexts:", context.user);
  return context
}