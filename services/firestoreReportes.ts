// services/firestoreReportes.ts
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { ReporteForm } from '@/schemas/reporteSchema';

const COL = 'reportes';

export const reportesService = {
  create: async (data: ReporteForm) => {
    return await addDoc(collection(db, COL), data);
  },
  update: async (id: string, data: Partial<ReporteForm>) => {
    return await updateDoc(doc(db, COL, id), data);
  },
  delete: async (id: string) => {
    return await deleteDoc(doc(db, COL, id));
  }
};