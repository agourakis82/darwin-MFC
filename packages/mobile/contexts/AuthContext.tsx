/**
 * Darwin MFC Mobile - Auth Context
 * Authentication state with SecureStore persistence
 */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync('authToken');
        const userData = await SecureStore.getItemAsync('userData');
        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Failed to load auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuth();
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      // TODO: Replace with actual API call
      const mockToken = `jwt-${Date.now()}`;
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
      };
      await SecureStore.setItemAsync('authToken', mockToken);
      await SecureStore.setItemAsync('userData', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<void> => {
    try {
      if (!email || !password || !name) {
        throw new Error('Email, password, and name are required');
      }
      // TODO: Replace with actual API call
      const mockToken = `jwt-register-${Date.now()}`;
      const mockUser: User = { id: '2', email, name };
      await SecureStore.setItemAsync('authToken', mockToken);
      await SecureStore.setItemAsync('userData', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync('authToken');
      await SecureStore.deleteItemAsync('userData');
      setUser(null);
    } catch (error) {
      console.error('Sign out failed:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    signIn,
    signOut,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
