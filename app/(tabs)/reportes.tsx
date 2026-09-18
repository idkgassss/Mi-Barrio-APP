import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
// Importamos tu mockData real (Ajusta la ruta si es con @/)
import { REPORTES_MOCK } from '../../data/mockData';

export default function ReportesScreen() {
  const router = useRouter();

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        // CORRECCIÓN: Solo enviamos el ID por parámetro para no degradar performance
        router.push({
          pathname: '/detalle/[id]',
          params: { id: item.id },
        });
      }}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitulo}>{item.titulo}</Text>
        <Text style={styles.cardCategoria}>{item.categoria}</Text>
      </View>

      <View
        style={[styles.badge, item.solucionado ? styles.badgeSolucionado : styles.badgePendiente]}
      >
        <Text style={styles.badgeText}>{item.solucionado ? 'Solucionado' : 'Pendiente'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={REPORTES_MOCK}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listaPadding}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  listaPadding: { padding: 20 },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  cardTitulo: { fontSize: 16, fontWeight: 'bold', flex: 1 },
  cardCategoria: { fontSize: 12, color: '#666', marginLeft: 10, textTransform: 'capitalize' },
  badge: { alignSelf: 'flex-start', paddingVertical: 5, paddingHorizontal: 10 },
  badgePendiente: { backgroundColor: '#FF3B30' },
  badgeSolucionado: { backgroundColor: '#34C759' },
  badgeText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
});
