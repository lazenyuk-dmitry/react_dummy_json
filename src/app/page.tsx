'use client';

import { ProductCard } from '@/components/ProductCard/ProductCard';
import { useAuthStore } from '@/store/useAuthStore';
import styles from './page.module.scss';
import { useProducts } from '@/hooks/useProducts';

export default function HomePage() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const { products, isLoading, error } = useProducts(12);

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
