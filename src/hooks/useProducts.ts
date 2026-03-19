import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Product } from '@/types';

/**
 * Хук для получения списка товаров.
 * @param limit - количество загружаемых товаров (по умолчанию 12 по ТЗ)
 */
export const useProducts = (limit: number = 12) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await api.get(`/products?limit=${limit}`);

        setProducts(response.data.products);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [limit]);

  return { products, isLoading, error };
};
