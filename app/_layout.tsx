import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Grupo (auth) para el Login */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      {/* Grupo (tabs) para la navegación principal */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
