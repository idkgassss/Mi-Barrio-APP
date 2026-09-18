import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Registramos tu nuevo flujo de reportes */}
      <Stack.Screen name="reportar" options={{ headerShown: false }} />
    </Stack>
  );
}
