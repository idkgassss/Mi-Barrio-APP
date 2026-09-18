import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="reportar" options={{ headerShown: false }} />
      {/* Agregamos la ruta dinámica del detalle */}
      <Stack.Screen
        name="detalle/[id]"
        options={{
          title: 'Detalle del Reporte',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
      />
    </Stack>
  );
}
