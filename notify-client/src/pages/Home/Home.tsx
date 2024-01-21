import React, { useContext } from 'react';
import { GeneralContext } from '../../config/generalContext';
import styles from './Home.module.scss'

export default function Home() {
  const { isDarkMode } = useContext(GeneralContext);

  return (
    <div className={`${styles.page}${isDarkMode ? ` ${styles.darkMode}` : ''}`}>
      Home
    </div>
  )
}
