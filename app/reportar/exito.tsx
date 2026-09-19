import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// Importación estricta de diseño
import { Colors, Spacing, FontSize } from '@/constants/theme';

export default function ExitoScreen() {
  const router = useRouter();

  const handleVolverInicio = () => {
    // Usamos replace para destruir el historial del Wizard.
    // Así evitamos que el usuario vuelva a un formulario ya enviado presionando "Atrás".
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      {/* Ocultamos el header para que la pantalla ocupe todo el espacio */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* ==========================================
          CONTENEDOR CENTRAL (Ícono y Textos)
          ========================================== */}
      <View style={styles.content}>
        {/* Construcción del Ícono Complejo */}
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons
            name="clipboard-text"
            size={80}
            color={Colors.surface} // Portapapeles blanco
          />
          {/* Tilde verde superpuesta */}
          <View style={styles.checkBadge}>
            <MaterialCommunityIcons
              name="check-circle"
              size={36}
              color={Colors.success || '#00FF00'} // Fallback al verde brillante si no está en el theme
            />
          </View>
        </View>

        {/* Textos de Confirmación */}
        <Text style={styles.title}>¡Reporte enviado!</Text>

        <Text style={styles.subtitle}>GRACIAS POR AYUDAR A MEJORAR{'\n'}NUESTRA CIUDAD.</Text>

        <Text style={styles.message}>TU REPORTE FUE REGISTRADO{'\n'}CORRECTAMENTE.</Text>
      </View>

      {/* ==========================================
          FOOTER (Botón Volver al inicio)
          ========================================== */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleVolverInicio}>
          <Text style={styles.homeButtonText}>VOLVER AL INICIO</Text>
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

  // -- Contenido Central --
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },

  // -- Ícono Personalizado --
  iconCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Colors.primary, // Círculo azul gigante
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xxl * 1.5,
  },
  checkBadge: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.surface, // Fondo blanco para que la tilde resalte y recorte el azul
    borderRadius: 18,
  },

  // -- Tipografía --
  title: {
    fontSize: FontSize.xl * 1.2, // Un poco más grande que el xl normal
    color: Colors.text,
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    lineHeight: 20, // Mejora la legibilidad en textos en mayúscula
  },
  message: {
    fontSize: FontSize.sm,
    color: 'rgba(0,0,0,0.6)', // Un gris un poco más sutil para diferenciar jerarquía
    textAlign: 'center',
    lineHeight: 20,
  },

  // -- Footer y Botón --
  footer: {
    paddingBottom: Spacing.xxl * 2, // Lo despega bien del borde inferior
    alignItems: 'center',
  },
  homeButtonText: {
    color: Colors.primary,
    fontSize: FontSize.md,
    textDecorationLine: 'underline',
  },
});
