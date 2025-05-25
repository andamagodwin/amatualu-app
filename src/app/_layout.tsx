import { useEffect } from 'react';
import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import { useAuthStore } from '../store/auth.store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] === 'auth';
    
    if (!isLoading) {
      if (isAuthenticated && inAuthGroup) {
        router.replace('/(tabs)');
      } else if (!isAuthenticated && !inAuthGroup) {
        router.replace('/auth/login');
      }
    }
  }, [isAuthenticated, segments, isLoading]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-red-500">
        <ActivityIndicator size="large" color="#EF4444" />
      </View>
    );
  }

  return <Slot />;
} 