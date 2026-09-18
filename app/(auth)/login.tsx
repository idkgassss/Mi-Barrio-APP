import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    // Al ingresar, reemplazamos el login por los tabs
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tituloApp}>mi barrio</Text>

      <View style={styles.card}>
        <Text style={styles.subtitulo}>Bienvenido a Mi Barrio</Text>

        <Text style={styles.label}>E-mail / DNI</Text>
        <TextInput style={styles.input} placeholder="hdhsuaia" />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput style={styles.input} placeholder="•••••w" secureTextEntry />

        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', justifyContent: 'center', padding: 20 },
  tituloApp: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 },
  card: { backgroundColor: 'white', padding: 20, borderWidth: 1, borderColor: '#000' },
  subtitulo: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 14, marginBottom: 5, fontWeight: '500' },
  input: { borderWidth: 1, borderColor: '#CCC', padding: 10, marginBottom: 15 },
  btn: { backgroundColor: '#333', padding: 15, alignItems: 'center', marginTop: 10 },
  btnText: { color: 'white', fontWeight: 'bold' },
});
