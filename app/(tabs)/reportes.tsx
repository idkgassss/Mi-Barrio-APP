import React, { useState } from 'react';
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
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Importamos tu mockData real
import { REPORTES_MOCK } from '../../data/mockData';
// Importamos el menú lateral
import MenuLateral from '../../components/MenuLateral';

export default function ReportesScreen() {
  const router = useRouter();
  
  const [menuVisible, setMenuVisible] = useState(false);

  const getEstadoInfo = (estado: string, solucionado: boolean) => {
    if (solucionado || estado === 'solucionado') {
      return { color: '#00FF00', texto: 'Solucionado' };
    }
    if (estado === 'en proceso' || estado === 'proceso') {
      return { color: '#FFA500', texto: 'En proceso' };
    }
    return { color: '#FF0000', texto: 'Pendiente' };
  };

  const renderItem = ({ item }: { item: any }) => {
    const estadoInfo = getEstadoInfo(item.estado?.toLowerCase() || '', item.solucionado);
    const imagenUrl = item.imagen || item.foto;

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
              <Ionicons name="location-sharp" size={20} color={estadoInfo.color} style={styles.icon} />
              <Text style={styles.titulo}>{item.titulo}</Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="location-outline" size={20} color="#888" style={styles.icon} />
              <Text style={styles.direccion}>{item.direccion || 'Dirección no especificada'}</Text>
            </View>

            <View style={[styles.row, styles.estadoRow]}>
              <View style={[styles.puntoEstado, { backgroundColor: estadoInfo.color }]} />
              <Text style={[styles.textoEstado, { color: estadoInfo.color }]}>{estadoInfo.texto}</Text>
            </View>
          </View>

          <View style={styles.imagenContainer}>
            {imagenUrl ? (
              <Image source={{ uri: imagenUrl }} style={styles.imagen} />
            ) : (
              <View style={[styles.imagen, styles.imagenPlaceholder]} />
            )}
            <Text style={styles.fecha}>{item.fecha || '23/08/2026'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER con Z-Index altísimo para que nada lo bloquee */}
      <View style={[styles.header, { zIndex: 100, elevation: 10 }]}>
        
        {/* hitSlop expande el área táctil sin cambiar el diseño visual */}
        <TouchableOpacity 
          style={{ padding: 10 }} 
          hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
          onPress={() => {
            console.log(">>> BOTON DE MENU PRESIONADO EN EL CELULAR <<<");
            setMenuVisible(true);
          }}
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

      <FlatList
        data={REPORTES_MOCK}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listaPadding}
        showsVerticalScrollIndicator={false}
      />

      <MenuLateral 
        visible={menuVisible} 
        onClose={() => setMenuVisible(false)} 
      />
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
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  logoMi: {
    color: '#FF0000',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -1,
  },
  logoBarrio: {
    color: '#0056b3',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -1,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  listaPadding: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#1877F2',
    padding: 15,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
  },
  titulo: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  direccion: {
    fontSize: 13,
    color: '#555',
    flex: 1,
  },
  estadoRow: {
    marginTop: 10,
    marginBottom: 0,
  },
  puntoEstado: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  textoEstado: {
    fontSize: 13,
    fontWeight: '500',
  },
  imagenContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  imagen: {
    width: 120,
    height: 80,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  imagenPlaceholder: {
    backgroundColor: '#E0E0E0',
  },
  fecha: {
    fontSize: 11,
    color: '#666',
    marginTop: 8,
    textAlign: 'right',
  },
});