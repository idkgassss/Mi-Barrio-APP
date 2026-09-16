# Mi-Barrio-APP
# Mi Barrio — MVP funcional

App móvil basada en la Documentación de Diseño y Arquitectura del proyecto "Mi Barrio"
(caso de estudio EcoVoz Urbana). Implementa RF1–RF5 y el diseño defensivo offline-first
descrito en el documento, usando **Expo Router** y persistencia local con **AsyncStorage**
(no requiere backend para este MVP).

## Requisitos previos
- Node.js 18 o superior instalado en tu computadora.
- La app **Expo Go** instalada en tu celular (App Store / Play Store).
- Tu celular y tu computadora conectados a la **misma red Wi-Fi**.

## Pasos para correrlo

1. Descomprimí este proyecto y abrí una terminal en la carpeta `mi-barrio-app`.
2. Instalá las dependencias:
   ```bash
   npm install
   ```
3.o Iniciá el servidor de desarrllo:
   ```bash
   npx expo start
   ```
4. Se va a abrir una terminal con un código QR:
   - **Android:** abrí la app Expo Go y escaneá el QR desde ahí.
   - **iPhone:** abrí la app de Cámara nativa, apuntá al QR y tocá el aviso para abrir en Expo Go.
5. La app va a compilar en tu celular y te va a mostrar la pantalla de bienvenida ("mi barrio").

> Si el QR no conecta, probá iniciar con `npx expo start --tunnel` (más lento, pero funciona
> aunque el celular esté en datos móviles o una red distinta a la de tu PC).

## Cómo probarlo
1. Como es la primera vez, no hay usuarios cargados: tocá **"Registrate"** y creá una cuenta
   (nombre, email, password). Queda guardada localmente en el celular.
2. Vas a caer en el **Dashboard**, con el resumen de reportes por estado y el botón **Reportar**.
3. Tocá **Reportar** para abrir el Wizard de 3 pasos (RF2):
   - Paso 1: elegí una categoría.
   - Paso 2: sacá una foto con la cámara o elegí una de la galería (podés pasar sin foto).
   - Paso 3: escribí una descripción y elegí desde cuándo existe el problema, y enviá.
   - Al enviar, la app pide permiso de ubicación (RF3) para geolocalizar el reporte.
4. En **Reportes** vas a ver la FlatList de "Mis reportes"; al tocar una tarjeta se abre
   **Detalles del reporte**, con la línea de tiempo de seguimiento (RF5).
5. En **Mapa** vas a ver los pines de todos los reportes cargados en el dispositivo,
   coloreados por estado (rojo/amarillo/verde) y **sin ningún dato del usuario que reportó**
   (anonimizado, según RF5 / RNF de Privacidad).
6. En **Perfil** están tus datos y la opción de cerrar sesión.

## Diseño defensivo (offline-first)
Como pide el Punto 4 del documento, si cerrás la app en medio de la carga de un reporte
(por ejemplo, sin conexión), el progreso del Wizard (categoría, foto, descripción) queda
guardado localmente y, al volver a abrir "Reportar", la app retoma en el paso siguiente al
último completado, sin pedir que vuelvas a cargar todo desde cero.

## Estructura del proyecto
Sigue el enrutamiento basado en archivos de Expo Router descripto en el Punto 7 del documento:

```
app/
  _layout.tsx          # Providers globales y Stack raíz
  index.tsx             # Redirección inicial según sesión
  (auth)/
    login.tsx           # Log In / Sign Up
  (tabs)/
    _layout.tsx          # Tab Navigator
    index.tsx            # Dashboard (Inicio)
    reportes.tsx          # Mis reportes (FlatList)
    mapa.tsx               # Mapa de reportes
    perfil.tsx              # Perfil
  reporte/
    nuevo.tsx            # Wizard de nuevo reporte
    [id].tsx              # Detalles del reporte (ruta dinámica)
context/
  AuthContext.tsx        # Autenticación mock persistida
  ReportsContext.tsx     # CRUD de reportes + borrador resiliente
components/
  PrimaryButton.tsx, InputField.tsx, StatusBadge.tsx, ReportCard.tsx
constants/
  theme.ts               # Design Tokens (Punto 6)
```

## Notas técnicas / próximos pasos sugeridos
- **Persistencia:** hoy es 100% local (AsyncStorage), lo que ya cumple el flujo offline-first
  del documento. Para producción, conectar `ReportsContext` a un backend (Firebase, REST, etc.)
  reemplazando las funciones internas sin tocar las pantallas.
- **Mapa:** usa `react-native-maps`. Para publicar en producción vas a necesitar una API key
  de Google Maps en `app.json` (en Expo Go funciona sin configuración adicional).
- **Autenticación:** es un mock local pensado para probar el flujo (RF1). Para producción,
  reemplazar por un proveedor real (Firebase Auth, Auth0, backend propio, etc.).
