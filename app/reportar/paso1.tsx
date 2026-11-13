// app/reportar/paso1.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useReporteDraftStore } from '../../store/useReporteDraftStore';

export default function Paso1Screen() {
  const router = useRouter();
  const setDatosPaso1 = useReporteDraftStore((s: any) => s.setDatosPaso1);
  const draft = useReporteDraftStore();

  // Iniciamos con los datos del store por si el usuario vuelve atrás con la flecha
  const [titulo, setTitulo] = useState(draft.titulo);
  const [ubicacion, setUbicacion] = useState(draft.ubicacion);

  const avanzar = () => {
    if (!titulo.trim() || !ubicacion.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Datos incompletos',
        text2: 'Por favor completá el título y la ubicación.',
      });
      return;
    }
    setDatosPaso1(titulo, ubicacion);
    router.push('/reportar/paso2');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>¿Qué está pasando?</Text>
      <Text style={styles.subtitle}>Ingresá los datos básicos del problema.</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Título breve *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Poste de luz caído"
          value={titulo}
          onChangeText={setTitulo}
          maxLength={40}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ubicación *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Av. San Martín y Belgrano"
          value={ubicacion}
          onChangeText={setUbicacion}
        />
      </View>

      <TouchableOpacity style={styles.btnAvanzar} onPress={avanzar}>
        <Text style={styles.btnText}>Siguiente: Agregar Foto</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 30 },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, color: '#444' },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  btnAvanzar: {
    backgroundColor: '#1877F2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
