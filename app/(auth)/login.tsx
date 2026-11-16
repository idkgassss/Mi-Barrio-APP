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
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, Radius } from '@/constants/theme';
import { authService } from '../../services/authService';

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true); 
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nombre, setNombre] = useState(''); 

  // NUEVA FUNCIÓN: Limpia todos los campos al cambiar de Log In a Sign Up
  const cambiarModo = (modoLogin: boolean) => {
    setIsLogin(modoLogin);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setNombre('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleEmailSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completá todos los campos.');
      return;
    }

    setIsLoading(true);
    try {
      if (isLogin) {
        await authService.loginWithEmail(email, password);
      } else {
        if (!nombre) {
          Alert.alert('Error', 'Por favor ingresá tu nombre.');
          setIsLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          Alert.alert('Error', 'Las contraseñas no coinciden.');
          setIsLoading(false);
          return;
        }
        await authService.registerWithEmail(email, password, nombre);
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un problema. Verificá tus datos.');
    } finally {
      setIsLoading(false);
    }
  };

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
            
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[styles.toggleButton, isLogin && styles.toggleButtonActive]}
                // CORRECCIÓN: Usamos la nueva función para limpiar campos
                onPress={() => cambiarModo(true)} 
              >
                <Text style={[styles.toggleText, isLogin && styles.toggleTextActive]}>
                  Log In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, !isLogin && styles.toggleButtonActive]}
                // CORRECCIÓN: Usamos la nueva función para limpiar campos
                onPress={() => cambiarModo(false)}
              >
                <Text style={[styles.toggleText, !isLogin && styles.toggleTextActive]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.welcomeText}>
              Bienvenido a MI Barrio
            </Text>

            <View style={styles.formContainer}>
              {!isLogin && (
                <TextInput
                  style={styles.input}
                  placeholder="Name"
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
              
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.inputPassword}
                  placeholder="Password"
                  placeholderTextColor={Colors.text}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons 
                    name={showPassword ? "eye-outline" : "eye-off-outline"} 
                    size={20} 
                    color={Colors.text} 
                  />
                </TouchableOpacity>
              </View>

              {!isLogin && (
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.inputPassword}
                    placeholder="Password confirmation"
                    placeholderTextColor={Colors.text}
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Ionicons 
                      name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                      size={20} 
                      color={Colors.text} 
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleEmailSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.surface} />
              ) : (
                <Text style={styles.actionButtonText}>
                  {isLogin ? 'Log In' : 'Sign Up'}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin} disabled={isLoading}>
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
    justifyContent: 'center',
  },
  
  logoContainer: { flex: 0.8, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 250, height: 90 },
  
  cardWrapper: { flex: 2, alignItems: 'center' },
  
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    width: '100%',
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
  },

  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.text,
    marginBottom: Spacing.xl,
    width: '100%',
    overflow: 'hidden',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  toggleButtonActive: { 
    backgroundColor: Colors.primary,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.text,
  },
  toggleText: { color: Colors.text, fontSize: FontSize.md },
  toggleTextActive: { color: Colors.surface, fontWeight: 'bold' },

  welcomeText: {
    fontSize: FontSize.lg,
    color: Colors.text,
    marginBottom: Spacing.lg,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  formContainer: {
    width: '100%',
    marginBottom: Spacing.lg,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.text,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.lg,
    fontSize: FontSize.md,
    color: Colors.text,
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.text,
    marginBottom: Spacing.lg,
  },
  inputPassword: {
    flex: 1,
    paddingVertical: Spacing.sm,
    fontSize: FontSize.md,
    color: Colors.text,
  },

  actionButton: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.text,
    marginBottom: Spacing.md,
  },
  actionButtonText: { 
    color: Colors.surface, 
    fontSize: FontSize.lg,
    fontWeight: 'bold',
  },

  googleButton: {
    backgroundColor: '#fff',
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: Spacing.sm,
  },
  googleButtonText: { 
    color: '#333', 
    fontSize: FontSize.md,
    fontWeight: 'bold' 
  },
});