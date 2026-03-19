import styles from './MainMeny.module.scss'

export const MainMenu = () => {
  const links = ["Home", "Catigories", "Laptops", "Cameras"]

  return (
    <div className={styles.mainMenu}>
      <div className='container'>
        <nav>
          <ul className={styles.menuList}>
            {links.map((item, index) => (
              <li className={styles.menuItem} key={index}>
                <a href="#">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
