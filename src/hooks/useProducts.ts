import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { CatalogService } from '@/services/catalog.service';
import { Product } from '@/types';

/**
 * Хук для получения списка товаров.
 * @param limit - количество загружаемых товаров (по умолчанию 12)
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

        const response = await CatalogService.getProducts(limit);

        setProducts(response.products);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          setError(err.response?.data?.message || 'Failed to load products');
        }
        throw err;
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [limit]);

  return { products, isLoading, error };
};
