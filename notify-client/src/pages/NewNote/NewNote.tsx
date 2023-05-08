import React, { useContext } from 'react';
import { GeneralContext } from '../../config/generalContext';
import NoteForm from '../../components/NewNoteForm/NewNoteForm';

export default function NewNote() {
  const { isDarkMode } = useContext(GeneralContext);

  return (
    <div className={`page${isDarkMode ? ' dark-mode' : ''}`}>
      <NoteForm />
    </div>
  )
}
