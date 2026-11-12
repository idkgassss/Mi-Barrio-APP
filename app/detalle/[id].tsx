import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// Importamos tu base de datos local
import { REPORTES_MOCK } from '../../data/mockData';

export default function DetalleReporteScreen() {
  // 1. Atrapamos SOLO el ID de la URL
  const { id } = useLocalSearchParams<{ id: string }>();

  // 2. Buscamos todos los datos del reporte en nuestra base local
  const reporte = REPORTES_MOCK.find((r) => r.id === id);

  if (!reporte) {
    return (
      <View style={styles.containerCenter}>
        <Ionicons name="alert-circle-outline" size={60} color="#CCC" />
        <Text style={styles.errorText}>Reporte no encontrado</Text>
      </View>
    );
  }

  // Reutilizamos la lógica de colores de estado de la pantalla principal
  const getEstadoInfo = (estado: string, solucionado: boolean) => {
    if (solucionado || estado === 'solucionado') {
      return { color: '#00FF00', texto: 'Solucionado', bg: '#E5FFE5' };
    }
    if (estado === 'en proceso' || estado === 'proceso') {
      return { color: '#FFA500', texto: 'En proceso', bg: '#FFF3E0' };
    }
    return { color: '#FF0000', texto: 'Pendiente', bg: '#FFE5E5' };
  };

  const estadoInfo = getEstadoInfo(reporte.estado?.toLowerCase() || '', reporte.solucionado);
  const imagenUrl = reporte.imagen || reporte.foto;

  // 3. Renderizamos la pantalla con los datos reales
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Configuración superior del Header nativo de Expo Router */}
      <Stack.Screen 
        options={{ 
          title: 'Detalles del Reclamo',
          headerStyle: { backgroundColor: '#ffffff' },
          headerTintColor: '#0056b3', // Azul del logo de Mi Barrio
          headerTitleStyle: { fontWeight: 'bold' },
          headerBackTitleVisible: false, // Oculta el texto de "Volver" en iOS para que quede más limpio
        }} 
      />

      {/* Imagen a pantalla completa (arriba) */}
      {imagenUrl ? (
        <Image source={{ uri: imagenUrl }} style={styles.imagen} />
      ) : (
        <View style={[styles.imagen, styles.imagenPlaceholder]}>
          <Ionicons name="image-outline" size={40} color="#999" />
          <Text style={{color: '#999', marginTop: 10}}>Sin imagen adjunta</Text>
        </View>
      )}

      {/* Tarjeta blanca superpuesta con la info */}
      <View style={styles.infoCaja}>
        
        {/* Título Principal */}
        <Text style={styles.titulo}>{reporte.titulo}</Text>

        {/* Categoría y Dirección con íconos */}
        <View style={styles.row}>
          <Ionicons name="folder-open-outline" size={18} color="#666" style={styles.icon} />
          <Text style={styles.categoria}>{reporte.categoria || 'Sin categoría'}</Text>
        </View>

        {reporte.direccion && (
          <View style={styles.row}>
            <Ionicons name="location-outline" size={18} color="#666" style={styles.icon} />
            <Text style={styles.direccion}>{reporte.direccion}</Text>
          </View>
        )}

        {/* Etiqueta de Estado */}
        <View style={[styles.badge, { backgroundColor: estadoInfo.bg, borderColor: estadoInfo.color }]}>
          <View style={[styles.puntoEstado, { backgroundColor: estadoInfo.color }]} />
          <Text style={[styles.badgeText, { color: estadoInfo.color }]}>
            {estadoInfo.texto}
          </Text>
        </View>

        <View style={styles.separador} />

        {/* Sección de Descripción */}
        <View style={styles.descripcionHeader}>
          <Ionicons name="chatbubble-ellipses-outline" size={22} color="#1877F2" style={styles.icon} />
          <Text style={styles.descripcionTitulo}>Descripción del vecino:</Text>
        </View>
        
        <View style={styles.descripcionCaja}>
          <Text style={styles.descripcion}>
            {reporte.descripcion || 'El vecino no proporcionó detalles adicionales al momento de enviar este reporte.'}
          </Text>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F5F5F5' 
  },
  containerCenter: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#F5F5F5'
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginTop: 15,
    fontWeight: 'bold'
  },
  imagen: { 
    width: '100%', 
    height: 280, 
    backgroundColor: '#DDD' 
  },
  imagenPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAEAEA'
  },
  infoCaja: { 
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    marginTop: -25, // Efecto de superposición sobre la imagen
    minHeight: 500, // Asegura que cubra el fondo gris hasta abajo
  },
  titulo: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    marginBottom: 15,
    color: '#333'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  categoria: { 
    fontSize: 15, 
    color: '#555', 
    textTransform: 'capitalize' 
  },
  direccion: {
    fontSize: 15, 
    color: '#555', 
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 25,
    borderRadius: 20,
    borderWidth: 1,
  },
  puntoEstado: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  badgeText: { 
    fontSize: 14, 
    fontWeight: 'bold' 
  },
  separador: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginBottom: 20,
  },
  descripcionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  descripcionTitulo: { 
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#333'
  },
  descripcionCaja: {
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  descripcion: { 
    fontSize: 15, 
    color: '#444', 
    lineHeight: 24 
  },
}); 