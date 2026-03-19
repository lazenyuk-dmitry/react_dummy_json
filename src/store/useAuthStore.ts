import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuth: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuth: false,
      login: (userData) => set({ user: userData, isAuth: true }),
      logout: () => {
        set({ user: null, isAuth: false });
        // Очищаем локальное хранилище, если нужно
      },
    }),
    {
      name: 'auth-storage', // Ключ в localStorage
    }
  )
);
