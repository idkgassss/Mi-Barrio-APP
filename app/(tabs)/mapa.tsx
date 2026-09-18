import { View, Text, StyleSheet } from 'react-native';

export default function MapaScreen() {
  return (
    <View style={styles.container}>
      {/* Caja del Mapa Simulado */}
      <View style={styles.mapMock}>
        {/* Pin 1: Bache */}
        <View style={[styles.pinWrapper, { top: '25%', left: '30%' }]}>
          <View style={styles.pinSquare} />
          <View style={styles.labelBox}>
            <Text style={styles.labelText}>Bache ...</Text>
          </View>
        </View>

        {/* Pin 2: Luminaria */}
        <View style={[styles.pinWrapper, { top: '35%', left: '42%' }]}>
          <View style={styles.pinSquare} />
          <View style={styles.labelBox}>
            <Text style={styles.labelText}>Lumina...</Text>
          </View>
        </View>

        {/* Pin 3: Basura */}
        <View style={[styles.pinWrapper, { top: '45%', left: '30%' }]}>
          <View style={styles.pinSquare} />
          <View style={styles.labelBox}>
            <Text style={styles.labelText}>Basura...</Text>
          </View>
        </View>

        {/* Texto central */}
        <Text style={styles.mapText}>[ MAPA INTERACTIVO MOCK ]</Text>
      </View>

      {/* Caja de Referencias */}
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
    padding: 15,
  },
  mapMock: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 15,
  },
  mapText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#555',
  },
  pinWrapper: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10,
  },
  pinSquare: {
    width: 14,
    height: 14,
    backgroundColor: '#000',
  },
  labelBox: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginTop: 2,
  },
  labelText: {
    fontSize: 10,
    color: '#000',
  },
  referenciasBox: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#000',
    padding: 15,
  },
  refTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  refItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    marginLeft: 5,
  },
});
