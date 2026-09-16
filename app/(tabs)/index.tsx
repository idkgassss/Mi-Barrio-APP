// app/(tabs)/index.tsx
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, FontSize, Radius } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header con nombre del proyecto */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Mi Barrio</Text>
        <Text style={styles.sub}>Reportes Ciudadanos - UNP 2026</Text>
      </View>

      {/* Sección de bienvenida */}
      <View style={styles.bienvenida}>
        <Text style={styles.msg}>
          ¡Bienvenido! Aquí podrás reportar problemas de tu zona y hacer un seguimiento en tiempo
          real.
        </Text>
      </View>

      {/* Sección de Features (Lo que vamos a construir) */}
      <View style={styles.features}>
        <Text style={styles.featureLabel}>Módulos del Proyecto:</Text>
        <View style={styles.featureCard}>
          <Text style={styles.featureText}>📍 Mapa de reportes y geolocalización</Text>
        </View>
        <View style={styles.featureCard}>
          <Text style={styles.featureText}>📷 Registro con cámara y fotos</Text>
        </View>
        <View style={styles.featureCard}>
          <Text style={styles.featureText}>📊 Estados: Pendientes, En Proceso, Solucionados</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.md,
  },
  header: {
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surface,
  },
  titulo: {
    fontSize: FontSize.xxxl,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  sub: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
  bienvenida: {
    paddingVertical: Spacing.lg,
  },
  msg: {
    fontSize: FontSize.lg,
    color: Colors.text,
    lineHeight: 22,
  },
  features: {
    flex: 1,
    gap: Spacing.sm,
  },
  featureLabel: {
    fontSize: FontSize.md,
    fontWeight: 'bold',
    color: Colors.textMuted,
    marginBottom: Spacing.xs,
  },
  featureCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: Radius.md,
  },
  featureText: {
    fontSize: FontSize.md,
    color: Colors.text,
    fontWeight: '500',
  },
});
