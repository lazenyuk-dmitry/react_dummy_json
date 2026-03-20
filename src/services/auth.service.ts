import api from '@/lib//api';
import { LoginRequest, RefreshTokenResponde, User } from '@/types';

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
  async refreshToken(token: string): Promise<RefreshTokenResponde> {
    const response = await api.post('/auth/refresh', {
      refreshToken: token,
      expiresInMins: 30,
    });
    return response.data;
  },

  /**
   * Вход в систему
   */
  async login(payload: LoginRequest): Promise<User> {
    const response = await api.post('/auth/login', payload);
    return response.data;
  }
};
