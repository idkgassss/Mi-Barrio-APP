import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <>
      {/* BONUS: Header Personalizado */}
      <Stack.Screen
        options={{
          headerShown: true, // <-- LA CLAVE: Encendemos el header solo para esta pantalla
          title: 'Mi Barrio',
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: Colors.surface,
          headerTitleStyle: { fontWeight: 'bold' },
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push('/perfil')} style={{ marginRight: 15 }}>
              <Ionicons name="person-circle-outline" size={28} color={Colors.surface} />
            </TouchableOpacity>
          ),
        }}
      />

      <View style={styles.container}>
        <Text style={styles.saludo}>Bienvenido, hdhsuaia</Text>

        <Text style={styles.seccionTitulo}>Resumen de Reportes</Text>
        <View style={styles.card}>
          <View style={styles.fila}>
            <Text>Pendientes</Text>
            <Text>1</Text>
          </View>
          <View style={styles.separador} />
          <View style={styles.fila}>
            <Text>En proceso</Text>
            <Text>1</Text>
          </View>
          <View style={styles.separador} />
          <View style={styles.fila}>
            <Text>Solucionados</Text>
            <Text>1</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.btnReportar} onPress={() => router.push('/reportar/paso1')}>
          <Text style={styles.btnText}>REPORTAR PROBLEMA</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  saludo: { fontSize: 24, marginBottom: 20 },
  seccionTitulo: { fontSize: 18, marginBottom: 10 },
  card: { backgroundColor: 'white', borderWidth: 1, padding: 15 },
  fila: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  separador: { height: 1, backgroundColor: '#EEE' },
  btnReportar: { backgroundColor: '#000', padding: 20, alignItems: 'center', marginTop: 40 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
