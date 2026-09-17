// hooks/useReportes.ts
import { useState, useEffect } from 'react';
import { Reporte } from '@/types';
import { REPORTES_MOCK } from '@/data/mockData';

// Definimos qué va a devolver este hook a nuestra pantalla
interface UseReportesResult {
  reportes: Reporte[];
  cargando: boolean;
  error: string | null;
  refrescar: () => void;
}

export function useReportes(): UseReportesResult {
  // Los 3 estados fundamentales de nuestra lista
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = () => {
    setCargando(true);
    setError(null);

    // Simulamos el retraso de una conexión a internet (800ms)
    // En la Clase 5, esto se reemplaza por la llamada real a Firebase
    setTimeout(() => {
      setReportes(REPORTES_MOCK);
      setCargando(false);
    }, 800);
  };

  // useEffect hace que la función cargar() se ejecute sola la primera vez que se abre la app
  useEffect(() => {
    cargar();
  }, []);

  return { reportes, cargando, error, refrescar: cargar };
}
