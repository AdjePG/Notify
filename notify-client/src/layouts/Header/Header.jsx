import React, { useContext } from 'react'
import logo from '../../assets/images/Notify-logo.png'
import logoDM from '../../assets/images/Notify-logo-DM.png'
import { GeneralContext } from '../../config/generalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky, faBookmark, faListUl, faCircleHalfStroke, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';

export default function Header() {
  const { isDarkMode, toggleDarkMode } = useContext(GeneralContext);

  const alertBeforeExit = async (e) => {
    const confirmed = window.confirm('¿Estás seguro de que quieres salir de la sesión?');

    if (confirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("dkmode");
    } else {
      e.preventDefault();
    }
  }

  return (
    <div className={`${styles.header}${isDarkMode ? ` ${styles.dark_mode}` : ''}`}>
      <nav className={`${styles.items}`}>
        <a className={`${styles.logo}`} href="/"><img className={`${styles.logo}`} src={isDarkMode ? logoDM : logo}/></a>
        <a className={`${styles.item}`} href="/newNote"><FontAwesomeIcon icon={faNoteSticky} /><span className={`${styles.text}`}>Añadir nota</span></a>
        <a className={`${styles.item}`} href="/categories"><FontAwesomeIcon icon={faBookmark} /><span className={`${styles.text}`}>Categorías</span></a>
        <a className={`${styles.item}`} href="/list"><FontAwesomeIcon icon={faListUl} /><span className={`${styles.text}`}>Listado</span></a>
      </nav>
      <div className={`${styles.others}`}>
        <span className={`${styles.itemDM}`} onClick={toggleDarkMode}><FontAwesomeIcon icon={faCircleHalfStroke} /><span className={`${styles.text}`}>{isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}</span></span>
        <a className={`${styles.exit}`} onClick={alertBeforeExit} href="/user"><FontAwesomeIcon icon={faPowerOff} /><span className={`${styles.text}`}>Salir Sesión</span></a>
      </div>
    </div>
  )
}
