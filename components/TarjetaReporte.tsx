// components/TarjetaReporte.tsx
import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Reporte } from '@/hooks/useReportes'; // 
import { Colors, Spacing, FontSize, Radius } from '@/constants/theme';


interface Props {
  reporte: Reporte;
  onPress: (r: Reporte) => void;
  onFavorito?: (id: string) => void;
}

function TarjetaReporteBase({ reporte, onPress, onFavorito }: Props) {
  // Verificamos el estado según nuestro Zod schema (estado: 'Pendiente' | 'En proceso' | 'Resuelto')
  const esResuelto = reporte.estado === 'Resuelto';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(reporte)}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={`Reporte: ${reporte.titulo}, categoría ${reporte.categoria}, estado ${reporte.estado}`}
    >
      <Image 
        source={{ uri: reporte.imagen }} 
        style={styles.imagen} 
        accessibilityRole="image"
        accessibilityLabel={`Foto de ${reporte.titulo}`}
      />
      
      <View style={styles.info}>
        <Text style={styles.titulo}>{reporte.titulo}</Text>
        <Text style={styles.categoria}>{reporte.categoria?.toUpperCase()}</Text>

        {/* Renderizado condicional adaptado al campo 'estado' de Firestore */}
        {esResuelto ? (
          <Text style={styles.resuelto}>✓ Resuelto</Text>
        ) : (
          <Text style={styles.pendiente}>⚠ {reporte.estado || 'Pendiente'}</Text>
        )}
      </View>

      {onFavorito && (
        <TouchableOpacity 
          onPress={() => onFavorito(reporte.id)}
          accessibilityRole="button"
          accessibilityLabel="Marcar como favorito"
        >
          <Text style={styles.icono}>⭐</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

// Envolver en React.memo para evitar re-renders en la FlashList
export const TarjetaReporte = memo(TarjetaReporteBase);

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