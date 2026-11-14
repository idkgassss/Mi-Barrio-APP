import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';
import MenuLateral from '../../components/MenuLateral';

export default function ReportesScreen() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [reportes, setReportes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const usuarioActual = auth.currentUser;
    if (!usuarioActual) {
      setReportes([]);
      setCargando(false);
      return;
    }

    const q = query(collection(db, 'reportes'), where('usuarioId', '==', usuarioActual.uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Ordenamos del más nuevo al más viejo
        lista.sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        setReportes(lista);
        setCargando(false);
      },
      (error) => {
        console.error('Error al cargar reportes:', error);
        setCargando(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const getEstadoInfo = (estado: string) => {
    const est = estado?.toLowerCase() || 'pendiente';
    if (est === 'solicitado' || est === 'solucionado') {
      return { color: '#22C55E', texto: 'Solicitado' };
    }
    if (est === 'en proceso' || est === 'proceso') {
      return { color: '#F97316', texto: 'En proceso' };
    }
    return { color: '#EF4444', texto: 'Pendiente' };
  };

  const formatearFecha = (fechaIso: string) => {
    if (!fechaIso) return '';
    const fecha = new Date(fechaIso);
    if (isNaN(fecha.getTime())) return fechaIso;
    return fecha.toLocaleDateString('es-AR');
  };

  const renderItem = ({ item }: { item: any }) => {
    const estadoInfo = getEstadoInfo(item.estado);
    const imagenUrl = item.foto || item.imagen;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          router.push({
            pathname: '/detalle/[id]',
            params: { id: item.id },
          });
        }}
      >
        <View style={styles.cardContent}>
          <View style={styles.infoContainer}>
            <View style={styles.row}>
              <Ionicons
                name="location-sharp"
                size={20}
                color={estadoInfo.color}
                style={styles.icon}
              />
              <Text style={styles.titulo} numberOfLines={1}>
                {item.titulo || item.categoria || 'Reporte vecinal'}
              </Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="location-outline" size={20} color="#888" style={styles.icon} />
              <Text style={styles.direccion} numberOfLines={2}>
                {item.ubicacion || item.direccion || 'Ubicación no especificada'}
              </Text>
            </View>

            <View style={[styles.row, styles.estadoRow]}>
              <View style={[styles.puntoEstado, { backgroundColor: estadoInfo.color }]} />
              <Text style={[styles.textoEstado, { color: estadoInfo.color }]}>
                {estadoInfo.texto}
              </Text>
            </View>
          </View>

          <View style={styles.imagenContainer}>
            {imagenUrl ? (
              <Image source={{ uri: imagenUrl }} style={styles.imagen} />
            ) : (
              <View style={[styles.imagen, styles.imagenPlaceholder]}>
                <Ionicons name="image-outline" size={24} color="#888" />
              </View>
            )}
            <Text style={styles.fecha}>{formatearFecha(item.fecha)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.header, { zIndex: 100, elevation: 10 }]}>
        <TouchableOpacity
          style={{ padding: 10 }}
          hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
          onPress={() => setMenuVisible(true)}
        >
          <Ionicons name="menu" size={36} color="black" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Text style={styles.logoMi}>mi</Text>
          <Text style={styles.logoBarrio}>barrio</Text>
        </View>

        <View style={{ width: 36 }} />
      </View>

      <Text style={styles.screenTitle}>Mis reportes</Text>

      {cargando ? (
        <View style={styles.centerEmpty}>
          <ActivityIndicator size="large" color="#1877F2" />
        </View>
      ) : reportes.length === 0 ? (
        <View style={styles.centerEmpty}>
          <Ionicons name="document-text-outline" size={64} color="#CCC" />
          <Text style={styles.emptyTitle}>Todavía no tenés reportes</Text>
          <Text style={styles.emptySubtitle}>
            Cuando envíes un reclamo desde el inicio, va a aparecer acá.
          </Text>
        </View>
      ) : (
        <FlatList
          data={reportes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listaPadding}
          showsVerticalScrollIndicator={false}
        />
      )}

      <MenuLateral visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  logoContainer: { flexDirection: 'row', alignItems: 'baseline' },
  logoMi: { color: '#FF0000', fontSize: 28, fontWeight: '900', letterSpacing: -1 },
  logoBarrio: { color: '#0056b3', fontSize: 28, fontWeight: '900', letterSpacing: -1 },
  screenTitle: {
    fontSize: 28,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  listaPadding: { paddingHorizontal: 20, paddingBottom: 20 },
  centerEmpty: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 15,
    textAlign: 'center',
  },
  emptySubtitle: { fontSize: 14, color: '#888', marginTop: 8, textAlign: 'center' },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#1877F2',
    padding: 15,
  },
  cardContent: { flexDirection: 'row', justifyContent: 'space-between' },
  infoContainer: { flex: 1, justifyContent: 'space-between', paddingRight: 10 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  icon: { marginRight: 8 },
  titulo: { fontSize: 15, fontWeight: '500', color: '#333', flex: 1 },
  direccion: { fontSize: 13, color: '#555', flex: 1 },
  estadoRow: { marginTop: 10, marginBottom: 0 },
  puntoEstado: { width: 12, height: 12, borderRadius: 6, marginRight: 8 },
  textoEstado: { fontSize: 13, fontWeight: '600' },
  imagenContainer: { alignItems: 'flex-end', justifyContent: 'space-between' },
  imagen: { width: 120, height: 80, borderRadius: 4, backgroundColor: '#E0E0E0' },
  imagenPlaceholder: { backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center' },
  fecha: { fontSize: 11, color: '#666', marginTop: 8, textAlign: 'right' },
});
