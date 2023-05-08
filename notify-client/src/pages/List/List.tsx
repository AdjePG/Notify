import React, { useEffect, useContext, useState } from 'react';
import { GeneralContext } from '../../config/generalContext';
import * as NotesService from '../../services/notesService';
import Notes from '../../models/notes';
import NoteRead from '../../components/ExistingNoteForm/ExistingNoteForm';

export default function List() {
  const [ notes, setNotes] = useState<Notes[]>([]);
  const { isDarkMode } = useContext(GeneralContext);

  const listNotes = async () => {
    try {
      const res = await NotesService.getNotes();
      const data = await res.json();
      const note = configureNote(data)
      setNotes(note);
    } catch (error) {
      console.log(error);
    }
  };

  const configureNote = (data : any) => {
    return data.notes.map((note: Notes) => {
      return {
        ...note,
        post_date: new Date(note.post_date),
      };
    });
  } 

  useEffect(() => {
    listNotes();
  },[])

  return (
    <div className={`page${isDarkMode ? ' dark-mode' : ''}`}>
      {notes.map((note) => (
        <NoteRead key={note.id} note={note} />
      ))}
    </div>
  )
}
