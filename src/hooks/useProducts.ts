import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { CatalogService } from '@/services/catalog.service';

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
