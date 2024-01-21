import React, { useContext } from 'react'
import { GeneralContext } from '../../config/generalContext';
import NewCategoryForm from '../../layouts/NewCategoryForm/NewCategoryForm';
import styles from './Categories.module.scss'

export default function Categories() {
  const { isDarkMode } = useContext(GeneralContext);

  return (
    <div className={`${styles.page}${isDarkMode ? ` ${styles.darkMode}` : ''}`}>
      <NewCategoryForm />
    </div>
  )
}
