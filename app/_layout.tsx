// app/_layout.tsx
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import Toast from 'react-native-toast-message';

import { authService } from '../services/authService';
import { useUsuarioStore } from '../store/useUsuarioStore';

export default function RootLayout() {
  const { login, logout, isLoggedIn } = useUsuarioStore();
  const [isInitializing, setIsInitializing] = useState(true);

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        await login(
          {
            id: user.uid,
            email: user.email || '',
            nombre: user.displayName || 'Vecino',
            avatar: user.photoURL || '',
          },
          token
        );
      } else {
        await logout();
      }
      setIsInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isInitializing) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isLoggedIn && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (isLoggedIn && inAuthGroup) {
      router.replace('/(tabs)/reportes');
    }
  }, [isLoggedIn, isInitializing, segments]);

  if (isInitializing) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
        }}
      >
        <ActivityIndicator size="large" color="#1877F2" />
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="detalle/[id]" options={{ presentation: 'card' }} />
      </Stack>
      <Toast />
    </>
  );
}
