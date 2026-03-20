"use client"

import Link from 'next/link';
import styles from './Header.module.scss';
import { FaEnvelope, FaPhone, FaLocationDot, FaUser } from "react-icons/fa6";
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui';

export const Header = () => {
  const user = useAuthStore((state) => state.user);
  const isAuth = useAuthStore((state) => state.isAuth);
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div className="container">
          <div className={styles.topContent}>
            <span className={styles.headerContactsGroup}>
              <a href="tel:+021-95-51-84" className={styles.headerContantItem}>
                <FaPhone />
                +021-95-51-84
              </a>
              <a href="mailto:shop@abelohost.com" className={styles.headerContantItem}>
                <FaEnvelope />
                shop@abelohost.com
              </a>
              <a href="#" className={styles.headerContantItem}>
                <FaLocationDot />
                1734 Stonecoald Streat
              </a>

            </span>

            {isAuth ? (
              <div className={styles.headerContantItem}>
                <FaUser />
                <span>{user?.firstName} {user?.lastName}</span>
                <Button
                  size='sm'
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login" className={styles.headerContantItem}>
                <FaUser />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className={styles.headerBottom}>
        <div className="container">
          <div className={styles.bottomContent}>
            <Link href="/" className={styles.logo}>
              Abelohost Shop<span>.</span>
            </Link>

            <img
              src="https://placehold.co/600x70"
              alt="Placeholder image"
              width={600}
              height={70}
            />
          </div>

        </div>
      </div>
    </header>
  );
};
