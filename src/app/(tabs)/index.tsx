import { View, Text } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import '../../../global.css';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <View className='flex-1 items-center justify-center bg-primary'>
        <Text className='text-black'>Hello World</Text>
      </View>
      
    </>
  );
}
