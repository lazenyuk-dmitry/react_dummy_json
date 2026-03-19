/**
 * Данные пользователя, возвращаемые DummyJSON при логине
 */
export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

/**
 * Структура продукта из DummyJSON
 */
export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
}
