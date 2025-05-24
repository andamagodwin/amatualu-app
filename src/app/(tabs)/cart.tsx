import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CartPage() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-2xl font-bold text-gray-800">Shopping Cart</Text>
          
          {/* Cart Items */}
          <View className="mt-4">
            {[1, 2].map((item) => (
              <View 
                key={item} 
                className="flex-row items-center p-4 bg-gray-100 rounded-lg mb-4"
              >
                <View className="w-20 h-20 bg-gray-200 rounded-md mr-4" />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-800">Product {item}</Text>
                  <Text className="text-gray-600 mt-1">$99.99</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Cart Summary */}
          <View className="mt-6 p-4 bg-gray-100 rounded-lg">
            <Text className="text-xl font-semibold text-gray-800">Total: $199.98</Text>
            <View className="mt-4 bg-red-500 p-4 rounded-lg">
              <Text className="text-white text-center font-semibold">Checkout</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 