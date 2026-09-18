import { View, Text, StyleSheet } from 'react-native';

export default function MapaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>[ MAPA INTERACTIVO MOCK ]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#DDD' },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#555' },
});
