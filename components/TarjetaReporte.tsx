// components/TarjetaReporte.tsx
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Reporte } from '@/types';
import { Colors, Spacing, FontSize, Radius } from '@/constants/theme';

interface Props {
  reporte: Reporte;
  onPress: (r: Reporte) => void;
  onFavorito: (id: string) => void;
}

export function TarjetaReporte({ reporte, onPress, onFavorito }: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(reporte)}
      activeOpacity={0.85}
    >
      <Image source={{ uri: reporte.imagen }} style={styles.imagen} />
      
      <View style={styles.info}>
        <Text style={styles.titulo}>{reporte.titulo}</Text>
        <Text style={styles.categoria}>{reporte.categoria.toUpperCase()}</Text>

        {/* Conditional Rendering: Renderizamos distintos textos y colores según el estado */}
        {reporte.solucionado ? (
          <Text style={styles.resuelto}>✓ Solucionado</Text>
        ) : (
          <Text style={styles.pendiente}>⚠ Pendiente</Text>
        )}
      </View>

      <TouchableOpacity onPress={() => onFavorito(reporte.id)}>
        <Text style={styles.icono}>⭐</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: Radius.sm,
    elevation: 2,
  },
  imagen: {
    width: 60, 
    height: 60, 
    borderRadius: Radius.sm, 
    marginRight: Spacing.md 
  },
  info: { 
    flex: 1 
  },
  titulo: { 
    fontSize: FontSize.md, 
    fontWeight: 'bold', 
    color: Colors.text 
  },
  categoria: { 
    fontSize: FontSize.xs, 
    color: Colors.textMuted, 
    marginTop: Spacing.xs 
  },
  resuelto: { 
    fontSize: FontSize.sm, 
    color: Colors.success, 
    fontWeight: 'bold', 
    marginTop: Spacing.xs 
  },
  pendiente: { 
    fontSize: FontSize.sm, 
    color: Colors.warning, 
    fontWeight: 'bold', 
    marginTop: Spacing.xs 
  },
  icono: { 
    fontSize: FontSize.xl, 
    color: Colors.textMuted 
  }
});