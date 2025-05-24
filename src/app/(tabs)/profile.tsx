import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ProfilePage() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Profile Header */}
          <View className="items-center">
            <View className="w-24 h-24 bg-gray-200 rounded-full" />
            <Text className="mt-4 text-xl font-bold text-gray-800">John Doe</Text>
            <Text className="text-gray-600">john.doe@example.com</Text>
          </View>

          {/* Profile Options */}
          <View className="mt-8">
            {[
              { icon: 'person-outline', label: 'Edit Profile' },
              { icon: 'location-outline', label: 'Shipping Address' },
              { icon: 'card-outline', label: 'Payment Methods' },
              { icon: 'settings-outline', label: 'Settings' },
              { icon: 'help-circle-outline', label: 'Help & Support' },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                className="flex-row items-center p-4 border-b border-gray-100"
              >
                <Ionicons name={item.icon} size={24} color="#374151" />
                <Text className="ml-4 text-gray-800">{item.label}</Text>
                <Ionicons 
                  name="chevron-forward" 
                  size={24} 
                  color="#9CA3AF" 
                  style={{ marginLeft: 'auto' }} 
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout Button */}
          <TouchableOpacity className="mt-8 p-4 bg-red-500 rounded-lg">
            <Text className="text-white text-center font-semibold">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 