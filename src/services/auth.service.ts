import api from '@/lib//api';
import { User } from '@/types';

export const AuthService = {
  /**
   * Получение данных текущего авторизованного пользователя
   */
  async getCurrentUser(): Promise<Partial<User>> {
    const response = await api.get('/auth/me');
    return response.data;
  },

  /**
   * Обновление accessToken через refreshToken
   */
  async refreshToken(token: string): Promise<{ accessToken: string, refreshToken: string }> {
    const response = await api.post('/auth/refresh', {
      refreshToken: token,
      expiresInMins: 30,
    });
    return response.data;
  },

  /**
   * Вход в систему
   */
  async login(credentials: Record<string, string>): Promise<User> {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  }
};
