import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, Radius } from '@/constants/theme';

export default function Paso2Screen() {
  const router = useRouter();

  const [fotoTomada, setFotoTomada] = useState(false);

  const handleSiguiente = () => {
    router.push('/reportar/paso3');
  };

  const simularSacarFoto = () => {
    setFotoTomada(true);
    alert('¡Cámara activada! (Simulación)');
  };

  return (
    <View style={styles.container}>
      {/* Esto oculta el encabezado automático por defecto */}
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
        {/* Cuadrado gigante para la foto */}
        <View style={styles.imagePlaceholder}>
          <MaterialCommunityIcons
            name={fotoTomada ? 'image-check' : 'image'}
            size={100}
            color="rgba(0,0,0,0.6)"
          />
        </View>

        {/* Botón Circular */}
        <TouchableOpacity style={styles.roundButton} onPress={simularSacarFoto}>
          <Text style={styles.roundButtonText}>SACAR FOTO</Text>
        </TouchableOpacity>
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
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Spacing.xxl * 1.5,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  backButton: {
    marginRight: Spacing.md,
  },
  headerTitle: {
    fontSize: FontSize.xl,
    color: Colors.text,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xxl * 2,
  },
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
  nextButtonText: {
    color: Colors.surface,
    fontSize: FontSize.lg,
    fontWeight: 'bold',
  },
  nextIcon: {
    marginLeft: Spacing.sm,
  },
});
