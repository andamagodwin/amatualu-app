import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../../store/auth.store';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp, isLoading } = useAuthStore();

  const handleRegister = async () => {
    try {
      setError('');
      
      // Basic form validation
      if (!name.trim()) {
        setError('Please enter your name');
        return;
      }
      if (!email.trim()) {
        setError('Please enter your email');
        return;
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }

      // Attempt to sign up
      await signUp(email, password, name);
      // No need to navigate here - auth store handles successful navigation
    } catch (err: any) {
      setError(err.message || 'Failed to sign up. Please try again.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-6 justify-center">
        <View className="mb-10">
          <Text className="text-3xl font-bold text-gray-900">Create Account</Text>
          <Text className="text-gray-600 mt-2">Sign up to get started</Text>
        </View>

        {error ? (
          <View className="mb-4 p-4 bg-red-50 rounded-lg">
            <Text className="text-red-500">{error}</Text>
          </View>
        ) : null}

        <View className="space-y-4">
          <View>
            <Text className="text-gray-700 mb-2">Name</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-4 text-gray-900"
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          <View>
            <Text className="text-gray-700 mb-2">Email</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-4 text-gray-900"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
          </View>

          <View>
            <Text className="text-gray-700 mb-2">Password</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-4 text-gray-900"
              placeholder="Enter your password (min. 8 characters)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password-new"
            />
          </View>

          <TouchableOpacity
            className="bg-red-500 rounded-lg p-4"
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center font-semibold">Sign Up</Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center mt-4">
            <Text className="text-gray-600">Already have an account? </Text>
            <Link href="/auth/login" className="text-red-500 font-semibold">
              Sign In
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
} 