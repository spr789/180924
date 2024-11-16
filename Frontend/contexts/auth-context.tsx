"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useAuth as useAuthHook } from "@/lib/api/hooks/useAuth"
import { User, LoginCredentials, RegisterData } from "@/lib/api/types"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  getProfile: () => Promise<User>
  updateProfile: (data: Partial<User>) => Promise<User>
  changePassword: (data: { old_password: string; new_password: string }) => Promise<void>
  requestPasswordReset: (data: { phone_number: string }) => Promise<void>
  confirmPasswordReset: (data: { token: string; password: string }) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
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
  } = useAuthHook()

  useEffect(() => {
    // Load initial profile
    if (!user) {
      getProfile().catch(() => {
        // Silently fail if not authenticated
      })
    }
  }, [getProfile, user])

  return (
    <AuthContext.Provider
      value={{
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
  return context
}