import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ShopPage() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-2xl font-bold text-gray-800">Shop</Text>
          
          {/* Products Grid */}
          <View className="mt-4 flex-row flex-wrap justify-between">
            {[1, 2, 3, 4].map((item) => (
              <View 
                key={item} 
                className="w-[48%] h-48 bg-gray-100 rounded-lg mb-4 items-center justify-center"
              >
                <Text className="text-gray-500">Product {item}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 