import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
// Importamos Ionicons para la hamburguesa y la campana (viene preinstalado en Expo)
import { Ionicons } from '@expo/vector-icons';
// Importación estricta de tokens de diseño
import { Colors, Spacing, FontSize, Radius } from '@/constants/theme';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Ocultamos el header automático de Expo Router para usar el nuestro */}
      <Tabs.Screen options={{ headerShown: false }} />

      {/*HEADER Menú, Logo, Notificaciones*/}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color={Colors.text} />
        </TouchableOpacity>

        <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />

        <TouchableOpacity>
          <Ionicons name="notifications" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      {/*TÍTULO PRINCIPAL */}
      <Text style={styles.welcomeTitle}>Bienvenido a Mi Barrio</Text>

      {/*SECCIÓN: MIS REPORTES */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Mis Reportes</Text>
        <TouchableOpacity>
          <Text style={styles.verTodosLink}>Ver todos</Text>
        </TouchableOpacity>
      </View>

      {/*TARJETA GRIS DE RESUMEN*/}
      <View style={styles.summaryCard}>
        {/* Fila: Pendientes */}
        <View style={styles.summaryRow}>
          <View style={styles.rowLeft}>
            {/* Nota: Si tu theme.ts no tiene 'danger', agregalo o usá este fallback */}
            <View style={[styles.dot, { backgroundColor: Colors.danger || '#EF4444' }]} />
            <Text style={styles.rowText}>Pendientes</Text>
          </View>
          <Text style={styles.rowCount}>2</Text>
        </View>

        {/* Fila: En proceso */}
        <View style={styles.summaryRow}>
          <View style={styles.rowLeft}>
            <View style={[styles.dot, { backgroundColor: Colors.warning || '#F97316' }]} />
            <Text style={styles.rowText}>En proceso</Text>
          </View>
          <Text style={styles.rowCount}>1</Text>
        </View>

        {/* Fila: Solucionados */}
        <View style={styles.summaryRow}>
          <View style={styles.rowLeft}>
            <View style={[styles.dot, { backgroundColor: Colors.success || '#22C55E' }]} />
            <Text style={styles.rowText}>Solucionados</Text>
          </View>
          <Text style={styles.rowCount}>4</Text>
        </View>
      </View>

      {/* BOTÓN DE ACCIÓN PRINCIPAL (Inicia el Wizard)*/}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => router.push('/reportar/paso1')}
        >
          <Text style={styles.reportButtonText}>Reportar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    // Padding superior para que no choque con la barra de estado del celular
    paddingTop: Spacing.xxl * 1.5,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },

  // -- Estilos del Header --
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  logo: {
    width: 140, // Más chico que en el login para que encaje en el header
    height: 40,
  },

  // -- Título --
  welcomeTitle: {
    fontSize: FontSize.xl,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
  },

  // -- Cabecera de la sección --
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.md,
    color: Colors.text,
  },
  verTodosLink: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },

  // -- Tarjeta Gris --
  summaryCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)', // Genera un gris sutil dinámico sin hardcodear un hexadecimal opaco
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xxl,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surface, // Blanco
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: Spacing.sm,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: Spacing.sm,
  },
  rowText: {
    fontSize: FontSize.md,
    color: Colors.text,
  },
  rowCount: {
    fontSize: FontSize.md,
    color: Colors.text,
    fontWeight: 'bold',
  },

  // -- Botón Reportar --
  buttonContainer: {
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  reportButton: {
    backgroundColor: Colors.primary,
    width: '100%',
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    alignItems: 'center',
  },
  reportButtonText: {
    color: Colors.surface,
    fontSize: FontSize.lg,
    fontWeight: 'bold',
  },
});
