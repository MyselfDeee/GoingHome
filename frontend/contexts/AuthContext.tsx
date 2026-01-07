import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../utils/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  full_name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('authToken');
        if (savedToken) {
          // Add timeout to prevent hanging
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Auth check timeout')), 5000)
          );
          
          try {
            const isValid = await Promise.race([
              authService.verifyToken(savedToken),
              timeoutPromise
            ]) as boolean;
            
            if (isValid) {
              const userData = await Promise.race([
                authService.getCurrentUser(savedToken),
                timeoutPromise
              ]) as { user: User };
              
              setToken(savedToken);
              setUser(userData.user);
            } else {
              await AsyncStorage.removeItem('authToken');
            }
          } catch (timeoutError) {
            console.warn('Auth check timed out, proceeding without authentication');
            await AsyncStorage.removeItem('authToken');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        await AsyncStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { user: userData, token: newToken } = await authService.login(email, password);
      setToken(newToken);
      setUser(userData);
      await AsyncStorage.setItem('authToken', newToken);
    } catch (error) {
      throw error;
    }
  };

  const signup = async (fullName: string, email: string, password: string) => {
    try {
      await authService.signup(fullName, email, password);
      // After signup, user should login
      await login(email, password);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!token && !!user,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
