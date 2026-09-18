import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Paso3Screen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleEnviar = () => {
    router.push('/reportar/exito');
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 20 }]}>
      <Text style={styles.titulo}>Detalles del problema</Text>

      <Text style={styles.label}>Ubicación</Text>
      <TextInput style={styles.input} placeholder="Escribí la dirección..." />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describí brevemente el problema..."
        multiline
      />

      <TouchableOpacity style={styles.btnEnviar} onPress={handleEnviar}>
        <Text style={styles.btnText}>ENVIAR REPORTE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 5 },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 10,
    marginBottom: 15,
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  btnEnviar: { backgroundColor: '#000', padding: 15, alignItems: 'center', marginTop: 'auto' },
  btnText: { color: 'white', fontWeight: 'bold' },
});
