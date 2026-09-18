import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
// 1. Importamos la herramienta para los márgenes seguros
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Paso1Screen() {
  const router = useRouter();
  // 2. Activamos el medidor de bordes
  const insets = useSafeAreaInsets();

  const handleSiguiente = () => {
    router.push('/reportar/paso2');
  };

  return (
    // 3. Le sumamos el margen inferior del sistema a nuestros 20px de diseño
    <View style={[styles.container, { paddingBottom: insets.bottom + 20 }]}>
      <Text style={styles.titulo}>¿Qué querés reportar?</Text>

      <TouchableOpacity style={styles.opcion}>
        <Text>Bache en calle</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.opcion}>
        <Text>Luminaria rota</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.opcion}>
        <Text>Basural a cielo abierto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnSiguiente} onPress={handleSiguiente}>
        <Text style={styles.btnText}>Siguiente -{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  opcion: {
    backgroundColor: 'white',
    padding: 15,
    borderWidth: 1,
    borderColor: '#CCC',
    marginBottom: 10,
  },
  btnSiguiente: { backgroundColor: '#000', padding: 15, alignItems: 'center', marginTop: 'auto' },
  btnText: { color: 'white', fontWeight: 'bold' },
});
