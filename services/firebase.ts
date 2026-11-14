import { initializeApp, getApps, getApp } from 'firebase/app';
// @ts-ignore: Falso error de tipado de Firebase en Expo
import { initializeAuth, getAuth, getReactNativePersistence, Auth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FB_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FB_MSG_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FB_APP_ID,
};

// 1. Evita duplicar la app si Expo recarga en caliente
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 2. Inicializa Auth con persistencia local sin romperse al recargar
let authInstance: Auth;
try {
  authInstance = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch {
  authInstance = getAuth(app);
}

export const auth = authInstance;

// 3. Inicializar Firestore
export const db = getFirestore(app);
