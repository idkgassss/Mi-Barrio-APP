import { View, Text, StyleSheet } from 'react-native';

export default function ReportesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Reportes</Text>
      {/* Aquí luego armaremos la lista de tarjetas con <FlatList> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 20, fontWeight: 'bold' },
});
