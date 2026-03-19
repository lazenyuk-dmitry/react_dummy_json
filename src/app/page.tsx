'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard/ProductCard';
import { useAuthStore } from '@/store/useAuthStore';
import styles from './page.module.scss';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const isAuth = useAuthStore((state) => state.isAuth);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/products?limit=12');
        setProducts(response.data.products);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div className={styles.loader}>Loading products...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <section className='page-section'>
      <div className='container'>
        <h2 className={styles.title}>Latest Products</h2>
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              category={product.category}
              price={product.price}
              image={product.thumbnail}
              isAuth={isAuth}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
