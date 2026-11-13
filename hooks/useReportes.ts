// hooks/useReportes.ts
import { useState, useEffect, useCallback } from 'react';
import Toast from 'react-native-toast-message';
import { reportesService, Reporte } from '../services/reportesService';

export const useReportes = () => {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Función envuelta en useCallback para que no se recree en cada render
  const cargarReportes = useCallback(async () => {
    try {
      const data = await reportesService.obtenerTodos();
      setReportes(data);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error al cargar',
        text2: error.message,
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Carga inicial automática al montar la pantalla
  useEffect(() => {
    cargarReportes();
  }, [cargarReportes]);

  // Función específica para el gesto de "Pull to refresh" de la lista
  const onRefresh = () => {
    setIsRefreshing(true);
    cargarReportes();
  };

  return {
    reportes,
    isLoading,
    isRefreshing,
    onRefresh,
    cargarReportes, // La exportamos por si necesitamos forzar una recarga al subir un reporte nuevo
  };
};
