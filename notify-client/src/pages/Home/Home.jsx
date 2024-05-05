import React, { useContext } from 'react';
import { GeneralContext } from '../../config/generalContext';
import styles from './Home.module.scss'

export default function Home() {
  const { isDarkMode } = useContext(GeneralContext);
  const user = localStorage.getItem("user")
  let username = "";

  if (user === null) {
    return null;
  } else {
    username = JSON.parse(user).username;
    if (username === null || username === "") {
      return null;
    }
  }

  return (
    <div className={`${styles.page}${isDarkMode ? ` ${styles.darkMode}` : ''}`}>
      <div className={`${styles.introductionBox}`}>
        <h2 className={`${styles.title}`}>
          ¡Bienvenid@ {username}!
        </h2>
        <p className={`${styles.text}`}>
          Ahora puedes crear y ver tus notas.
        </p>
      </div>
    </div>
  )
}
