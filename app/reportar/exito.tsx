import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function ExitoScreen() {
  const router = useRouter();

  const handleVolver = () => {
    // router.replace destruye el stack del reporte y reinicia la app en los tabs
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconoCaja}>
        <Text style={styles.icono}>[ V ]</Text>
      </View>

      <Text style={styles.titulo}>¡Reporte enviado!</Text>
      <Text style={styles.subtitulo}>GRACIAS POR AYUDAR A MEJORAR NUESTRA CIUDAD.</Text>
      <Text style={styles.mensaje}>TU REPORTE FUE REGISTRADO CORRECTAMENTE.</Text>

      <TouchableOpacity style={styles.btnVolver} onPress={handleVolver}>
        <Text style={styles.btnText}>VOLVER AL INICIO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  iconoCaja: {
    width: 100,
    height: 100,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  icono: { color: 'white', fontSize: 30, fontWeight: 'bold' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitulo: { fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  mensaje: { fontSize: 12, textAlign: 'center', marginBottom: 40 },
  btnVolver: { backgroundColor: '#000', padding: 15, width: '100%', alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' },
});
