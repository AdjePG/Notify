import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/images/Notify-logo.png'
import logoDM from '../../assets/images/Notify-logo-DM.png'
import { GeneralContext } from '../../config/generalContext';
import * as UserService from '../../services/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky, faBookmark, faListUl, faCircleHalfStroke, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';

export default function Header() {
  const { isDarkMode, toggleDarkMode } = useContext(GeneralContext);

  const alertBeforeExit = async (e: any) => {
    const confirmed = window.confirm('¿Estás seguro de que quieres salir de la sesión?');

    if (confirmed) {
      const res = await UserService.logOut();
      const data = await res.json();

      if (data.retcode === 0) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } else {
      e.preventDefault();
    }
  }

  return (
    <div className={`${styles.header}${isDarkMode ? ` ${styles.dark_mode}` : ''}`}>
      <nav className={`${styles.items}`}>
        <Link className={`${styles.logo}`} to="/"><img className={`${styles.logo}`} src={isDarkMode ? logoDM : logo}/></Link>
        <Link className={`${styles.item}`} to="/newNote"><FontAwesomeIcon icon={faNoteSticky} /><span className={`${styles.text}`}>Añadir nota</span></Link>
        <Link className={`${styles.item}`} to="/categories"><FontAwesomeIcon icon={faBookmark} /><span className={`${styles.text}`}>Categorías</span></Link>
        <Link className={`${styles.item}`} to="/list"><FontAwesomeIcon icon={faListUl} /><span className={`${styles.text}`}>Listado</span></Link>
      </nav>
      <div className={`${styles.others}`}>
        <span className={`${styles.itemDM}`} onClick={toggleDarkMode}><FontAwesomeIcon icon={faCircleHalfStroke} /><span className={`${styles.text}`}>Modo Oscuro</span></span>
        <Link className={`${styles.exit}`} onClick={alertBeforeExit} to="/user"><FontAwesomeIcon icon={faPowerOff} /><span className={`${styles.text}`}>Salir Sesión</span></Link>
      </div>
    </div>
  )
}
