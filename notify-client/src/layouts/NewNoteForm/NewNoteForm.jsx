import React, { useEffect, useRef, useContext, useState } from 'react';
import * as CategoriesService from '../../services/categoriesService';
import * as NotesService from '../../services/notesService';
import Note from '../../models/note';
import Category from '../../models/category';
import { GeneralContext } from '../../config/generalContext';
import styles from './NewNoteForm.module.scss'

export default function NoteForm() {
	const { isDarkMode } = useContext(GeneralContext);

	const [ note, setNote ] = useState(new Note());
	const [ categories, setCategories ] = useState([]);

	const messageTextArea = useRef(null);

	useEffect(() => {
		fetchCategories();
	}, []);

	useEffect(() => {
		autosizingAndScrolling()
	});

	const fetchCategories = async () => {
		try {
			const res = await CategoriesService.getCategories();
			const data = await res.json();
			setCategories(data.categories);
		} catch (error) {
			console.log(error);
		}
	};

	const handleInputChange = (e) => {
		const property = e.target.name;
		const value = e.target.value;

		setNote({...note, [property]: value});
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setNote(new Note(note.id, note.subject, note.message, new Date(Date.now())));
			const res = await NotesService.postNote(note);
			const data = await res.json();
			
			if (data.retcode === 0) {
				alert('Nota creada correctamente');
			}
		} catch (err) {
			console.log(err);
		}
	}

	const autosizingAndScrolling = () => {
		if (messageTextArea.current !== null) {	
			messageTextArea.current.style.height = "auto";
			messageTextArea.current.style.height = messageTextArea.current.scrollHeight + "px";

			if (parseInt(messageTextArea.current.style.getPropertyValue('height')) >= 300 ) {
				messageTextArea.current.style.overflow = "visible";
			}
		}
	}

	return (
		<div className={`${styles.component}`}>
			<form className={`${styles.form}${isDarkMode ? ` ${styles.darkMode}` : ''}`} action="" onSubmit={handleSubmit}>
				<label className={`${styles.label}`}> Asunto:
					<input className={`${styles.subject}`} type="text" name="subject" onChange={handleInputChange} maxLength={40}/>
				</label>
				<label className={`${styles.label}`}> Mensaje:
					<textarea className={`${styles.message}`} name="message" ref={messageTextArea} onChange={handleInputChange}></textarea>
				</label>
				<label className={`${styles.label}`}> Categoria:
					<select className={`${styles.categories}`} name="category" onChange={handleInputChange}>
						<option key={0} value={0}></option>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>{category.name}</option>
						))}
					</select>
				</label>
				<button className={`${styles.submit}`} type="submit">Crear nota</button>
			</form>
    </div>
	)
}
