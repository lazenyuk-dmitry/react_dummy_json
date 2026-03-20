import api from '@/lib//api';
import { ProductsResponse } from '@/types';

export const CatalogService = {
  async getProducts(limit = 12): Promise<ProductsResponse> {
    const { data } = await api.get(`/products?limit=${limit}`)
    return data;
  }
};
