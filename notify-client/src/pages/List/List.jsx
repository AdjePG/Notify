import React, { useEffect, useContext, useState } from 'react';
import { GeneralContext } from '../../config/generalContext';
import * as CategoriesService from '../../services/categoriesService';
import * as NotesService from '../../services/notesService';
import CategoriesAside from '../../layouts/CategoriesAside/CategoriesAside';
import ExistingNoteForm from '../../layouts/ExistingNoteForm/ExistingNoteForm';
import styles from './List.module.scss'

export default function List() {
  const [ notes, setNotes ] = useState();
  const [ categories, setCategories ] = useState();
  const [ categoryId, setCategoryId ] = useState(0);
  const { isDarkMode } = useContext(GeneralContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await fetchCategories()
      await fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await CategoriesService.getCategories();
      const data = await res.json();

      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await NotesService.getNotes();
      const data = await res.json();

      setNotes(configureNotes(data.notes));
    } catch (error) {
      console.log(error);
    }
  };

  const configureNotes = (notes) => {
    return notes.map((note) => {
      return {
        ...note, post_date: new Date(note.post_date),
      };
    });
  }

  if (categories === undefined || notes === undefined) {
    return <div className={`${styles.page}${isDarkMode ? ` ${styles.darkMode}` : ''}`}></div>
  }

  return (
    <div className={`${styles.page}${isDarkMode ? ` ${styles.darkMode}` : ''}`}>
      <CategoriesAside selectCategory={setCategoryId} categories={categories}/>
      <div className={`${styles.notes}`}>
        {notes.map((note) => (
          categoryId === note.category || categoryId === 0 ? ( 
            <ExistingNoteForm key={note.id} note={note} listNotes={fetchNotes} categories={categories}/>
          ) : null
        ))}
      </div>
    </div>
  )
}
