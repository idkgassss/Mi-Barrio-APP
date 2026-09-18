import { View, Text, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
// Importamos tu base de datos local
import { REPORTES_MOCK } from '../../data/mockData';

export default function DetalleReporteScreen() {
  // 1. Atrapamos SOLO el ID de la URL
  const { id } = useLocalSearchParams<{ id: string }>();

  // 2. Buscamos todos los datos del reporte en nuestra base local
  const reporte = REPORTES_MOCK.find((r) => r.id === id);

  if (!reporte) {
    return (
      <View style={styles.containerCenter}>
        <Text>Reporte no encontrado</Text>
      </View>
    );
  }

  // 3. Renderizamos la pantalla con los datos reales
  return (
    <View style={styles.container}>
      {/* Título de la pantalla */}
      <Stack.Screen options={{ title: reporte.titulo }} />

      {/* Cargamos la foto real de internet */}
      <Image source={{ uri: reporte.imagen }} style={styles.imagen} />

      <View style={styles.infoCaja}>
        <Text style={styles.titulo}>{reporte.titulo}</Text>
        <Text style={styles.categoria}>Categoría: {reporte.categoria}</Text>

        <View
          style={[
            styles.badge,
            reporte.solucionado ? styles.badgeSolucionado : styles.badgePendiente,
          ]}
        >
          <Text style={styles.badgeText}>{reporte.solucionado ? 'Solucionado' : 'Pendiente'}</Text>
        </View>

        <Text style={styles.descripcionTitulo}>Descripción del vecino:</Text>
        <Text style={styles.descripcion}>{reporte.descripcion}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  containerCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  imagen: { width: '100%', height: 250, backgroundColor: '#DDD' },
  infoCaja: { padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  categoria: { fontSize: 14, color: '#666', marginBottom: 15, textTransform: 'capitalize' },
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 4,
  },
  badgePendiente: { backgroundColor: '#FF3B30' },
  badgeSolucionado: { backgroundColor: '#34C759' },
  badgeText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  descripcionTitulo: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  descripcion: { fontSize: 16, color: '#444', lineHeight: 24 },
});
