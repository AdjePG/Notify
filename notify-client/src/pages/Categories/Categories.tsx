import React, { useContext } from 'react'
import { GeneralContext } from '../../config/generalContext';
import * as NotesService from '../../services/notesService';

export default function Categories() {
  const { isDarkMode, toggleDarkMode } = useContext(GeneralContext);

  return (
    <div className={`page${isDarkMode ? ' dark-mode' : ''}`}>
      Categories
    </div>
  )
}
