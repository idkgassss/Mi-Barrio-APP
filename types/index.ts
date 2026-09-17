// types/index.ts

// Interfaz para el vecino que usa la app
export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  avatar?: string; // El "?" indica que la foto de perfil es opcional
}

// Interfaz para el problema reportado en la calle
export interface Reporte {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  categoria: string; // Ej: 'bache', 'iluminacion', 'basura'
  solucionado: boolean; // Usaremos esto para cambiar el color si ya se arregló
}