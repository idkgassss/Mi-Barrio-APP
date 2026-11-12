// services/authService.ts
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

// Configuramos Google Sign-In con el Web Client ID de tu .env
GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

export const authService = {
  // Login con Google
  signInWithGoogle: async () => {
    try {
      // 1. Abre el modal de Google
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;

      if (!idToken) {
        throw new Error('No se pudo obtener el token de Google');
      }

      // 2. Valida la credencial en Firebase
      const googleCredential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, googleCredential);
      const firebaseUser = userCredential.user;

      // 3. Sincronizamos el perfil en la colección "usuarios" de Firestore
      const userRef = doc(db, 'usuarios', firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      // Si no existe, lo creamos
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          nombre: firebaseUser.displayName || 'Vecino',
          avatar: firebaseUser.photoURL || '',
          fechaRegistro: new Date().toISOString(),
        });
      }

      return firebaseUser;
    } catch (error: any) {
      throw new Error(`Error en Google Sign-In: ${error.message}`);
    }
  },

  logout: async () => {
    await GoogleSignin.signOut();
    await signOut(auth);
  },

  // Listener global de sesión que pide el layout
  onAuthStateChange: (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
  },
};
