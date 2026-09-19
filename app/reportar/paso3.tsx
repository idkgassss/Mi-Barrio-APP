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
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, Radius } from '@/constants/theme';

const OPCIONES_TIEMPO = [
  'Hace unos días',
  'Hace una semana',
  'Hace un mes',
  'Hace más de un mes',
  'No estoy seguro',
];

export default function Paso3Screen() {
  const router = useRouter();

  const [descripcion, setDescripcion] = useState('');
  const [tiempoSeleccionado, setTiempoSeleccionado] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // NUEVO: Estado para la ubicación
  const [ubicacion, setUbicacion] = useState<string | null>(null);

  const handleEnviar = () => {
    router.push('/reportar/exito');
  };

  // NUEVO: Función para simular la captura del GPS
  const simularObtenerUbicacion = () => {
    // Simulamos un pequeño tiempo de carga y seteamos una dirección de prueba
    setUbicacion('Presidente Derqui, Buenos Aires');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Stack.Screen options={{ headerShown: false }} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nuevo reporte</Text>
      </View>

      {/* CONTENIDO CENTRAL */}
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

        {/* NUEVO: Botón de Ubicación */}
        <Text style={styles.dropdownLabel}>Ubicación del problema</Text>
        <TouchableOpacity style={styles.locationButton} onPress={simularObtenerUbicacion}>
          <Ionicons
            name={ubicacion ? 'location' : 'location-outline'}
            size={20}
            color={ubicacion ? Colors.primary : Colors.text}
          />
          <Text style={[styles.locationText, !ubicacion && styles.dropdownPlaceholder]}>
            {ubicacion ? ubicacion : 'Tocar para obtener mi ubicación'}
          </Text>
        </TouchableOpacity>

        {/* Dropdown de Antigüedad */}
        <Text style={styles.dropdownLabel}>¿Desde cuándo existe este problema?</Text>
        <TouchableOpacity style={styles.dropdownButton} onPress={() => setModalVisible(true)}>
          <Text style={[styles.dropdownText, !tiempoSeleccionado && styles.dropdownPlaceholder]}>
            {tiempoSeleccionado ? tiempoSeleccionado : 'Seleccionar'}
          </Text>
          <Ionicons name="chevron-down" size={20} color={Colors.text} />
        </TouchableOpacity>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            // Ahora requiere los 3 campos: descripción, tiempo Y ubicación
            (!descripcion || !tiempoSeleccionado || !ubicacion) && styles.submitButtonDisabled,
          ]}
          onPress={handleEnviar}
          disabled={!descripcion || !tiempoSeleccionado || !ubicacion}
        >
          <Text style={styles.submitButtonText}>Enviar reporte</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL SELECTOR */}
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
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Spacing.xxl * 1.5,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  backButton: {
    marginRight: Spacing.md,
  },
  headerTitle: {
    fontSize: FontSize.xl,
    color: Colors.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  textAreaContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: Radius.sm,
    padding: Spacing.md,
    height: 150, // Lo achiqué un poquito para que entre la ubicación sin empujar todo
    marginBottom: Spacing.xl,
  },
  textArea: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.text,
  },
  charCounter: {
    position: 'absolute',
    bottom: Spacing.sm,
    right: Spacing.sm,
    fontSize: FontSize.sm,
    color: 'rgba(0,0,0,0.5)',
  },
  dropdownLabel: {
    fontSize: FontSize.md,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.sm,
    marginBottom: Spacing.xl, // Separación agregada
  },
  dropdownText: {
    fontSize: FontSize.md,
    color: Colors.text,
  },
  dropdownPlaceholder: {
    color: 'rgba(0,0,0,0.6)',
  },

  // -- Estilos para el nuevo botón de ubicación --
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.sm,
    marginBottom: Spacing.xl,
  },
  locationText: {
    fontSize: FontSize.md,
    color: Colors.text,
    marginLeft: Spacing.sm, // Separa el texto del ícono de GPS
  },

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
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: Colors.surface,
    fontSize: FontSize.md,
    fontWeight: 'bold',
  },
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
  modalOptionText: {
    fontSize: FontSize.md,
    color: Colors.text,
  },
});
