import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router'; 

export default function PerfilScreen() {
  const router = useRouter();
  const { openHelp } = useLocalSearchParams(); 

  // Estados independientes para cada modal
  const [modalAyudaVisible, setModalAyudaVisible] = useState(false);
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);
  const [modalDatosVisible, setModalDatosVisible] = useState(false); // 👈 Nuevo estado para "Mis datos"

  useEffect(() => {
    if (openHelp === 'true') {
      setModalAyudaVisible(true);
      router.setParams({ openHelp: '' });
    }
  }, [openHelp]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome5 name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <FontAwesome5 name="user-circle" size={120} color="#000" solid />
          <View style={styles.cameraBadge}>
            <FontAwesome5 name="camera" size={14} color="#3B82F6" />
          </View>
        </View>
        <Text style={styles.name}>Usuario Ejemplo</Text>
        <Text style={styles.email}>usuario@gmail.com</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.menuContainer}>
        
        {/* BOTÓN MIS DATOS - ABRE TARJETA DE DATOS PRIVADOS */}
        <TouchableOpacity style={styles.menuItem} onPress={() => setModalDatosVisible(true)}>
          <View style={styles.menuItemLeft}>
            <FontAwesome5 name="user-alt" size={20} color="#000" style={styles.iconWidth} />
            <Text style={styles.menuItemText}>Mis datos</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#000" />
        </TouchableOpacity>

        {/* BOTÓN CAMBIAR CONTRASEÑA - ABRE TARJETA DE CONTRASEÑA */}
        <TouchableOpacity style={styles.menuItem} onPress={() => setModalPasswordVisible(true)}>
          <View style={styles.menuItemLeft}>
            <FontAwesome5 name="lock" size={20} color="#000" style={styles.iconWidth} />
            <Text style={styles.menuItemText}>Cambiar contraseña</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#000" />
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* BOTÓN AYUDA Y SOPORTE - ABRE TARJETA ORIGINAL */}
        <TouchableOpacity style={styles.menuItem} onPress={() => setModalAyudaVisible(true)}>
          <View style={styles.menuItemLeft}>
            <FontAwesome5 name="question-circle" size={22} color="#000" solid style={styles.iconWidth} />
            <Text style={styles.menuItemText}>Ayuda y soporte</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#000" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuItem} onPress={() => router.replace('/(auth)/login')}>
          <View style={styles.menuItemLeft}>
            <FontAwesome5 name="sign-out-alt" size={22} color="#000" style={styles.iconWidth} />
            <Text style={styles.menuItemText}>Cerrar sesión</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      {/* MODAL 1: MIS DATOS PRIVADOS */}
      <Modal
        visible={modalDatosVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalDatosVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => setModalDatosVisible(false)}>
            <View style={styles.modalBackground} />
          </TouchableWithoutFeedback>
          
          <View style={styles.tarjetaAzul}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoMi}>mi </Text>
              <Text style={styles.logoBarrio}>barrio</Text>
            </View>
            
            <Text style={styles.tituloAyudaCentral}>¿Quieres ver tus datos mas privados?</Text>
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

      {/* MODAL 2: CAMBIO DE CONTRASEÑA */}
      <Modal
        visible={modalPasswordVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalPasswordVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => setModalPasswordVisible(false)}>
            <View style={styles.modalBackground} />
          </TouchableWithoutFeedback>
          
          <View style={styles.tarjetaAzul}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoMi}>mi </Text>
              <Text style={styles.logoBarrio}>barrio</Text>
            </View>
            
            <Text style={styles.tituloAyudaCentral}>¿Quieres cambiar tu contraseña?</Text>
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

      {/* MODAL 3: AYUDA Y SOPORTE ORIGINAL */}
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
              <Text style={styles.logoMi}>mi </Text>
              <Text style={styles.logoBarrio}>barrio</Text>
            </View>
            
            <Text style={styles.tituloAyudaCentral}>¿Necesitas asistencia?</Text>
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
  headerTitle: { fontSize: 24, color: '#000', fontWeight: '300' },
  profileSection: { alignItems: 'center', marginBottom: 20 },
  avatarContainer: { position: 'relative', marginBottom: 15 },
  cameraBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#E5E7EB',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  name: { fontSize: 24, color: '#000', marginBottom: 4, fontWeight: '300' },
  email: { fontSize: 14, color: '#555' },
  divider: { height: 1, backgroundColor: '#222', marginHorizontal: 20, marginVertical: 0 },
  menuContainer: { paddingVertical: 10 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  iconWidth: { width: 28, textAlign: 'center' },
  menuItemText: { fontSize: 16, color: '#000', marginLeft: 15, fontWeight: '300' },

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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  tarjetaAzul: {
    width: '85%', 
    backgroundColor: '#3B82F6', 
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
    color: '#EF4444',
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -1,
  },
  logoBarrio: {
    color: '#1E3A8A', 
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -1,
  },
  tituloAyudaCentral: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtituloAyuda: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
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