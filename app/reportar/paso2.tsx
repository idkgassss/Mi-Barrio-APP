import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Paso2Screen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleSiguiente = () => {
    router.push('/reportar/paso3');
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 20 }]}>
      <Text style={styles.titulo}>Subí fotos del problema</Text>

      <View style={styles.gridFotos}>
        <View style={styles.cajaFoto}>
          <Text>+</Text>
        </View>
        <View style={styles.cajaFoto}>
          <Text>+</Text>
        </View>
        <View style={styles.cajaFoto}>
          <Text>+</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.btnSiguiente} onPress={handleSiguiente}>
        <Text style={styles.btnText}>Siguiente -{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  gridFotos: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  cajaFoto: {
    width: 100,
    height: 100,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
  },
  btnSiguiente: { backgroundColor: '#000', padding: 15, alignItems: 'center', marginTop: 'auto' },
  btnText: { color: 'white', fontWeight: 'bold' },
});
