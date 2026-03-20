'use client'

import { useAuthStore } from '@/store/useAuthStore';

import styles from './Footer.module.scss';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const user = useAuthStore((state) => state.user);
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <footer className={styles.footer}>
      <div className='container'>
        <p>© {currentYear} Abelohost Shop</p>
        {isAuth && <p className={styles.status}>Logged as {user?.email}</p>}
      </div>
    </footer>
  );
};
