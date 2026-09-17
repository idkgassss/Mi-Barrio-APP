// app/(tabs)/index.tsx
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { TarjetaReporte } from '@/components/TarjetaReporte';
import { useReportes } from '@/hooks/useReportes';
import { Reporte } from '@/types';
import { Colors, Spacing, FontSize } from '@/constants/theme';

export default function HomeScreen() {
  // Traemos toda la lógica desde nuestro Custom Hook (¡la pantalla queda súper limpia!)
  const { reportes, cargando, error, refrescar } = useReportes();

  // Estado 1: Cargando (mientras el setTimeout hace su trabajo)
  if (cargando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  // Estado 2: Error (por si falla la carga)
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  // Estado 3 y 4: Lista con datos o Lista vacía
  return (
    <View style={styles.container}>
      <FlatList<Reporte>
        data={reportes}
        // keyExtractor es obligatorio: le dice a React cómo identificar cada ítem de forma única
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TarjetaReporte
            reporte={item}
            onPress={(r) => console.log('Ver detalle del reporte:', r.id)}
            onFavorito={(id) => console.log('Favorito marcado:', id)}
          />
        )}
        // pull-to-refresh nativo: para recargar la lista deslizando hacia abajo
        onRefresh={refrescar}
        refreshing={cargando}
        contentContainerStyle={styles.lista}
        // Lo que se muestra si el array de mockData está vacío
        ListEmptyComponent={<Text style={styles.vacio}>No hay reportes en tu barrio todavía.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  error: {
    color: Colors.danger,
    fontSize: FontSize.md,
  },
  lista: {
    padding: Spacing.md,
  },
  vacio: {
    textAlign: 'center',
    color: Colors.textMuted,
    fontSize: FontSize.md,
    marginTop: Spacing.xl,
  },
});
