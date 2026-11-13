// store/useReporteDraftStore.ts
import { create } from 'zustand';

interface ReporteDraft {
  titulo: string;
  ubicacion: string;
  imageUri: string | null;
  descripcion: string;
  setDatosPaso1: (titulo: string, ubicacion: string) => void;
  setFoto: (uri: string | null) => void;
  reset: () => void;
}

export const useReporteDraftStore = create<ReporteDraft>((set: any) => ({
  titulo: '',
  ubicacion: '',
  imageUri: null,
  descripcion: '',
  setDatosPaso1: (titulo: string, ubicacion: string) => set({ titulo, ubicacion }),
  setFoto: (imageUri: string | null) => set({ imageUri }),
  reset: () => set({ titulo: '', ubicacion: '', imageUri: null, descripcion: '' }),
}));
