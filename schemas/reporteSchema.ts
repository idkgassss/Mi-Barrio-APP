// schemas/reporteSchema.ts
import { z } from 'zod';

export const reporteSchema = z.object({
  titulo: z.string().min(3, 'El título debe tener al menos 3 caracteres').max(100),
  descripcion: z.string().min(5, 'La descripción debe tener al menos 5 caracteres'),
  categoria: z.string().min(1, 'Seleccioná una categoría'),
  imagen: z.string().optional().or(z.literal('')),
  estado: z.string().default('Pendiente'),
  userId: z.string().min(1, 'El usuario es obligatorio'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type ReporteForm = z.infer<typeof reporteSchema>;