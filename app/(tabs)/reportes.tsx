import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const REPORTES_MOCK = [
  { id: '1', titulo: 'Bache en la avenida', estado: 'Pendiente', fecha: '18/09/2026' },
  { id: '2', titulo: 'Luminaria rota', estado: 'En proceso', fecha: '15/09/2026' },
  { id: '3', titulo: 'Basural a cielo abierto', estado: 'Solucionado', fecha: '10/09/2026' },
  { id: '4', titulo: 'Semáforo sin luz', estado: 'Pendiente', fecha: '05/09/2026' },
];

export default function ReportesScreen() {
  const router = useRouter();

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        router.push({
          pathname: '/detalle/[id]',
          params: { id: item.id, titulo: item.titulo, estado: item.estado, fecha: item.fecha },
        });
      }}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitulo}>{item.titulo}</Text>
        <Text style={styles.cardFecha}>{item.fecha}</Text>
      </View>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>{item.estado}</Text>
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardTitulo: { fontSize: 16, fontWeight: 'bold', flex: 1 },
  cardFecha: { fontSize: 12, color: '#666', marginLeft: 10 },
  badge: {
    backgroundColor: '#000',
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  badgeText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
});
