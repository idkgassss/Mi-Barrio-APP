import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, Radius } from '@/constants/theme';

type Categoria = {
  id: string;
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
};

const CATEGORIAS: Categoria[] = [
  { id: 'Calle con baches', label: 'Calle con baches', icon: 'road-variant', color: '#111827' },
  { id: 'Luminaria rota', label: 'Luminaria rota', icon: 'lightbulb-on', color: '#F59E0B' },
  { id: 'Basural', label: 'Basural', icon: 'trash-can', color: '#22C55E' },
  { id: 'Inundaciones', label: 'Inundaciones', icon: 'waves', color: '#3B82F6' },
  { id: 'Árbol caído', label: 'Árbol caído', icon: 'tree', color: '#22C55E' },
  { id: 'Semáforo roto', label: 'Semáforo roto', icon: 'traffic-light', color: '#EF4444' },
  { id: 'Otro', label: 'Otro', icon: 'file-document', color: '#D946EF' },
];

export default function Paso1Screen() {
  const router = useRouter();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);

  const handleSiguiente = () => {
    if (categoriaSeleccionada) {
      // CORRECCIÓN: Mandamos la categoría al paso 2
      router.push({
        pathname: '/reportar/paso2',
        params: { categoria: categoriaSeleccionada }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nuevo reporte</Text>
      </View>

      <Text style={styles.subtitle}>¿Qué tipo de problema querés reportar?</Text>

      <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContent}>
        {CATEGORIAS.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryButton,
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

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
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
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: Spacing.xxl * 1.5, paddingHorizontal: Spacing.lg, paddingBottom: Spacing.lg },
  backButton: { marginRight: Spacing.md },
  headerTitle: { fontSize: FontSize.xl, color: Colors.text },
  subtitle: { fontSize: FontSize.md, color: Colors.text, paddingHorizontal: Spacing.xl, marginBottom: Spacing.xl },
  listContainer: { flex: 1 },
  listContent: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing.xxl },
  categoryButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.08)', paddingVertical: Spacing.md, paddingHorizontal: Spacing.lg, marginBottom: Spacing.md, borderWidth: 2, borderColor: 'transparent' },
  categoryButtonSelected: { borderColor: Colors.primary, backgroundColor: 'rgba(28, 100, 242, 0.05)' },
  icon: { width: 30, marginRight: Spacing.md },
  categoryText: { fontSize: FontSize.md, color: Colors.text },
  footer: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.xxl * 1.5, backgroundColor: Colors.background },
  nextButton: { backgroundColor: Colors.primary, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: Spacing.md, borderRadius: Radius.lg },
  nextButtonDisabled: { opacity: 0.5 },
  nextButtonText: { color: Colors.surface, fontSize: FontSize.lg, fontWeight: 'bold' },
  nextIcon: { marginLeft: Spacing.sm },
});