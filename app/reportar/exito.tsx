// app/reportar/exito.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ExitoScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark" size={60} color="#FFF" />
        </View>
        <Text style={styles.title}>¡Reporte enviado!</Text>
        <Text style={styles.subtitle}>
          Gracias por involucrarte. Tu reporte ya es visible para los demás vecinos y fue derivado
          al estado correspondiente.
        </Text>
      </View>

      <TouchableOpacity style={styles.btnVolver} onPress={() => router.replace('/(tabs)/reportes')}>
        <Text style={styles.btnText}>Volver a mis reportes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 20, justifyContent: 'space-between' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  btnVolver: {
    backgroundColor: '#1877F2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
