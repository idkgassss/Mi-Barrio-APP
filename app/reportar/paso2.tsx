// app/reportar/paso2.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import { useReporteDraftStore } from '../../store/useReporteDraftStore';

export default function Paso2Screen() {
  const router = useRouter();
  const { imageUri, setFoto } = useReporteDraftStore();

  const sacarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Toast.show({
        type: 'error',
        text1: 'Permiso denegado',
        text2: 'Necesitamos tu cámara para registrar la evidencia.',
      });
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.4,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Evidencia fotográfica</Text>
      <Text style={styles.subtitle}>Sacá una foto del problema (opcional pero recomendado).</Text>

      <TouchableOpacity style={styles.imagePickerBtn} onPress={sacarFoto}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        ) : (
          <View style={styles.placeholderContainer}>
            <Ionicons name="camera" size={50} color="#1877F2" />
            <Text style={styles.placeholderText}>Tocar para abrir la cámara</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnAvanzar} onPress={() => router.push('/reportar/paso3')}>
        <Text style={styles.btnText}>Siguiente: Detalles Finales</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 30 },
  imagePickerBtn: {
    backgroundColor: '#F5F7FA',
    borderWidth: 2,
    borderColor: '#1877F2',
    borderStyle: 'dashed',
    borderRadius: 16,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 30,
  },
  placeholderContainer: { alignItems: 'center' },
  placeholderText: { marginTop: 10, color: '#1877F2', fontSize: 16, fontWeight: 'bold' },
  imagePreview: { width: '100%', height: '100%', resizeMode: 'cover' },
  btnAvanzar: { backgroundColor: '#1877F2', padding: 16, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
