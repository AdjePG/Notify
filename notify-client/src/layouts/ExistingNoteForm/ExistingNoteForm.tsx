import React, { useEffect, useRef, useState } from 'react';
import * as dateUtil from '../../utils/dateUtil';
import * as NotesService from '../../services/notesService';
import Note from '../../models/note';
import Category from '../../models/category';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faCheck, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './ExistingNoteForm.module.scss'

interface Props {
	note: Note;
	listNotes: () => {};
	categories: Category[];
}

export default function NoteRead(props : Props) {
	const [ editMode, setEditMode ] = useState<boolean>(false);
	const [ originalNote, setOriginalNote ] = useState<Note>(props.note);
	const [ note, setNote ] = useState<Note>(originalNote);
	const [ categories ] = useState<Category[]>(props.categories);

	const noteForm = useRef<HTMLFormElement>(null);
	const messageHeaderDiv = useRef<HTMLDivElement>(null);
	const messageTextArea = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		autosizingAndScrolling()
	});

	const handleInputChange = (e : any) => {
		const property: string = e.target.name;
		const value = e.target.value;

		setNote({...note, [property]: value});
	}

	const handleEdit = (e : any) => {
		e.preventDefault();
		setEditMode(!editMode);
	}

	const handleDelete = async (e : any) => {
		e.preventDefault();
		if (props.note.id !== undefined) {
			if (window.confirm("¿Estás seguro de eliminar esta nota? No se podrá recuperar una vez eliminada.") === true) {
				await NotesService.deleteNote(props.note.id);
				props.listNotes();
			}
		}
	}

	const handleUpdate = async (e : any) => {
		e.preventDefault();
		try {
			const res = await NotesService.putNote(note);
			await res.json();
			setOriginalNote(note);
		} catch (err) {
			console.log(err);
		}
		setEditMode(!editMode);
	}

	const handleUndo = (e : any) => {
		e.preventDefault();
		setNote({...note, "subject": originalNote.subject, "message": originalNote.message});
		setEditMode(!editMode);
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
		<form className={`${styles.note}`} ref={noteForm} action="">
			<div className={`${styles.messageHeader}`} ref={messageHeaderDiv}>
				<input className={`${styles.subject}${editMode ? ` ${styles.editMode}` : ''}`} type="text" name="subject" value={note.subject} onChange={handleInputChange} disabled={!editMode} maxLength={40}></input>
				<div className={`${styles.notesButtons}${editMode ? ` ${styles.editMode}` : ''}`}>
					<button className={`${styles.edit}`} onClick={handleEdit}><FontAwesomeIcon icon={faPen} /></button>
					<button className={`${styles.delete}`} onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></button>
				</div>
				<div className={`${styles.notesButtonsEdit}${editMode ? ` ${styles.editMode}` : ''}`}>
					<button className={`${styles.update}`} onClick={handleUpdate}><FontAwesomeIcon icon={faCheck} /></button>
					<button className={`${styles.undo}`} onClick={handleUndo}><FontAwesomeIcon icon={faRotateLeft} /></button>
				</div>
			</div>
			<div className={`${styles.messageBody}`}>
				<textarea className={`${styles.message}${editMode ? ` ${styles.editMode}` : ''}`} ref={messageTextArea} name="message" value={note.message} onChange={handleInputChange} disabled={!editMode}></textarea>
				<hr className={`${styles.separator}`} />
			</div>
			<div className={`${styles.messageFooter}`}>
				<select className={`${styles.categories}${editMode ? ` ${styles.editMode}` : ''}`} name="category_id" defaultValue={note.category_id} onChange={handleInputChange} disabled={!editMode}>
					<option key={0} value={0}></option>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>{category.name}</option>
					))}
				</select>
				<span className={`${styles.date}`}>{dateUtil.getDateFormat(props.note.post_date)}</span>
			</div>
		</form>
	)
}

