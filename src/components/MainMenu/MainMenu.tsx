import Link from 'next/link'
import styles from './MainMenu.module.scss'

export const MainMenu = () => {
  const links = ["Home", "Catigories", "Laptops", "Cameras"]

  return (
    <div className={styles.mainMenu}>
      <div className='container'>
        <nav>
          <ul className={styles.menuList}>
            {links.map((item, index) => (
              <li className={styles.menuItem} key={index}>
                <Link href="/">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
