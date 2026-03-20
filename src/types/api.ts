import { Product } from "./entities";

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RefreshTokenResponde {
  accessToken: string;
  refreshToken: string;
}
