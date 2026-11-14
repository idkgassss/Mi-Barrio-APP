import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter, Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Colors, Spacing, FontSize, Radius } from '@/constants/theme';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';

const OPCIONES_TIEMPO = [
  'Hace unos días',
  'Hace una semana',
  'Hace un mes',
  'Hace más de un mes',
  'No estoy seguro',
];

export default function Paso3Screen() {
  const router = useRouter();
  const { fotoUri } = useLocalSearchParams<{ fotoUri: string }>();

  const [descripcion, setDescripcion] = useState('');
  const [tiempoSeleccionado, setTiempoSeleccionado] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [ubicacion, setUbicacion] = useState<string | null>(null);
  const [cargandoUbicacion, setCargandoUbicacion] = useState(false);
  const [cargandoEnvio, setCargandoEnvio] = useState(false);

  // ENVÍO REAL A FIRESTORE
  const handleEnviar = async () => {
    if (!descripcion || !tiempoSeleccionado || !ubicacion) return;

    try {
      setCargandoEnvio(true);

      // Guardamos el documento completo con la foto en Base64 en Firestore
      await addDoc(collection(db, 'reportes'), {
        usuarioId: auth.currentUser?.uid || 'anonimo',
        emailUsuario: auth.currentUser?.email || 'Desconocido',
        descripcion: descripcion,
        antiguedad: tiempoSeleccionado,
        ubicacion: ubicacion,
        foto: fotoUri || null, // Aquí viaja el base64 comprimido
        fecha: new Date().toISOString(),
        estado: 'Pendiente',
      });

      router.push('/reportar/exito');
    } catch (error) {
      console.error('Error al guardar el reporte:', error);
      Alert.alert('Error', 'No se pudo enviar el reporte a la base de datos.');
    } finally {
      setCargandoEnvio(false);
    }
  };

  const obtenerUbicacionReal = async () => {
    try {
      setCargandoUbicacion(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Necesitamos acceso a tu ubicación.');
        setCargandoUbicacion(false);
        return;
      }

      const posicion = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = posicion.coords;
      const resultados = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (resultados.length > 0) {
        const direccion = resultados[0];
        const calle = direccion.street || 'Ubicación actual';
        const localidad = direccion.city || direccion.subregion || 'Buenos Aires';
        setUbicacion(`${calle}, ${localidad}`);
      } else {
        setUbicacion(`Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la ubicación actual.');
    } finally {
      setCargandoUbicacion(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nuevo reporte</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Contanos más detalles</Text>

        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Describe el problema..."
            placeholderTextColor="rgba(0,0,0,0.5)"
            multiline={true}
            numberOfLines={6}
            maxLength={400}
            textAlignVertical="top"
            value={descripcion}
            onChangeText={setDescripcion}
          />
          <Text style={styles.charCounter}>{descripcion.length}/400</Text>
        </View>

        {fotoUri && (
          <View style={styles.fotoContainer}>
            <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
            <Text style={styles.fotoText}>Foto adjuntada correctamente</Text>
            <Image source={{ uri: fotoUri }} style={styles.miniaturaFoto} />
          </View>
        )}

        <Text style={styles.dropdownLabel}>Ubicación del problema</Text>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={obtenerUbicacionReal}
          disabled={cargandoUbicacion}
        >
          <Ionicons
            name={ubicacion ? 'location' : 'location-outline'}
            size={20}
            color={ubicacion ? Colors.primary : Colors.text}
          />
          <Text style={[styles.locationText, !ubicacion && styles.dropdownPlaceholder]}>
            {cargandoUbicacion
              ? 'Obteniendo ubicación GPS...'
              : ubicacion
                ? ubicacion
                : 'Tocar para obtener mi ubicación'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.dropdownLabel}>¿Desde cuándo existe este problema?</Text>
        <TouchableOpacity style={styles.dropdownButton} onPress={() => setModalVisible(true)}>
          <Text style={[styles.dropdownText, !tiempoSeleccionado && styles.dropdownPlaceholder]}>
            {tiempoSeleccionado ? tiempoSeleccionado : 'Seleccionar'}
          </Text>
          <Ionicons name="chevron-down" size={20} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!descripcion || !tiempoSeleccionado || !ubicacion || cargandoEnvio) &&
              styles.submitButtonDisabled,
          ]}
          onPress={handleEnviar}
          disabled={!descripcion || !tiempoSeleccionado || !ubicacion || cargandoEnvio}
        >
          {cargandoEnvio ? (
            <ActivityIndicator color={Colors.surface} />
          ) : (
            <Text style={styles.submitButtonText}>Enviar reporte</Text>
          )}
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccionar antigüedad</Text>
            <FlatList
              data={OPCIONES_TIEMPO}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setTiempoSeleccionado(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Spacing.xxl * 1.5,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  backButton: { marginRight: Spacing.md },
  headerTitle: { fontSize: FontSize.xl, color: Colors.text },
  content: { flex: 1, paddingHorizontal: Spacing.xl, paddingTop: Spacing.lg },
  sectionTitle: { fontSize: FontSize.lg, color: Colors.text, marginBottom: Spacing.lg },
  textAreaContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: Radius.sm,
    padding: Spacing.md,
    height: 120,
    marginBottom: Spacing.md,
  },
  textArea: { flex: 1, fontSize: FontSize.md, color: Colors.text },
  charCounter: {
    position: 'absolute',
    bottom: Spacing.sm,
    right: Spacing.sm,
    fontSize: FontSize.sm,
    color: 'rgba(0,0,0,0.5)',
  },
  fotoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(28, 100, 242, 0.05)',
    padding: Spacing.sm,
    borderRadius: Radius.sm,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  fotoText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.primary,
    marginLeft: Spacing.sm,
    fontWeight: '500',
  },
  miniaturaFoto: { width: 40, height: 40, borderRadius: Radius.sm, marginLeft: Spacing.md },
  dropdownLabel: { fontSize: FontSize.md, color: Colors.text, marginBottom: Spacing.sm },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.sm,
    marginBottom: Spacing.xl,
  },
  dropdownText: { fontSize: FontSize.md, color: Colors.text },
  dropdownPlaceholder: { color: 'rgba(0,0,0,0.6)' },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.sm,
    marginBottom: Spacing.xl,
  },
  locationText: { fontSize: FontSize.md, color: Colors.text, marginLeft: Spacing.sm },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl * 1.5,
    backgroundColor: Colors.background,
    alignItems: 'flex-end',
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: 30,
    minWidth: 140,
    alignItems: 'center',
  },
  submitButtonDisabled: { opacity: 0.5 },
  submitButtonText: { color: Colors.surface, fontSize: FontSize.md, fontWeight: 'bold' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    marginBottom: Spacing.md,
    color: Colors.text,
  },
  modalOption: {
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  modalOptionText: { fontSize: FontSize.md, color: Colors.text },
});
