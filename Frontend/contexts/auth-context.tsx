"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/lib/api/services/auth";
import { User, LoginCredentials, RegisterData } from "@/lib/api/types/auth";
import { useToast } from "@/hooks/use-toast";
import { jwtDecode } from "jwt-decode"; // Install with `npm install jwt-decode`

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  changePassword: (data: { old_password: string; new_password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  const authService = new AuthService();

  // Token management functions
  const getToken = () => {
    return JSON.parse(localStorage.getItem("authToken") || "null");
  };

  const setToken = (token: { access: string; refresh: string }) => {
    localStorage.setItem("authToken", JSON.stringify(token));
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  // Initialize authentication from token
  const initAuth = async () => {
    try {
      const token = getToken();
      if (token && typeof token.access === 'string') {
        const decodedToken = jwtDecode<{ user: any }>(token.access);
        const user = decodedToken.user;
        setUser(user);
      }
    } catch (error) {
      console.error("Auth initialization error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(response.data.data.user);
      setToken(response.data.data.token);
      console.log('Token:', response.data.token); // Added console log for token
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      router.push("/");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (data: RegisterData) => {
    setLoading(true);
    try {
      const response = await authService.register(data);
      setUser(response.data.user);
      setToken(response.data.token);
      toast({
        title: "Welcome!",
        description: "Your account has been created successfully.",
      });
      router.push("/");
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      removeToken();
      router.push("/login");
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Update profile function
  const updateProfile = async (data: Partial<User>) => {
    try {
      const response = await authService.updateProfile(data);
      setUser(response.data);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Change password function
  const changePassword = async (data: { old_password: string; new_password: string }) => {
    try {
      await authService.changePassword(data);
      toast({
        title: "Password changed",
        description: "Your password has been changed successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Password change failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

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
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
