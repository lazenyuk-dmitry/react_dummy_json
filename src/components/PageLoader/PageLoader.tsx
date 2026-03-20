import { Loader } from "@/components/ui"

import styles from './PageLoader.module.scss';

export const PageLoader = () => {
  return (
    <div className={styles.loarerWrapper}>
      <Loader className={styles.loader} size='lg' />
    </div>
  )
}
