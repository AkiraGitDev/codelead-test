import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS !== 'web') {
      // Aqui você pode adicionar qualquer inicialização necessária
      console.log('App inicializado');
    }
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#DDDDDD' },
          animation: 'slide_from_right',
          gestureEnabled: true,
        }}
      />
    </>
  );
}