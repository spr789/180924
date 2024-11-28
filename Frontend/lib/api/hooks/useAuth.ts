import { useState, useCallback } from 'react';
import { AuthService } from '../services/auth';
import {
  User,
  LoginCredentials,
  RegisterData,
  PasswordResetRequest,
  PasswordResetConfirm,
} from '../types/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const authService = new AuthService();

  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const { data } = await authService.login(credentials);
      setUser(data.user);
      localStorage.setItem('access_token', data.access); // Updated to use 'access' instead of 'token'
      return data.user;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setLoading(true);
    try {
      const { data: responseData } = await authService.register(data);
      setUser(responseData.user);
      localStorage.setItem('access_token', responseData.access); // Updated to use 'access' instead of 'token'
      return responseData.user;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    setUser(null);
  }, []);

  const getProfile = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await authService.getProfile();
      setUser(data);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const changePassword = useCallback(
    async (passwordData: { old_password: string; new_password: string }) => {
      setLoading(true);
      try {
        await authService.changePassword(passwordData);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    user,
    loading,
    login,
    register,
    logout,
    getProfile,
    changePassword,
  };
}
