import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface MenuLateralProps {
  visible: boolean;
  onClose: () => void;
}

export default function MenuLateral({ visible, onClose }: MenuLateralProps) {
  const router = useRouter();

  const navegarA = (ruta: string) => {
    onClose(); 
    router.push(ruta as any); 
  };

  // NUEVA FUNCIÓN: Va al perfil y le avisa que debe abrir la ayuda
  const navegarAyuda = () => {
    onClose();
    router.push({ pathname: '/perfil', params: { openHelp: 'true' } });
  };

  return (
    <Modal 
      visible={visible} 
      transparent={true} 
      animationType="fade"
      onRequestClose={onClose} 
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.backgroundCatcher} 
          activeOpacity={1} 
          onPress={onClose} 
        />

        {/* UN SOLO CONTENEDOR CON BORDES DIBUJADOS */}
        <View style={styles.drawerContainer}>
          <SafeAreaView style={styles.safeArea}>
            
            <View style={styles.opcionesTop}>
              <TouchableOpacity style={styles.menuItem} onPress={() => navegarA('/perfil')}>
                <Ionicons name="person" size={32} color="black" style={styles.icon} />
                <Text style={styles.menuText}>Perfil</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={() => navegarA('/mapa')}>
                <Ionicons name="map" size={32} color="black" style={styles.icon} />
                <Text style={styles.menuText}>Mapa</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={() => navegarA('/reportes')}>
                <Ionicons name="clipboard" size={32} color="black" style={styles.icon} />
                <Text style={styles.menuText}>Reportes</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.opcionesBottom}>
              {/* Le asignamos la nueva función al botón de Ayuda */}
              <TouchableOpacity style={styles.menuItemBottom} onPress={navegarAyuda}>
                <Ionicons name="help-circle" size={28} color="black" style={styles.icon} />
                <Text style={styles.menuText}>Ayuda</Text>
              </TouchableOpacity>
            </View>

          </SafeAreaView>
        </View>
        
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  backgroundCatcher: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  drawerContainer: {
    width: '68%',
    height: '100%',
    backgroundColor: '#D9D9D9',
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    borderTopWidth: 15,
    borderBottomWidth: 15,
    borderRightWidth: 15,
    borderLeftWidth: 0,
    borderColor: '#5A55FF',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 40,
    paddingBottom: 20,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  opcionesTop: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  menuItemBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  icon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 22,
    color: '#000000',
    fontWeight: '400',
  },
  opcionesBottom: {},
});