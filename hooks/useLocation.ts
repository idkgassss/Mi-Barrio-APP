// hooks/useLocation.ts
import { useState } from 'react';
import * as Location from 'expo-location';

export function useLocation() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number; address?: string } | null>(null);
  const [loadingLoc, setLoadingLoc] = useState(false);

  const obtenerUbicacion = async () => {
    setLoadingLoc(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permiso de ubicación denegado');
        setLoadingLoc(false);
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingLoc(false);
    }
  };

  return { location, loadingLoc, obtenerUbicacion };
}