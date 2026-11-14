// app/_layout.tsx
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { authService } from '../services/authService';

export default function RootLayout() {
  const router = useRouter();
  const [isInitializing, setIsInitializing] = useState(true); // Para que no parpadee al iniciar

  useEffect(() => {
    // Esto se queda escuchando todo el tiempo si la sesión cambia
    const unsubscribe = authService.onAuthStateChange((user) => {
      if (!user) {
        // Si no hay usuario, lo tiramos a la pantalla de login (que está en app/(auth)/login.tsx)
        router.replace('/(auth)/login');
      } else {
        // Si hay usuario, entra al menú de navegación (pestañas)
        router.replace('/(tabs)');
      }
      setIsInitializing(false);
    });

    return () => unsubscribe(); // Limpiamos el escuchador al cerrar
  }, []);

  if (isInitializing) {
    return null; // O podés devolver una pantalla de "Cargando..."
  }

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="reportar" options={{ headerShown: false }} />
      <Stack.Screen
        name="detalle/[id]"
        options={{
          title: 'Detalle del Reporte',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="tutorial"
        options={{
          presentation: 'transparentModal',
          headerShown: false,
          animation: 'fade',
        }}
      />
    </Stack>
  );
}
