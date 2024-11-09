"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface User {
  id: number
  email: string
  profile?: {
    first_name: string
    last_name: string
    phone_number?: string
  }
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: ProfileData) => Promise<void>
  changePassword: (data: PasswordData) => Promise<void>
}

interface RegisterData {
  email: string
  password: string
  password2: string
  first_name: string
  last_name: string
}

interface ProfileData {
  first_name: string
  last_name: string
  phone_number?: string
}

interface PasswordData {
  old_password: string
  new_password1: string
  new_password2: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const API_BASE_URL = "/api"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/me/`)
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Login failed")
    }

    const userData = await response.json()
    setUser(userData)
  }

  const register = async (data: RegisterData) => {
    const response = await fetch(`${API_BASE_URL}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Registration failed")
    }

    const userData = await response.json()
    setUser(userData)
  }

  const logout = async () => {
    await fetch(`${API_BASE_URL}/logout/`, {
      method: "POST",
    })
    setUser(null)
  }

  const updateProfile = async (data: ProfileData) => {
    if (!user) throw new Error("Not authenticated")

    const response = await fetch(`${API_BASE_URL}/profiles/${user.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Profile update failed")
    }

    const updatedUser = await response.json()
    setUser(updatedUser)
  }

  const changePassword = async (data: PasswordData) => {
    const response = await fetch(`${API_BASE_URL}/password-change/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Password change failed")
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
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
  return context
}