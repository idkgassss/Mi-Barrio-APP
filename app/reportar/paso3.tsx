// app/reportar/paso3.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

import { useReporteDraftStore } from '../../store/useReporteDraftStore';
import { reportesService } from '../../services/reportesService';
import { useUsuarioStore } from '../../store/useUsuarioStore';

export default function Paso3Screen() {
  const router = useRouter();
  const draft = useReporteDraftStore();
  const usuario = useUsuarioStore((s: any) => s.usuario);

  const [descripcion, setDescripcion] = useState(draft.descripcion);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const enviarReporte = async () => {
    if (!descripcion.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Falta descripción',
        text2: 'Por favor contanos más detalles del problema.',
      });
      return;
    }

    if (!usuario?.id) {
      Toast.show({
        type: 'error',
        text1: 'Error de sesión',
        text2: 'No se detecta tu usuario activo.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Juntamos los datos de los 3 pasos y los mandamos a Firebase
      await reportesService.crear(
        {
          titulo: draft.titulo,
          ubicacion: draft.ubicacion,
          descripcion: descripcion,
          usuarioId: usuario.id,
        },
        draft.imageUri || undefined
      );

      // Si salió bien, limpiamos la memoria temporal y lo mandamos a la pantalla de éxito
      draft.reset();
      router.replace('/reportar/exito');
    } catch (error: any) {
      Toast.show({ type: 'error', text1: 'Hubo un problema', text2: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Últimos detalles</Text>
      <Text style={styles.subtitle}>Describí el problema con un poco más de profundidad.</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descripción detallada *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Ej: El poste está inclinado hace dos días y los cables tocan el piso..."
          value={descripcion}
          onChangeText={setDescripcion}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />
      </View>

      <TouchableOpacity
        style={[styles.btnAvanzar, isSubmitting && styles.btnDisabled]}
        onPress={enviarReporte}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.btnText}>Publicar Reporte</Text>
        )}
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
  textArea: { minHeight: 150 },
  btnAvanzar: {
    backgroundColor: '#1877F2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  btnDisabled: { backgroundColor: '#90CAF9' },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
