import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
// Importamos useLocalSearchParams para leer la orden del menú lateral
import { useRouter, useLocalSearchParams } from 'expo-router'; 

export default function PerfilScreen() {
  const router = useRouter();
  const { openHelp } = useLocalSearchParams(); // Capturamos el parámetro

  const [modalAyudaVisible, setModalAyudaVisible] = useState(false);

  // Efecto que revisa si entramos a la pantalla pidiendo abrir la ayuda
  useEffect(() => {
    if (openHelp === 'true') {
      setModalAyudaVisible(true);
      // Limpiamos el aviso para que no se abra solo si entras normalmente después
      router.setParams({ openHelp: '' });
    }
  }, [openHelp]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <FontAwesome5 name="user-circle" size={110} color="#000" />
          <View style={styles.cameraBadge}>
            <Ionicons name="camera" size={14} color="#FFF" />
          </View>
        </View>
        <Text style={styles.name}>Usuario de ejemplo</Text>
        <Text style={styles.email}>usuario@gmail.com</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="person" size={22} color="#000" />
            <Text style={styles.menuItemText}>Mis datos</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <MaterialIcons name="lock" size={22} color="#000" />
            <Text style={styles.menuItemText}>Cambiar nombre</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Este botón sigue funcionando también si el usuario entra manualmente a Perfil */}
        <TouchableOpacity style={styles.menuItem} onPress={() => setModalAyudaVisible(true)}>
          <View style={styles.menuItemLeft}>
            <MaterialIcons name="help" size={22} color="#000" />
            <Text style={styles.menuItemText}>Ayuda y soporte</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.replace('/(auth)/login')}>
          <View style={styles.menuItemLeft}>
            <MaterialIcons name="logout" size={22} color="#000" />
            <Text style={styles.menuItemText}>Cerrar sesión</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* MODAL: TARJETA AZUL DE SOPORTE */}
      <Modal
        visible={modalAyudaVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalAyudaVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => setModalAyudaVisible(false)}>
            <View style={styles.modalBackground} />
          </TouchableWithoutFeedback>
          
          <View style={styles.tarjetaAzul}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoMi}>mi</Text>
              <Text style={styles.logoBarrio}>barrio</Text>
            </View>
            
            <Text style={styles.tituloAyuda}>¿Necesitas asistencia?</Text>
            <Text style={styles.subtituloAyuda}>Contactanos!!</Text>
            
            <Text style={styles.textoAyuda}>
              El equipo de Mi Barrio está aquí para ayudarte. Si tienes inconvenientes para subir un reporte, la ubicación falla, o tienes dudas sobre los estados de tus reclamos, no dudes en contactarnos.
            </Text>
            
            <Text style={styles.contactoAyuda}>
              Correo: soporte@mibarrio.app{'\n'}
              WhatsApp: +54 9 11 1234-5678{'\n'}
              Horario: Lunes a Domingos de 8 a 18 hs.
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: { fontSize: 22, color: '#000', fontWeight: '300' },
  profileSection: { alignItems: 'center', marginBottom: 20 },
  avatarContainer: { position: 'relative', marginBottom: 10 },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 5,
    backgroundColor: '#3B82F6',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  name: { fontSize: 22, color: '#000', marginBottom: 4, fontWeight: '300' },
  email: { fontSize: 12, color: '#555' },
  divider: { height: 1, backgroundColor: '#666', marginHorizontal: 20, marginVertical: 5 },
  menuContainer: { paddingVertical: 5 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuItemText: { fontSize: 15, color: '#000', marginLeft: 15, fontWeight: '300' },

  /* ESTILOS DEL MODAL Y TARJETA AZUL */
  modalOverlay: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  tarjetaAzul: {
    width: '85%', 
    backgroundColor: '#2E64FE', 
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 30,
  },
  logoMi: {
    color: '#FF0000',
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -1,
  },
  logoBarrio: {
    color: '#004A99', 
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -1,
  },
  tituloAyuda: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtituloAyuda: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  textoAyuda: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  contactoAyuda: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 22,
  },
});