'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useAuth as useAuthHook } from '../lib/api/hooks/useAuth';
import { User, LoginCredentials, RegisterData } from '../lib/api/types/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  getProfile: () => Promise<User>;
  updateProfile: (data: Partial<User>) => Promise<User>;
  changePassword: (data: {
    old_password: string;
    new_password: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    user,
    loading,
    login,
    register,
    logout,
    getProfile,
    updateProfile,
    changePassword,
  } = useAuthHook();

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Rehydrate user on initial load
    getProfile().finally(() => setIsInitialLoading(false));
  }, [getProfile]);

  if (isInitialLoading) {
    return <div>Loading...</div>; // Replace with a loader/spinner as per your design
  }

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
