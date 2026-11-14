import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, Radius } from '@/constants/theme';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';
import MenuLateral from '../../components/MenuLateral';

export default function HomeScreen() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const [contadores, setContadores] = useState({
    pendientes: 0,
    enProceso: 0,
    solicitados: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/tutorial');
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const usuarioActual = auth.currentUser;
    if (!usuarioActual) return;

    const q = query(collection(db, 'reportes'), where('usuarioId', '==', usuarioActual.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let pendientes = 0;
      let enProceso = 0;
      let solicitados = 0;

      snapshot.docs.forEach((doc) => {
        const estado = (doc.data().estado || 'pendiente').toLowerCase();
        if (estado === 'solicitado' || estado === 'solucionado') {
          solicitados++;
        } else if (estado === 'en proceso' || estado === 'proceso') {
          enProceso++;
        } else {
          pendientes++;
        }
      });

      setContadores({ pendientes, enProceso, solicitados });
    });

    return () => unsubscribe();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Tabs.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
        >
          <Ionicons name="menu" size={28} color={Colors.text} />
        </TouchableOpacity>

        <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />

        <View style={{ width: 28 }} />
      </View>

      <Text style={styles.welcomeTitle}>Bienvenido a Mi Barrio</Text>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Mis Reportes</Text>
        <TouchableOpacity onPress={() => router.push('/reportes')}>
          <Text style={styles.verTodosLink}>Ver todos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.rowLeft}>
            <View style={[styles.dot, { backgroundColor: Colors.danger || '#EF4444' }]} />
            <Text style={styles.rowText}>Pendientes</Text>
          </View>
          <Text style={styles.rowCount}>{contadores.pendientes}</Text>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.rowLeft}>
            <View style={[styles.dot, { backgroundColor: Colors.warning || '#F97316' }]} />
            <Text style={styles.rowText}>En proceso</Text>
          </View>
          <Text style={styles.rowCount}>{contadores.enProceso}</Text>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.rowLeft}>
            <View style={[styles.dot, { backgroundColor: Colors.success || '#22C55E' }]} />
            <Text style={styles.rowText}>Solicitados</Text>
          </View>
          <Text style={styles.rowCount}>{contadores.solicitados}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => router.push('/reportar/paso1')}
        >
          <Text style={styles.reportButtonText}>Reportar</Text>
        </TouchableOpacity>
      </View>

      <MenuLateral visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: {
    paddingTop: Spacing.xxl * 1.5,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  logo: { width: 140, height: 40 },
  welcomeTitle: {
    fontSize: FontSize.xl,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: Spacing.md,
  },
  sectionTitle: { fontSize: FontSize.md, color: Colors.text },
  verTodosLink: { fontSize: FontSize.sm, color: Colors.primary, textDecorationLine: 'underline' },
  summaryCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xxl,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: Spacing.sm,
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 12, height: 12, borderRadius: 6, marginRight: Spacing.sm },
  rowText: { fontSize: FontSize.md, color: Colors.text },
  rowCount: { fontSize: 16, color: Colors.text, fontWeight: 'bold' },
  buttonContainer: { alignItems: 'center', marginTop: Spacing.lg },
  reportButton: {
    backgroundColor: Colors.primary,
    width: '100%',
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    alignItems: 'center',
  },
  reportButtonText: { color: Colors.surface, fontSize: FontSize.lg, fontWeight: 'bold' },
});
