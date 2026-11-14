import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebase';

export default function DetalleReporteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [reporte, setReporte] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!id) {
      setCargando(false);
      return;
    }

    const docRef = doc(db, 'reportes', id);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setReporte({ id: docSnap.id, ...docSnap.data() });
        } else {
          setReporte(null);
        }
        setCargando(false);
      },
      (error) => {
        console.error('Error al cargar detalle:', error);
        setCargando(false);
      }
    );

    return () => unsubscribe();
  }, [id]);

  if (cargando) {
    return (
      <View style={styles.containerCenter}>
        <ActivityIndicator size="large" color="#0056b3" />
      </View>
    );
  }

  if (!reporte) {
    return (
      <View style={styles.containerCenter}>
        <Ionicons name="alert-circle-outline" size={60} color="#CCC" />
        <Text style={styles.errorText}>Reporte no encontrado</Text>
      </View>
    );
  }

  const getEstadoInfo = (estado: string) => {
    const est = estado?.toLowerCase() || 'pendiente';
    if (est === 'solicitado' || est === 'solucionado') {
      return { color: '#22C55E', texto: 'Solicitado', bg: '#E5FFE5' };
    }
    if (est === 'en proceso' || est === 'proceso') {
      return { color: '#F97316', texto: 'En proceso', bg: '#FFF3E0' };
    }
    return { color: '#EF4444', texto: 'Pendiente', bg: '#FFE5E5' };
  };

  const estadoInfo = getEstadoInfo(reporte.estado);
  const imagenUrl = reporte.foto || reporte.imagen;
  const direccionTexto = reporte.ubicacion || reporte.direccion;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen
        options={{
          title: 'Detalles del Reclamo',
          headerStyle: { backgroundColor: '#ffffff' },
          headerTintColor: '#0056b3',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />

      {imagenUrl ? (
        <Image source={{ uri: imagenUrl }} style={styles.imagen} resizeMode="cover" />
      ) : (
        <View style={[styles.imagen, styles.imagenPlaceholder]}>
          <Ionicons name="image-outline" size={40} color="#999" />
          <Text style={{ color: '#999', marginTop: 10 }}>Sin imagen adjunta</Text>
        </View>
      )}

      <View style={styles.infoCaja}>
        <Text style={styles.titulo}>
          {reporte.titulo || reporte.categoria || 'Reporte vecinal'}
        </Text>

        {reporte.antiguedad && (
          <View style={styles.row}>
            <Ionicons name="time-outline" size={18} color="#666" style={styles.icon} />
            <Text style={styles.categoria}>Antigüedad: {reporte.antiguedad}</Text>
          </View>
        )}

        {direccionTexto && (
          <View style={styles.row}>
            <Ionicons name="location-outline" size={18} color="#666" style={styles.icon} />
            <Text style={styles.direccion}>{direccionTexto}</Text>
          </View>
        )}

        <View
          style={[styles.badge, { backgroundColor: estadoInfo.bg, borderColor: estadoInfo.color }]}
        >
          <View style={[styles.puntoEstado, { backgroundColor: estadoInfo.color }]} />
          <Text style={[styles.badgeText, { color: estadoInfo.color }]}>{estadoInfo.texto}</Text>
        </View>

        <View style={styles.separador} />

        <View style={styles.descripcionHeader}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={22}
            color="#1877F2"
            style={styles.icon}
          />
          <Text style={styles.descripcionTitulo}>Descripción del vecino:</Text>
        </View>

        <View style={styles.descripcionCaja}>
          <Text style={styles.descripcion}>
            {reporte.descripcion || 'Sin detalles adicionales.'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  errorText: { fontSize: 18, color: '#666', marginTop: 15, fontWeight: 'bold' },
  imagen: { width: '100%', height: 280, backgroundColor: '#DDD' },
  imagenPlaceholder: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#EAEAEA' },
  infoCaja: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    marginTop: -25,
    minHeight: 500,
  },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  icon: { marginRight: 8 },
  categoria: { fontSize: 15, color: '#555' },
  direccion: { fontSize: 15, color: '#555', flex: 1 },
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
  puntoEstado: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  badgeText: { fontSize: 14, fontWeight: 'bold' },
  separador: { height: 1, backgroundColor: '#EEEEEE', marginBottom: 20 },
  descripcionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  descripcionTitulo: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  descripcionCaja: {
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  descripcion: { fontSize: 15, color: '#444', lineHeight: 24 },
});
