import { useState, useCallback } from 'react';
import { AuthService } from '../services/auth';
import { User, LoginCredentials, RegisterData } from '../types/auth';
import { useToast } from '@/hooks/use-toast';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const authService = new AuthService();

  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(response.data.user);
      return response.data.user;
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
  }, [toast]);

  const register = useCallback(async (data: RegisterData) => {
    setLoading(true);
    try {
      const response = await authService.register(data);
      setUser(response.data.user);
      return response.data.user;
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
  }, [toast]);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  console.log("Current user from hooks:", user);
  return {
    user,
    loading,
    login,
    register,
    logout,
  };
}