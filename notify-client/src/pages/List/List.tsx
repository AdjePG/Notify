import React, { useEffect, useContext, useState } from 'react';
import { GeneralContext } from '../../config/generalContext';
import * as CategoriesService from '../../services/categoriesService';
import * as NotesService from '../../services/notesService';
import CategoriesAside from '../../layouts/CategoriesAside/CategoriesAside';
import ExistingNoteRead from '../../layouts/ExistingNoteForm/ExistingNoteForm';
import Category from '../../models/category';
import Note from '../../models/note';
import styles from './List.module.scss'

export default function List() {
  const [ notes, setNotes ] = useState<Note[]>();
  const [ categories, setCategories ] = useState<Category[]>();
  const [ categoryId, setCategoryId ] = useState<number>(0);
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

  const configureNotes = (notes : Note[]) => {
    return notes.map((note: Note) => {
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
          categoryId === note.category_id || categoryId === 0 ? ( 
            <ExistingNoteRead key={note.id} note={note} listNotes={fetchNotes} categories={categories}/>
          ) : null
        ))}
      </div>
    </div>
  )
}
