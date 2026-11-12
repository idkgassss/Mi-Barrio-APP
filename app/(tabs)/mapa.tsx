import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export default function MapaScreen() {
  return (
    <View style={styles.container}>
      {/* 1. TÍTULO SUPERIOR */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mapa de reportes</Text>
      </View>

      {/* 2. MAPA LIMPIO (Sin pines ni usuario) */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -34.4714,
          longitude: -58.8252,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
      />

      {/* 3. CAJA DE REFERENCIAS INFERIOR */}
      <View style={styles.referenciasBox}>
        <Text style={styles.refTitle}>Referencias (Estado):</Text>
        <Text style={styles.refItem}>• Gris Claro: Pendiente</Text>
        <Text style={styles.refItem}>• Gris Medio: En Proceso</Text>
        <Text style={styles.refItem}>• Gris Oscuro/Negro: Solucionado</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '300',
    color: '#000',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  referenciasBox: {
    backgroundColor: '#FFF',
    borderTopWidth: 2,
    borderTopColor: '#000',
    padding: 15,
  },
  refTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  refItem: {
    fontSize: 12,
    color: '#555',
    marginBottom: 3,
    marginLeft: 5,
  },
});