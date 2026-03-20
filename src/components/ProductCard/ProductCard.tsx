import { Button } from '../ui';
import styles from './ProductCard.module.scss';

interface ProductProps {
  title: string;
  category: string;
  price: number;
  image: string;
  isAuth: boolean;
}

export const ProductCard = ({ title, category, price, image, isAuth }: ProductProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.info}>
        <p className={styles.category}>{category}</p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>${price}</p>
        {isAuth && <Button className={styles.addBtn}>Add to cart</Button>}
      </div>
    </div>
  );
};
