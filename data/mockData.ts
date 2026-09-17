// data/mockData.ts
import { Reporte } from '@/types';

// Simulamos una base de datos local con 6 reportes vecinales
export const REPORTES_MOCK: Reporte[] = [
  {
    id: '1',
    titulo: 'Bache profundo en la avenida',
    descripcion: 'Hay un pozo enorme que rompe los autos al pasar.',
    imagen: 'https://picsum.photos/seed/bache1/400/300',
    categoria: 'infraestructura',
    solucionado: false,
  },
  {
    id: '2',
    titulo: 'Luminaria rota',
    descripcion: 'La calle está a oscuras desde hace una semana, muy peligroso.',
    imagen: 'https://picsum.photos/seed/luz1/400/300',
    categoria: 'iluminacion',
    solucionado: true, // <- Caso edge: Este problema ya fue resuelto
  },
  {
    id: '3',
    titulo: 'Basural a cielo abierto',
    descripcion: 'Están tirando basura en la esquina de la plaza principal.',
    imagen: 'https://picsum.photos/seed/basura1/400/300',
    categoria: 'limpieza',
    solucionado: false,
  },
  {
    id: '4',
    titulo: 'Semáforo intermitente',
    descripcion: 'El semáforo quedó trabado en amarillo, posible accidente.',
    imagen: 'https://picsum.photos/seed/semaforo1/400/300',
    categoria: 'transito',
    solucionado: false,
  },
  {
    id: '5',
    titulo: 'Caño de agua roto',
    descripcion: 'Pérdida de agua constante en la vereda, inundando la calle.',
    imagen: 'https://picsum.photos/seed/agua1/400/300',
    categoria: 'servicios',
    solucionado: true, // <- Caso edge: resuelto
  },
  {
    id: '6',
    titulo: 'Árbol caído sobre la calle',
    descripcion: 'Las ramas bloquean el paso de los vehículos por completo.',
    imagen: 'https://picsum.photos/seed/arbol1/400/300',
    categoria: 'espacios_verdes',
    solucionado: false,
  }
];