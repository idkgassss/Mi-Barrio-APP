import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebase'; 

export default function MapaScreen() {
  const [reportes, setReportes] = useState<any[]>([]);

  // Traemos TODOS los reportes de Firebase en tiempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'reportes'), (snapshot) => {
      const reportesMapeados = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReportes(reportesMapeados);
    });
    
    return () => unsubscribe();
  }, []);

  // Generamos los pines con colores dinámicos y la tarjeta de información
  const pinesGenerados = reportes.map(rep => {
    // 1. Evitamos reportes que no tengan coordenadas
    if (!rep.ubicacion || !rep.ubicacion.latitude || !rep.ubicacion.longitude) return '';
    
    // 2. Definimos el color según la palabra exacta que usa tu panel de admin
    const estadoStr = (rep.estado || 'pendiente').toLowerCase();
    let iconVar = 'iconPendiente'; // Rojo por defecto
    
    if (estadoStr === 'solucionado' || estadoStr === 'solicitado') {
      iconVar = 'iconSolucionado'; // Verde
    } else if (estadoStr === 'en proceso' || estadoStr === 'proceso') {
      iconVar = 'iconProceso'; // Naranja
    }

    // 3. Preparamos los datos del cartelito (Popup)
    const titulo = rep.titulo || 'Reporte vecinal';
    const tipo = rep.tipo || rep.categoria || 'Incidente'; // Tipo de reporte (Ej: Bache, Luminaria)
    const direccion = rep.ubicacionTexto || (typeof rep.ubicacion === 'string' ? rep.ubicacion : 'Ubicación en el mapa');
    const estadoFormat = rep.estado || 'Pendiente';
    
    // 4. Inyectamos el pin con HTML y CSS para que se vea prolijo
    return `L.marker([${rep.ubicacion.latitude}, ${rep.ubicacion.longitude}], {icon: ${iconVar}})
             .addTo(map)
             .bindPopup('<div style="font-family: Arial, sans-serif; text-align: center; min-width: 160px;"><b>${titulo}</b><br><span style="color: #1877F2; font-size: 13px; font-weight: bold;">${tipo}</span><br><span style="color: #666; font-size: 12px;">${direccion}</span><br><br><span style="background: #E5E7EB; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; color: #333;">Estado: ${estadoFormat}</span></div>');`;
  }).join('\n');

  const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
            body { padding: 0; margin: 0; }
            #map { width: 100%; height: 100vh; }
            .leaflet-popup-content { margin: 15px; }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script>
            // El mapa inicia centrado en Pilar / Derqui
            var map = L.map('map').setView([-34.4714, -58.8252], 14);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
            }).addTo(map);

            // Creamos los 3 marcadores de colores
            var iconPendiente = L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
            });

            var iconProceso = L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
            });

            var iconSolucionado = L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
            });

            // Se inyectan los pines con sus datos reales
            ${pinesGenerados}
        </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mapa de reportes</Text>
      </View>
      <View style={styles.mapContainer}>
        <WebView 
          source={{ html: mapHtml }} 
          style={{ flex: 1 }}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { paddingTop: 50, paddingBottom: 15, alignItems: 'center', backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerTitle: { fontSize: 20, fontWeight: '300', color: '#000' },
  mapContainer: { flex: 1, width: '100%' }
});