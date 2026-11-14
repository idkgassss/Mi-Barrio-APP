import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Colors, Spacing, FontSize, Radius } from '@/constants/theme';

export default function Paso2Screen() {
  const router = useRouter();
  const [imagenUri, setImagenUri] = useState<string | null>(null);

  const abrirCamara = async () => {
    const permisos = await ImagePicker.requestCameraPermissionsAsync();

    if (!permisos.granted) {
      Alert.alert(
        'Permiso denegado',
        'Necesitamos acceso a la cámara para tomar la foto del problema.'
      );
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2, // COMPRESIÓN FUERTE (20%): Vital para que pese menos de 1MB y entre en Firestore
      base64: true, // Convertimos la foto a texto plano
    });

    if (!resultado.canceled && resultado.assets[0].base64) {
      // Armamos el formato estándar de imagen en base64
      const base64Uri = `data:image/jpeg;base64,${resultado.assets[0].base64}`;
      setImagenUri(base64Uri);
    }
  };

  const handleSiguiente = () => {
    router.push({
      pathname: '/reportar/paso3',
      params: imagenUri ? { fotoUri: imagenUri } : {},
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* HEADER CUSTOM */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nuevo reporte</Text>
      </View>

      {/* CONTENIDO CENTRAL */}
      <View style={styles.content}>
        <View style={styles.imagePlaceholder}>
          {imagenUri ? (
            <Image source={{ uri: imagenUri }} style={styles.imagen} />
          ) : (
            <MaterialCommunityIcons name="image" size={100} color="rgba(0,0,0,0.6)" />
          )}
        </View>

        <TouchableOpacity style={styles.roundButton} onPress={abrirCamara}>
          <Text style={styles.roundButtonText}>{imagenUri ? 'VOLVER A SACAR' : 'SACAR FOTO'}</Text>
        </TouchableOpacity>

        {!imagenUri && (
          <TouchableOpacity style={styles.skipButton} onPress={handleSiguiente}>
            <Text style={styles.skipButtonText}>Saltear este paso</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleSiguiente}>
          <Text style={styles.nextButtonText}>Siguiente</Text>
          <Ionicons name="arrow-forward" size={20} color={Colors.surface} style={styles.nextIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Spacing.xxl * 1.5,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  backButton: { marginRight: Spacing.md },
  headerTitle: { fontSize: FontSize.xl, color: Colors.text },
  content: { flex: 1, alignItems: 'center', paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xxl * 2,
    overflow: 'hidden',
  },
  imagen: { width: '100%', height: '100%' },
  roundButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  roundButtonText: {
    color: Colors.surface,
    fontSize: FontSize.sm,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  skipButton: { marginTop: Spacing.xl, padding: Spacing.sm },
  skipButtonText: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: FontSize.md,
    textDecorationLine: 'underline',
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl * 1.5,
    backgroundColor: Colors.background,
  },
  nextButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
  },
  nextButtonText: { color: Colors.surface, fontSize: FontSize.lg, fontWeight: 'bold' },
  nextIcon: { marginLeft: Spacing.sm },
});
