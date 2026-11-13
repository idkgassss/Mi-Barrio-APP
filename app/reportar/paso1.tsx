import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, Stack } from 'expo-router';
// Importamos dos librerías de íconos que vienen nativas en Expo
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
// Importación estricta de tokens de diseño
import { Colors, Spacing, FontSize, Radius } from '@/constants/theme';

// Tipado estricto exigido por la cátedra para nuestra lista
type Categoria = {
  id: string;
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
};

// Data local estructurada (evita repetir código en el JSX)
const CATEGORIAS: Categoria[] = [
  { id: 'baches', label: 'Calle con baches', icon: 'road-variant', color: '#111827' }, // Negro oscuro
  { id: 'luminaria', label: 'Luminaria rota', icon: 'lightbulb-on', color: '#F59E0B' }, // Naranja/Amarillo
  { id: 'basural', label: 'Basural', icon: 'trash-can', color: '#22C55E' }, // Verde claro
  { id: 'inundacion', label: 'Inundaciones', icon: 'waves', color: '#3B82F6' }, // Azul
  { id: 'arbol', label: 'Árbol caído', icon: 'tree', color: '#22C55E' }, // Verde
  { id: 'semaforo', label: 'Semáforo roto', icon: 'traffic-light', color: '#EF4444' }, // Rojo
  { id: 'otro', label: 'Otro', icon: 'file-document', color: '#D946EF' }, // Fucsia/Morado
];

export default function Paso1Screen() {
  const router = useRouter();

  // Estado para guardar qué categoría eligió el usuario
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);

  const handleSiguiente = () => {
    if (categoriaSeleccionada) {
      // Avanzamos al Paso 2
      router.push('/reportar/paso2');
    }
  };

  return (
    <View style={styles.container}>
      {/* Ocultamos el header nativo para armar el nuestro a medida */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* HEADER CUSTOM (Flecha atrás + Título)*/}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nuevo reporte</Text>
      </View>

      <Text style={styles.subtitle}>¿Qué tipo de problema querés reportar?</Text>

      {/* LISTA DE CATEGORÍAS */}
      <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContent}>
        {CATEGORIAS.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryButton,
              // Aplicamos un borde dinámico si esta opción es la seleccionada
              categoriaSeleccionada === cat.id && styles.categoryButtonSelected,
            ]}
            onPress={() => setCategoriaSeleccionada(cat.id)}
          >
            <MaterialCommunityIcons
              name={cat.icon}
              size={24}
              color={cat.color}
              style={styles.icon}
            />
            <Text style={styles.categoryText}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* FOOTER FIJO (Botón Siguiente)*/}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            // Si no hay nada seleccionado, lo mostramos opaco
            !categoriaSeleccionada && styles.nextButtonDisabled,
          ]}
          onPress={handleSiguiente}
          disabled={!categoriaSeleccionada}
        >
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

  // -- Header --
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Spacing.xxl * 1.5, // Padding para el notch del celular
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

  // -- Subtítulo --
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.text,
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },

  // -- Lista de Botones --
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.08)', // Gris claro neutro idéntico al diseño
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md, // Separación entre botones
    // Bordes sutiles
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryButtonSelected: {
    // Cuando lo tocás, le pinta un borde azul sutil indicando selección
    borderColor: Colors.primary,
    backgroundColor: 'rgba(28, 100, 242, 0.05)',
  },
  icon: {
    width: 30, // Fijamos ancho para que todos los textos queden alineados
    marginRight: Spacing.md,
  },
  categoryText: {
    fontSize: FontSize.md,
    color: Colors.text,
  },

  // -- Footer y Botón Principal --
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
  nextButtonDisabled: {
    opacity: 0.5, // Baja la opacidad si no seleccionó categoría
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
