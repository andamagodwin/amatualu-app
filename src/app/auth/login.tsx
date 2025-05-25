import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../../store/auth.store';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, isLoading } = useAuthStore();

  const handleLogin = async () => {
    try {
      setError('');
      console.log(email, password);
      await signIn(email, password);
      console.log('Login successful');
      router.replace('/(tabs)');
    } catch (err: any) {
      console.log(err);
      setError(err.message || 'Failed to sign in');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-6 justify-center">
        <View className="mb-10">
          <Text className="text-3xl font-bold text-gray-900">Welcome Back</Text>
          <Text className="text-gray-600 mt-2">Sign in to your account</Text>
        </View>

        {error ? (
          <View className="mb-4 p-4 bg-red-50 rounded-lg">
            <Text className="text-red-500">{error}</Text>
          </View>
        ) : null}

        <View className="space-y-4">
          <View>
            <Text className="text-gray-700 mb-2">Email</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-4 text-gray-900"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View>
            <Text className="text-gray-700 mb-2">Password</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-4 text-gray-900"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            className="bg-red-500 rounded-lg p-4"
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center font-semibold">Sign In</Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center mt-4">
            <Text className="text-gray-600">Don't have an account? </Text>
            <Link href="/auth/register" className="text-red-500 font-semibold">
              Sign Up
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
} 