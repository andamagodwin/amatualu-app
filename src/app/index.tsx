import { View, Text } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import '../../global.css';

export default function App() {
  return (
    <>
      
      <View className='flex-1 items-center justify-center bg-red-500'>
        <Text>Hello World</Text>
      </View>
      <StatusBar style="auto" />
    </>
  );
}
