// app/(auth)/login.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { authService } from '../../services/authService';
import { useUsuarioStore } from '../../store/useUsuarioStore';

export default function LoginScreen() {
  const login = useUsuarioStore((s: any) => s.login);

  const handleGoogleLogin = async () => {
    try {
      const firebaseUser = await authService.signInWithGoogle();
      const token = await firebaseUser.getIdToken();

      await login(
        {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          nombre: firebaseUser.displayName || 'Vecino',
          avatar: firebaseUser.photoURL || '',
        },
        token
      );

      Toast.show({ type: 'success', text1: '¡Bienvenido a Mi Barrio!' });
    } catch (error: any) {
      Toast.show({ type: 'error', text1: 'Error al iniciar sesión', text2: error.message });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoMi}>mi</Text>
          <Text style={styles.logoBarrio}>barrio</Text>
        </View>
        <Text style={styles.subtitle}>Tu voz hace la diferencia.</Text>

        <TouchableOpacity
          style={styles.btnGoogle}
          onPress={handleGoogleLogin}
          accessibilityRole="button"
          accessibilityLabel="Iniciar sesión con cuenta de Google"
        >
          <Ionicons name="logo-google" size={24} color="#DB4437" style={styles.icon} />
          <Text style={styles.btnText}>Continuar con Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  logoMi: {
    color: '#FF0000',
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: -2,
  },
  logoBarrio: {
    color: '#0056b3',
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: -2,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 50,
  },
  btnGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    width: '100%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: 12,
  },
  btnText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
