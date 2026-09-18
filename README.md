# Mi Barrio — MVP (Expo Router)

Base funcional del proyecto desarrollada para la materia _Aplicaciones Móviles_ de la Tecnicatura Superior en Desarrollo de Software. El proyecto implementa un enrutamiento moderno basado en archivos utilizando Expo Router.

## Cómo correrlo

```bash
npm install
npx expo start
```

Escaneá el QR con Expo Go. No hace falta configurar Firebase para probar la app: los reportes se
guardan localmente en el dispositivo (AsyncStorage) y arrancan con 3 reportes de ejemplo.

Permisos que va a pedir la primera vez: **cámara** (paso 2 del wizard) y **ubicación** (paso 1 del
wizard, para geolocalizar el reporte).

## Estructura del proyecto

```text
mi-barrio-app/
├── app/
│   ├── (auth)/         # Grupo de rutas de autenticación
│   │   └── login.tsx   # UI de Login inmersivo
│   ├── (tabs)/         # Navegación principal persistente
│   │   ├── _layout.tsx # Configuración de Tab Navigator
│   │   ├── index.tsx   # Dashboard de reportes (FlatList)
│   │   ├── mapa.tsx    # Placeholder del mapa interactivo
│   │   └── perfil.tsx  # Opciones del usuario
│   └── detalle/        # Rutas dinámicas
│       └── [id].tsx    # Detalle de cada reporte específico
├── components/         # Componentes UI reutilizables
├── constants/          # Tokens de diseño (Colores, tipografías)
├── data/               # Origen de datos local (mockData)
└── assets/             # Recursos estáticos e imágenes
```

## Qué incluye este MVP

- Login / Sign Up con selector segmentado (sesión "fake" persistida en el dispositivo).
- Dashboard con contador de Pendientes / En proceso / Solucionados.
- Wizard de 3 pasos: categoría → foto (opcional) → descripción + antigüedad → envío.
  - Geolocalización automática al iniciar el wizard; si falla, pide dirección manual antes de
    habilitar "Enviar reporte" (RG-03).
- "Mis reportes" (lista), "Detalles del reporte" con línea de tiempo de seguimiento.
- Mapa de reportes con pines coloreados por estado (react-native-maps), sin datos del emisor.
- Perfil con menú de opciones y cerrar sesión.

Lo que quedó **fuera** a propósito, tal como lo definieron ustedes en el MoSCoW (Won't): edición de
perfil, notificaciones push, reapertura/cancelación de reportes, moderación por IA.

## Por qué no arranca con Firebase ya conectado

El profe confirmó que la base de datos no tiene que ser Firebase sí o sí. Para tener un MVP
**estable desde el primer `npx expo start`**, sin depender de que alguien configure un proyecto de
Firebase antes de poder probar la app, el estado se maneja con Zustand + AsyncStorage
(`stores/useUsuarioStore.ts` y `stores/useReportesStore.ts`).

Firebase sigue siendo la opción recomendada (así lo dice su propia documentación, sección 3) y ya
está dejado listo para conectar sin tocar las pantallas:

- `services/firebase.ts`: inicialización, calcada de Clase 5.
- `services/firestoreReportes.ts`: capa de servicios con `getAll`, `getById`, `crear`,
  `avanzarEstado`, lista para usar con `onSnapshot` — trae los pasos de migración comentados
  arriba del archivo.
- Cada punto del código donde algo se reemplaza por Firebase tiene un comentario `// TODO Firebase`.

## Próximos pasos técnicos sugeridos

1. Conectar Firebase Auth real (reemplaza el login "fake" de `useUsuarioStore.ts`).
2. Conectar Firestore siguiendo `services/firestoreReportes.ts` + Cloud Storage para las fotos.
3. Pantalla de selección manual de ubicación en un mapa (hoy el respaldo es un campo de texto).
4. Mover el avance de estado (`avanzarEstado`) a un panel de "operador municipal" o a la consola de
   Firebase, ya que en el MVP actual no hay un rol que lo dispare desde la app del vecino.
