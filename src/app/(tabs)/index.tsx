import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomePage() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-2xl font-bold text-gray-800">Welcome to Our Store</Text>
          <Text className="mt-2 text-gray-600">Discover amazing products at great prices</Text>
          
          {/* Featured Products Section */}
          <View className="mt-6">
            <Text className="text-xl font-semibold text-gray-800">Featured Products</Text>
            <View className="mt-4 h-40 bg-gray-100 rounded-lg items-center justify-center">
              <Text className="text-gray-500">Featured products will appear here</Text>
            </View>
          </View>

          {/* Categories Section */}
          <View className="mt-6">
            <Text className="text-xl font-semibold text-gray-800">Categories</Text>
            <View className="mt-4 h-40 bg-gray-100 rounded-lg items-center justify-center">
              <Text className="text-gray-500">Categories will appear here</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 