// services/reportesService.ts
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';

export interface Reporte {
  id?: string;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  fotoUrl?: string;
  usuarioId: string;
  fechaCreacion?: any;
}

export const reportesService = {
  // 1. Traer todos los reportes de los vecinos (ordenados del más nuevo al más viejo)
  obtenerTodos: async () => {
    try {
      const q = query(collection(db, 'reportes'), orderBy('fechaCreacion', 'desc'));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Reporte[];
    } catch (error: any) {
      throw new Error(`Error al cargar los reportes: ${error.message}`);
    }
  },

  // 2. Crear un reporte nuevo (foto + datos)
  crear: async (datos: Partial<Reporte>, imageUri?: string) => {
    try {
      let fotoUrl = '';

      // Si el usuario sacó una foto, la subimos a Firebase Storage primero
      if (imageUri) {
        // Convertimos la ruta local del celular en un archivo binario (Blob)
        const response = await fetch(imageUri);
        const blob = await response.blob();

        // Creamos una referencia única con la fecha actual
        const nombreArchivo = `reportes/foto_${Date.now()}.jpg`;
        const storageRef = ref(storage, nombreArchivo);

        // Subimos el archivo y obtenemos el link público
        await uploadBytes(storageRef, blob);
        fotoUrl = await getDownloadURL(storageRef);
      }

      // Preparamos el documento para Firestore
      const nuevoReporte = {
        titulo: datos.titulo || 'Sin título',
        descripcion: datos.descripcion || '',
        ubicacion: datos.ubicacion || 'Ubicación no especificada',
        usuarioId: datos.usuarioId,
        fotoUrl, // Acá va el link de la imagen que acabamos de subir (o vacío si no subió nada)
        fechaCreacion: Timestamp.now(),
      };

      // Lo guardamos en la colección "reportes"
      const docRef = await addDoc(collection(db, 'reportes'), nuevoReporte);
      return { id: docRef.id, ...nuevoReporte };
    } catch (error: any) {
      throw new Error(`Error al publicar el reporte: ${error.message}`);
    }
  },

  // 3. Eliminar un reporte
  eliminar: async (id: string) => {
    try {
      await deleteDoc(doc(db, 'reportes', id));
    } catch (error: any) {
      throw new Error(`Error al eliminar: ${error.message}`);
    }
  },
};
