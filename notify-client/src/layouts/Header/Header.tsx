import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/images/Notify-logo.png'
import logoDM from '../../assets/images/Notify-logo-DM.png'
import { GeneralContext } from '../../config/generalContext';
import styles from './Header.module.scss'

export default function Header() {
  const { isDarkMode, toggleDarkMode } = useContext(GeneralContext);

  return (
    <div className={`${styles.header}${isDarkMode ? ` ${styles.dark_mode}` : ''}`}>
      <nav className={`${styles.items}`}>
        <Link className={`${styles.logo}`} to="/"><img className={`${styles.logo}`} src={isDarkMode ? logoDM : logo}/></Link>
        <Link className={`${styles.item}`} to="/newNote">Añadir nota</Link>
        <Link className={`${styles.item}`} to="/categories">Categorías</Link>
        <Link className={`${styles.item}`} to="/list">Listado</Link>
      </nav>
      <div className={`${styles.others}`}>
        <span className={`${styles.itemDM}`} onClick={toggleDarkMode}>Modo Oscuro</span>
        <Link className={`${styles.exit}`} to="/login">Salir Sesión</Link>
      </div>
    </div>
  )
}
