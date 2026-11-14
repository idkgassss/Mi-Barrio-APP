// app/(auth)/login.tsx
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Colors, Spacing, FontSize, Radius } from '@/constants/theme';
import { authService } from '../../services/authService';

export default function LoginScreen() {
  // Estados del formulario
  const [isLogin, setIsLogin] = useState(true); // true = Login, false = Registro
  const [isLoading, setIsLoading] = useState(false);

  // Datos que escribe el usuario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState(''); // Solo se usa al registrarse

  // Función para Correo/Contraseña
  const handleEmailSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completá todos los campos.');
      return;
    }

    setIsLoading(true);
    try {
      if (isLogin) {
        // Modo Iniciar Sesión
        await authService.loginWithEmail(email, password);
      } else {
        // Modo Registrarse
        if (!nombre) {
          Alert.alert('Error', 'Por favor ingresá tu nombre.');
          setIsLoading(false);
          return;
        }
        await authService.registerWithEmail(email, password, nombre);
      }
      // Si salió bien, el _layout.tsx lo redirige solo.
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un problema. Verificá tus datos.');
    } finally {
      setIsLoading(false);
    }
  };

  // Función para Google
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await authService.signInWithGoogle();
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', 'No se pudo iniciar sesión con Google.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/fondo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.cardWrapper}>
          <View style={styles.card}>
            {/* Pestañas (Login / Registro) */}
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[styles.toggleButton, isLogin && styles.toggleButtonActive]}
                onPress={() => setIsLogin(true)}
              >
                <Text style={[styles.toggleText, isLogin && styles.toggleTextActive]}>
                  Ingresar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, !isLogin && styles.toggleButtonActive]}
                onPress={() => setIsLogin(false)}
              >
                <Text style={[styles.toggleText, !isLogin && styles.toggleTextActive]}>
                  Registrarme
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.welcomeText}>
              {isLogin ? '¡Hola de nuevo!' : 'Crear una cuenta'}
            </Text>

            {/* Formulario Clásico */}
            {!isLogin && (
              <TextInput
                style={styles.input}
                placeholder="Tu Nombre"
                placeholderTextColor={Colors.text}
                value={nombre}
                onChangeText={setNombre}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor={Colors.text}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor={Colors.text}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleEmailSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.surface} />
              ) : (
                <Text style={styles.actionButtonText}>{isLogin ? 'Ingresar' : 'Registrarme'}</Text>
              )}
            </TouchableOpacity>

            {/* Separador */}
            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>o</Text>
              <View style={styles.separatorLine} />
            </View>

            {/* Botón de Google */}
            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleLogin}
              disabled={isLoading}
            >
              <Text style={styles.googleButtonText}>Continuar con Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(28, 56, 111, 0.7)',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  logoContainer: { flex: 0.6, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 250, height: 90 },
  cardWrapper: { flex: 1.4, justifyContent: 'flex-start' },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    width: '100%',
    borderWidth: 2,
    borderColor: Colors.primary,
  },

  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.text,
    marginBottom: Spacing.xl,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    alignItems: 'center',
  },
  toggleButtonActive: { backgroundColor: Colors.primary },
  toggleText: { color: Colors.text, fontSize: FontSize.md },
  toggleTextActive: { color: Colors.surface, fontWeight: 'bold' },

  welcomeText: {
    fontSize: FontSize.lg,
    color: Colors.text,
    marginBottom: Spacing.lg,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.text,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.lg,
    fontSize: FontSize.md,
    color: Colors.text,
  },

  actionButton: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.text,
    marginBottom: Spacing.md,
  },
  actionButtonText: { color: Colors.surface, fontSize: FontSize.lg, fontWeight: 'bold' },

  separatorContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: Spacing.sm },
  separatorLine: { flex: 1, height: 1, backgroundColor: Colors.text, opacity: 0.3 },
  separatorText: { marginHorizontal: Spacing.md, color: Colors.text, opacity: 0.7 },

  googleButton: {
    backgroundColor: '#fff',
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: Spacing.sm,
  },
  googleButtonText: { color: '#333', fontSize: FontSize.md, fontWeight: 'bold' },
});
