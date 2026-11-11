import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, Radius } from '@/constants/theme';

export default function TutorialScreen() {
  const router = useRouter();

  // Estado local tipado para controlar la navegación interna del tutorial
  const [paso, setPaso] = useState<number>(1);

  const cerrarTutorial = () => {
    router.back();
  };

  const siguientePaso = () => {
    if (paso < 3) {
      setPaso(paso + 1);
    }
  };

  const pasoAnterior = () => {
    if (paso > 1) {
      setPaso(paso - 1);
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.modalCard}>
        {/* Botón Cerrar (X) */}
        <TouchableOpacity onPress={cerrarTutorial} style={styles.closeButton}>
          <Ionicons name="close" size={28} color={Colors.surface} />
        </TouchableOpacity>

        {/* Logo de Mi Barrio */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>
            <Text style={{ color: Colors.danger || '#EF4444' }}>mi </Text>
            <Text style={{ color: Colors.secondary || '#0D9488' }}>barrio</Text>
          </Text>
        </View>

        {/* --- CONTENIDO PASO 1 --- */}
        {paso === 1 && (
          <>
            <Text style={styles.titulo}>¡Bienvenidos!</Text>
            <Text style={styles.parrafo}>
              Reportá los problemas de tu barrio en segundos: Baches, Luminarias rotas, Basurales,
              Inundaciones, Árboles caídos, Semáforo roto o cualquier otra cosa que necesite una
              mano.
            </Text>
            <Text style={styles.parrafo}>
              Sacá una foto, contanos qué pasa y nosotros nos encargamos de ubicarlo. Después vas a
              poder seguir el estado de tu reclamo, desde que lo envías hasta que se soluciona.
            </Text>
            <Text style={styles.slogan}>Tu barrio, más cerca tuyo.</Text>
          </>
        )}

        {/* --- CONTENIDO PASO 2 --- */}
        {paso === 2 && (
          <>
            <Text style={styles.titulo}>Cómo generar un reporte</Text>
            <Text style={styles.subtitulo}>Sacá una foto y contanos qué pasa</Text>
            <Text style={styles.parrafo}>
              Generar un reclamo es sumamente sencillo. Solo tenés que sacar una foto del problema
              desde tu celular y escribir una breve descripción de lo que está sucediendo.
            </Text>
            <Text style={styles.parrafo}>
              De la localización no te preocupes: nosotros nos encargamos de ubicar el incidente
              automáticamente en el mapa utilizando la geolocalización de tu dispositivo o podés
              marcar el punto exacto manualmente.{'\n'}
              Rápido, simple y sin trámites complicados.
            </Text>
          </>
        )}

        {/* --- CONTENIDO PASO 3 --- */}
        {paso === 3 && (
          <>
            <Text style={styles.titulo}>Seguimiento y Resolución</Text>
            <Text style={styles.subtitulo}>Seguí tu reclamo en tiempo real</Text>
            <Text style={styles.parrafo}>
              Tu participación no termina cuando enviás el reporte. Desde la aplicación vas a poder
              hacer un seguimiento detallado del estado de tu reclamo en todo momento, desde el
              instante en que es enviado y recibido hasta el momento final en que se efectúa la
              solución.
            </Text>
            <Text style={styles.parrafo}>
              Recibirás novedades directas sobre cada avance para que siempre sepas qué se está
              haciendo en tu zona.{'\n'}
              ¡Empezá a transformar tu barrio hoy mismo!
            </Text>
          </>
        )}

        {/* --- CONTROLES INFERIORES --- */}
        <View style={styles.footer}>
          {/* Control Izquierdo: Aparece a partir del paso 2 */}
          <View style={styles.sideControlLeft}>
            {paso > 1 && (
              <TouchableOpacity onPress={pasoAnterior}>
                <Text style={styles.controlText}>Atrás</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Indicadores Dinámicos */}
          <View style={styles.dotsContainer}>
            <View style={[styles.dot, paso === 1 && styles.dotActive]} />
            <View style={[styles.dot, paso === 2 && styles.dotActive]} />
            <View style={[styles.dot, paso === 3 && styles.dotActive]} />
          </View>

          {/* Control Derecho: Desaparece en el paso 3 para coincidir con el diseño */}
          <View style={styles.sideControlRight}>
            {paso < 3 && (
              <TouchableOpacity onPress={siguientePaso}>
                <Text style={styles.controlText}>siguiente</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  modalCard: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: Radius.md,
    elevation: 4,
  },
  closeButton: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    zIndex: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  logoText: {
    fontSize: FontSize.xxxl,
    fontWeight: 'bold',
  },
  titulo: {
    color: Colors.surface,
    fontSize: FontSize.xl,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subtitulo: {
    color: Colors.surface,
    fontSize: FontSize.md,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  parrafo: {
    color: Colors.surface,
    fontSize: FontSize.md,
    textAlign: 'center',
    marginBottom: Spacing.md,
    lineHeight: 22,
    fontWeight: '500',
  },
  slogan: {
    color: Colors.surface,
    fontSize: FontSize.md,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
  },
  sideControlLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  sideControlRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  controlText: {
    color: Colors.surface,
    fontSize: FontSize.lg,
    fontWeight: 'bold',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
    flex: 1,
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  dotActive: {
    backgroundColor: Colors.surface,
  },
});
