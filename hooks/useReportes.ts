// hooks/useReportes.ts
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { ReporteForm } from '@/schemas/reporteSchema';

// Exportamos el tipo Reporte tipado estrictamente con nuestro schema de Zod + el ID de Firestore
export type Reporte = ReporteForm & { id: string };

export function useReportes() {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Apuntamos a la colección 'reportes' en tu base de datos de Firebase
    const q = query(collection(db, 'reportes'));

    // onSnapshot: La "Killer Feature" de Firebase para sincronización en tiempo real (Clase 5 y 11)
    const unsub = onSnapshot(
      q,
      (snap) => {
        const data = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as Reporte[];
        
        setReportes(data);
        setCargando(false);
      },
      (err) => {
        setError(err.message);
        setCargando(false);
      }
    );

    // Cleanup automático al desmontar el componente
    return () => unsub();
  }, []);

  return { reportes, cargando, error };
}