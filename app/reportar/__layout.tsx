import { Stack } from 'expo-router';

export default function ReportarLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="paso1" options={{ title: 'Paso 1: Categoría' }} />
      <Stack.Screen name="paso2" options={{ title: 'Paso 2: Fotos' }} />
      <Stack.Screen name="paso3" options={{ title: 'Paso 3: Detalles' }} />
      <Stack.Screen name="exito" options={{ headerShown: false }} />
    </Stack>
  );
}
