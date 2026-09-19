import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
// Importación estricta de variables de diseño
import { Colors, Spacing, FontSize, Radius } from '@/constants/theme';

export default function LoginScreen() {
  const router = useRouter();

  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginFinal = () => {
    router.replace('/(tabs)');
  };

  const abrirTarjeta = (modoLogin: boolean) => {
    setIsLogin(modoLogin);
    setMostrarTarjeta(true);
  };

  return (
    <ImageBackground
      source={require('../../assets/fondo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={[styles.logoContainer, mostrarTarjeta && styles.logoContainerSubido]}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {!mostrarTarjeta ? (
          /* VISTA 1: PANTALLA INICIAL */
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.botonPrincipal} onPress={() => abrirTarjeta(true)}>
              <Text style={styles.botonPrincipalTexto}>Iniciar Sesion</Text>
            </TouchableOpacity>

            <View style={styles.footerInicial}>
              <Text style={styles.textoFooterInicial}>No tenes cuenta? </Text>
              <TouchableOpacity onPress={() => abrirTarjeta(false)}>
                <Text style={styles.linkFooterInicial}>Registrate</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* VISTA 2: TARJETA BLANCA (Ahora envuelta en cardWrapper para centrarla) */
          <View style={styles.cardWrapper}>
            <View style={styles.card}>
              <View style={styles.toggleContainer}>
                <TouchableOpacity
                  style={[styles.toggleButton, isLogin && styles.toggleButtonActive]}
                  onPress={() => setIsLogin(true)}
                >
                  <Text style={[styles.toggleText, isLogin && styles.toggleTextActive]}>
                    Iniciar Sesion
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.toggleButton, !isLogin && styles.toggleButtonActive]}
                  onPress={() => setIsLogin(false)}
                >
                  <Text style={[styles.toggleText, !isLogin && styles.toggleTextActive]}>
                    Registrarse
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.welcomeText}>Bienvenido a MI Barrio</Text>

              <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor={Colors.text}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor={Colors.text}
                secureTextEntry
              />

              <TouchableOpacity style={styles.actionButton} onPress={handleLoginFinal}>
                <Text style={styles.actionButtonText}>
                  {isLogin ? 'Iniciar Sesion' : 'Registrarse'}
                </Text>
              </TouchableOpacity>

              <View style={styles.footerTarjeta}>
                <Text style={styles.textoFooterTarjeta}>
                  {isLogin ? 'No tenes cuenta? ' : 'Ya tenes cuenta? '}
                </Text>
                <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                  <Text style={styles.linkFooterTarjeta}>{isLogin ? 'Registrate' : 'Ingresá'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
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
    backgroundColor: 'rgba(28, 56, 111, 0.7)',
    paddingHorizontal: Spacing.lg,
    // Un margen general en la base para que nada toque el borde del celular jamás
    paddingBottom: Spacing.xxl,
  },

  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainerSubido: {
    flex: 0,
    marginTop: Spacing.xxl * 2, // Lo despega del borde superior de la pantalla
    marginBottom: Spacing.sm,
  },
  logo: {
    width: 250,
    height: 90,
  },

  bottomContainer: {
    width: '100%',
    alignItems: 'center',
  },
  botonPrincipal: {
    backgroundColor: Colors.primary,
    width: '100%',
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#000',
  },
  botonPrincipalTexto: {
    color: Colors.surface,
    fontSize: FontSize.lg,
    fontWeight: 'bold',
  },
  footerInicial: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textoFooterInicial: {
    color: Colors.surface,
    fontSize: FontSize.md,
  },
  linkFooterInicial: {
    color: Colors.primary,
    fontSize: FontSize.md,
    textDecorationLine: 'underline',
  },

  /* --- NUEVO CONTENEDOR PARA CENTRAR LA TARJETA --- */
  cardWrapper: {
    flex: 1,
    justifyContent: 'center', // Alinea la tarjeta verticalmente en el medio
  },
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
  toggleButtonActive: {
    backgroundColor: Colors.primary,
  },
  toggleText: {
    color: Colors.text,
    fontSize: FontSize.md,
  },
  toggleTextActive: {
    color: Colors.surface,
  },
  welcomeText: {
    fontSize: FontSize.lg,
    color: Colors.text,
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
  actionButton: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.text,
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  actionButtonText: {
    color: Colors.surface,
    fontSize: FontSize.lg,
    fontWeight: 'bold',
  },
  footerTarjeta: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textoFooterTarjeta: {
    color: Colors.text,
    fontSize: FontSize.sm,
  },
  linkFooterTarjeta: {
    color: Colors.primary,
    fontSize: FontSize.sm,
    textDecorationLine: 'underline',
  },
});
