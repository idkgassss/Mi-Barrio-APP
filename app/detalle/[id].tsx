import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function DetalleReporteScreen() {
  // Atrapamos los datos que nos envía la lista
  const { id, titulo, estado, fecha } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      {/* Simulamos la foto grande del reporte */}
      <View style={styles.imagenCaja}>
        <Text style={styles.imagenTexto}>[ FOTO DEL PROBLEMA ]</Text>
      </View>

      <View style={styles.infoCaja}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.fecha}>Reportado el: {fecha}</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{estado}</Text>
        </View>

        <Text style={styles.descripcionTitulo}>Descripción del vecino:</Text>
        <Text style={styles.descripcion}>
          Este es un texto simulado de la descripción. Aquí el usuario vería todos los detalles
          específicos que se enviaron en el Paso 3 del formulario para el reporte #{id}.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  imagenCaja: {
    height: 250,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagenTexto: { color: '#666', fontWeight: 'bold' },
  infoCaja: { padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
  fecha: { fontSize: 14, color: '#666', marginBottom: 15 },
  badge: {
    backgroundColor: '#000',
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  badgeText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  descripcionTitulo: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  descripcion: { fontSize: 14, lineHeight: 22, color: '#333' },
});
