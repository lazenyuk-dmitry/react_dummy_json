import styles from './Footer.module.scss';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const isAuth = false;
  const userEmail = "dmitry@example.com";

  return (
    <footer className={styles.footer}>
      <div className='container'>
        <p>© {currentYear} Abelohost Shop</p>
        {isAuth && <p className={styles.status}>Logged as {userEmail}</p>}
      </div>
    </footer>
  );
};
