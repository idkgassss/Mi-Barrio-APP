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

## Continuara...
