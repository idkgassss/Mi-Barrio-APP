import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function PerfilScreen() {
  const router = useRouter();

  const handleCerrarSesion = () => {
    // replace nos expulsa al login y borra la memoria de navegación
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
fix/parametros-ruta
      <Text style={styles.titulo}>[ pinta un fuchibol? ]</Text>

      {/* Cabecera con datos del usuario */}
      <View style={styles.header}>
        <View style={styles.avatarCaja}>
          <Text style={styles.avatarTexto}>JD</Text>
        </View>
        <Text style={styles.nombre}>Juan Doe</Text>
        <Text style={styles.email}>juan.doe@vecino.com</Text>
      </View>

      {/* Opciones del perfil */}
      <View style={styles.opcionesCaja}>
        <TouchableOpacity style={styles.btnOpcion}>
          <Text style={styles.textoOpcion}>Mis Reportes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOpcion}>
          <Text style={styles.textoOpcion}>Configuración de la cuenta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOpcion}>
          <Text style={styles.textoOpcion}>Ayuda y Soporte</Text>
        </TouchableOpacity>
      </View>

      {/* Botón destructivo de salir */}
      <TouchableOpacity style={styles.btnSalir} onPress={handleCerrarSesion}>
        <Text style={styles.btnSalirTexto}>CERRAR SESIÓN</Text>
      </TouchableOpacity>
main
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  avatarCaja: {
    width: 100,
    height: 100,
    backgroundColor: '#D3D3D3',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#000',
  },
  avatarTexto: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  nombre: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  email: {
    fontSize: 16,
    color: '#555',
  },
  opcionesCaja: {
    flex: 1,
  },
  btnOpcion: {
    backgroundColor: 'white',
    padding: 18,
    borderWidth: 1,
    borderColor: '#CCC',
    marginBottom: 10,
    borderRadius: 8,
  },
  textoOpcion: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  btnSalir: {
    backgroundColor: '#FF3B30',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 'auto', // Empuja el botón al fondo de la pantalla
    marginBottom: 10,
  },
  btnSalirTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
