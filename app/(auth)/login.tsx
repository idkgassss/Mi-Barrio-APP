import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  // Mantenemos la función que destruye el historial y entra a la app (RF1)
  const handleLogin = () => {
    router.replace('/(tabs)');
  };

  return (
    <ImageBackground
      source={require('../../assets/fondo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Capa oscura azulada para que resalte el logo y los textos */}
      <View style={styles.overlay}>
        {/* Contenedor centralizado para el Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Contenedor inferior para los botones */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
            <Text style={styles.btnText}>Log In</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.textNormal}>No tenes cuenta? </Text>
            {/* Por ahora no hace nada, luego lo conectaremos al Registro */}
            <TouchableOpacity>
              <Text style={styles.textLink}>Registrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(28, 56, 111, 0.7)', // Tono azul oscuro semi-transparente
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 280, // Ajustado para que el logo se vea amplio y legible
    height: 120,
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 30,
  },
  btnLogin: {
    backgroundColor: '#1C64F2', // Azul brillante del botón
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30, // Bordes en forma de píldora
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#000', // Borde oscuro sutil
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textNormal: {
    color: '#E5E7EB',
    fontSize: 15,
  },
  textLink: {
    color: '#3B82F6',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});
