import { useState, useCallback, useEffect } from 'react';
import { AuthService } from '../services/auth';
import { User, LoginCredentials, RegisterData } from '../types/auth';
import { useToast } from '@/hooks/use-toast';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const authService = new AuthService();

  // Load the user from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Rehydrate user from localStorage
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true);
    console.log('Attempting to log in with credentials hooks:', credentials); // Log the credentials being used for login
    try {
      const response = await authService.login(credentials);
      const userData = response.data.user;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
      console.log('Login successful, user data hooks:', userData); // Log the user data after successful login
      return userData;
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error.message,
        variant: 'destructive',
      });
      console.error('Login error:hooks', error); // Log the error for debugging
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const register = useCallback(async (data: RegisterData) => {
    setLoading(true);
    try {
      const response = await authService.register(data);
      const userData = response.data.user;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
      return userData;
    } catch (error: any) {
      toast({
        title: 'Registration failed',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    localStorage.removeItem('user'); // Clear user data from localStorage
  }, []);

  console.log('Current user from hooks:', user);

  return {
    user,
    loading,
    login,
    register,
    logout,
  };
}
