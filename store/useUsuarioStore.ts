// stores/useUsuarioStore.ts
import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

export interface Usuario {
  id: string;
  email: string;
  nombre: string;
  avatar?: string;
}

interface UsuarioStore {
  usuario: Usuario | null;
  isLoggedIn: boolean;
  login: (user: Usuario, token?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const TOKEN_KEY = 'session_token';
const USER_ID_KEY = 'session_user_id';

export const useUsuarioStore = create<UsuarioStore>((set) => ({
  usuario: null,
  isLoggedIn: false,

  login: async (user, token) => {
    if (token) {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      await SecureStore.setItemAsync(USER_ID_KEY, user.id);
    }
    set({ usuario: user, isLoggedIn: true });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_ID_KEY);
    set({ usuario: null, isLoggedIn: false });
  },
}));
