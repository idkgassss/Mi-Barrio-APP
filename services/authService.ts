// services/authService.ts
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

export const authService = {
  // 1. LOGIN CON GOOGLE
  signInWithGoogle: async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;

      if (!idToken) throw new Error('No se pudo obtener el token de Google');

      const googleCredential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, googleCredential);
      const firebaseUser = userCredential.user;

      const userRef = doc(db, 'usuarios', firebaseUser.uid);
      const userSnap = await getDoc(userRef);

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
      throw error;
    }
  },

  // 2. REGISTRO CON CORREO Y CONTRASEÑA
  registerWithEmail: async (email: string, password: string, nombre: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Le creamos su perfil en la base de datos
      const userRef = doc(db, 'usuarios', firebaseUser.uid);
      await setDoc(userRef, {
        id: firebaseUser.uid,
        email: firebaseUser.email,
        nombre: nombre || 'Vecino',
        avatar: '',
        fechaRegistro: new Date().toISOString(),
      });
      return firebaseUser;
    } catch (error: any) {
      throw error;
    }
  },

  // 3. LOGIN CON CORREO Y CONTRASEÑA
  loginWithEmail: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      throw error;
    }
  },

  // CERRAR SESIÓN
  logout: async () => {
    await GoogleSignin.signOut();
    await signOut(auth);
  },

  onAuthStateChange: (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
  },
};
