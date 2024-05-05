import React, { useContext } from 'react';
import { GeneralContext } from '../../config/generalContext';
import NewNoteForm from '../../layouts/NewNoteForm/NewNoteForm';
import styles from './NewNote.module.scss'

export default function NewNote() {
  const { isDarkMode } = useContext(GeneralContext);
  
  return (
    <div className={`${styles.page}${isDarkMode ? ` ${styles.darkMode}` : ''}`}>
      <NewNoteForm/>
    </div>
  )
}
