'use client'

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { AuthService } from '@/services/auth.service';
import { LoginRequest, User } from '@/types';

interface AuthState {
  user: User | null;
  isAuth: boolean;
  isInitializing: boolean;
  setAuth: (user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
  login: (credentials: LoginRequest) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuth: false,
      isInitializing: true,

      setAuth: (user) => set({ user, isAuth: true, isInitializing: false }),

      logout: () => set({ user: null, isAuth: false, isInitializing: false }),

      /**
       * Метод для входа в систему
       */
      login: async (credentials: LoginRequest) => {
        const userData = await AuthService.login(credentials);
        get().setAuth(userData);
      },

      /**
       * Метод восстановления сессии
       */
      checkAuth: async () => {
        const { isAuth, setAuth, logout } = get();

        if (!isAuth) {
          set({ isInitializing: false });
          return;
        }

        try {
          const userData = await AuthService.getCurrentUser();
          const currentUser = get().user;

          if (currentUser) {
            setAuth({ ...currentUser, ...userData } as User);
          }
        } catch (err) {
          console.error("Session restoration failed:", err);
          logout();
        } finally {
          set({ isInitializing: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, isAuth: state.isAuth }),
    }
  )
);
