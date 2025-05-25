import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { account } from '../lib/appwrite';
import { ID } from 'appwrite';
import { router } from 'expo-router';

interface User {
  $id: string;
  name: string;
  email: string;
  emailVerification: boolean;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const createUniqueId = (): string => {
  // Using Appwrite's built-in ID generator for maximum compatibility
  return ID.unique();
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  checkAuth: async () => {
    try {
      const session = await account.getSession('current');
      if (session) {
        const user = await account.get();
        set({ user, isAuthenticated: true });
      }
    } catch (error) {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      
      // Create a new session
      const session = await account.createEmailPasswordSession(email, password);
      

      // Get user details
      const user = await account.get();
      

      // Update state and storage
      set({ user, isAuthenticated: true });
      await AsyncStorage.setItem('hasSession', 'true');
      
      // Navigate to main app
      router.replace('/(tabs)');
    } catch (error: any) {
      
      await AsyncStorage.removeItem('hasSession');
      set({ user: null, isAuthenticated: false });
      
      // Show specific error message
      if (error?.response?.message) {
        throw new Error(error.response.message);
      }
      throw new Error('Failed to sign in. Please check your credentials.');
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (email: string, password: string, name: string) => {
    try {
      set({ isLoading: true });
      
      // Validate email
      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address');
      }

      let createdUser = null;

      try {
        // Step 1: Create user account
        const userId = createUniqueId();
        
        createdUser = await account.create(userId, email, password, name);
        console.warn('User created successfully:', createdUser);

        // Step 2: Create session (only if user creation succeeded)
        if (createdUser) {
          console.warn('Creating session for new user...');
          const session = await account.createEmailPasswordSession(email, password);
          

          // Get current user details
          const currentUser = await account.get();

          // Update state and storage
          set({ user: currentUser, isAuthenticated: true });
          await AsyncStorage.setItem('hasSession', 'true');
          
          // Navigate to main app
          router.replace('/(tabs)');
        }
      } catch (error: any) {
        console.error('Error during signup process:', error);
        
        // If user was created but session failed, try to sign in normally
        if (createdUser) {
          console.warn('Attempting to sign in after user creation...');
          await account.createSession(email, password);
          const currentUser = await account.get();
          set({ user: currentUser, isAuthenticated: true });
          await AsyncStorage.setItem('hasSession', 'true');
          router.replace('/(tabs)');
          return;
        }

        if (error?.response?.message) {
          throw new Error(error.response.message);
        }
        throw new Error('Failed to create account. Please try again.');
      }
    } catch (error: any) {
      await AsyncStorage.removeItem('hasSession');
      set({ user: null, isAuthenticated: false });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true });
      await account.deleteSession('current');
      await AsyncStorage.removeItem('hasSession');
      set({ user: null, isAuthenticated: false });
      router.replace('/auth/login');
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      set({ isLoading: false });
    }
  },
})); 