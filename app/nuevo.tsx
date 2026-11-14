// app/nuevo.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, Text, StyleSheet, Platform, View, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

import { InputField } from '@/components/ui/InputField';
import { reporteSchema } from '@/schemas/reporteSchema';
import { reportesService } from '@/services/firestoreReportes';
import { useUsuarioStore } from '@/store/useUsuarioStore';
import { useImagePicker } from '@/hooks/useImagePicker';
import { useLocation } from '@/hooks/useLocation';
import { uploadImage } from '@/services/uploadService';

export default function NuevoReporteScreen() {
  const router = useRouter();
  const usuario = useUsuarioStore((s: any) => s.usuario);
  
  const { imageUri, pickFromGallery, pickFromCamera } = useImagePicker();
  const { location, loadingLoc, obtenerUbicacion } = useLocation();

  const { control, handleSubmit, formState: { isSubmitting } } = useForm({
    resolver: zodResolver(reporteSchema),
    defaultValues: { 
      titulo: '', 
      descripcion: '', 
      categoria: '', 
      estado: 'Pendiente',
      userId: usuario?.id || 'usuario-anonimo' 
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: any) => {
    try {
      let imagenUrl = '';
      if (imageUri) {
        imagenUrl = await uploadImage(imageUri, 'reportes');
      }

      const reporteFinal = {
        ...data,
        imagen: imagenUrl,
        latitude: location?.latitude,
        longitude: location?.longitude,
      };

      await reportesService.create(reporteFinal);
      Toast.show({ type: 'success', text1: '¡Reporte enviado!' });
      router.back();
    } catch (err: any) {
      Toast.show({ type: 'error', text1: 'Error al enviar', text2: err.message });
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.header}>Reportar Problema</Text>

        <InputField control={control} name="titulo" label="Título del reporte" placeholder="Ej: Bache profundo" />
        <InputField control={control} name="descripcion" label="Descripción" placeholder="Detalles del problema..." multiline />
        <InputField control={control} name="categoria" label="Categoría" placeholder="Infraestructura, Seguridad..." />

        {/* Controles de Hardware */}
        <View style={styles.hardwareContainer}>
          <TouchableOpacity 
            style={styles.hardwareBtn}
            onPress={() => Alert.alert('Foto', '¿Desde dónde?', [
              { text: 'Cámara', onPress: pickFromCamera },
              { text: 'Galería', onPress: pickFromGallery },
              { text: 'Cancelar', style: 'cancel' }
            ])}
          >
            <Ionicons name="camera-outline" size={24} color="#1D4ED8" />
            <Text style={styles.hardwareText}>{imageUri ? 'Foto adjuntada' : 'Agregar Foto'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.hardwareBtn} onPress={obtenerUbicacion} disabled={loadingLoc}>
            <Ionicons name="location-outline" size={24} color="#1D4ED8" />
            <Text style={styles.hardwareText}>
              {loadingLoc ? 'Ubicando...' : location ? 'Ubicación lista' : 'Fijar GPS'}
            </Text>
          </TouchableOpacity>
        </View>

        {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} />}
        {location && <Text style={styles.direccion}>Lat: {location.latitude}, Lon: {location.longitude}</Text>}

        <TouchableOpacity 
          onPress={() => { handleSubmit(onSubmit)(); }}
          disabled={isSubmitting}
          style={[styles.btnSubmit, isSubmitting && styles.btnDisabled]}
        >
          <Text style={styles.btnSubmitText}>{isSubmitting ? 'Subiendo reporte...' : 'Enviar Reporte'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  form: { padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#1E293B' },
  hardwareContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 },
  hardwareBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EFF6FF', padding: 12, borderRadius: 8, flex: 0.48, justifyContent: 'center' },
  hardwareText: { marginLeft: 8, color: '#1D4ED8', fontWeight: '600' },
  preview: { width: '100%', height: 200, borderRadius: 8, marginBottom: 12 },
  direccion: { fontSize: 12, color: '#64748B', marginBottom: 16, textAlign: 'center' },
  btnSubmit: { backgroundColor: '#1D4ED8', padding: 16, borderRadius: 8, marginTop: 10 },
  btnDisabled: { backgroundColor: '#94A3B8' },
  btnSubmitText: { color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }
});