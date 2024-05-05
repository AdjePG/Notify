import React, { useEffect, useRef, useState } from 'react';
import * as dateUtil from '../../utils/dateUtil';
import * as NotesService from '../../services/notesService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faCheck, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './ExistingNoteForm.module.scss'
import colors from './../../data/colors.json'

export default function NoteRead(props) {
	const [ backgroundColors, setBackgroundColors ] = useState({
		'primary_code': '#00000000',
		'secondary_code': '#00000000'
	});
	const [ editMode, setEditMode ] = useState(false);
	const [ originalNote, setOriginalNote ] = useState(props.note);
	const [ note, setNote ] = useState(originalNote);
	const [ categories ] = useState(props.categories);

	const messageHeaderDiv = useRef(null);
	const messageTextArea = useRef(null);

	useEffect(() => {
		setColor(parseInt(props.note.category))
	}, [])

	useEffect(() => {
		autosizingAndScrolling()
	});

	const handleInputChange = (e) => {
		const property = e.target.name;
		const value = e.target.value;

		setNote({...note, [property]: value});
	}

	const handleEdit = (e) => {
		e.preventDefault();
		setEditMode(!editMode);
	}

	const handleDelete = async (e) => {
		e.preventDefault();
		if (props.note.id !== undefined) {
			if (window.confirm("¿Estás seguro de eliminar esta nota? No se podrá recuperar una vez eliminada.") === true) {
				await NotesService.deleteNote(props.note.id);
				props.listNotes();
			}
		}
	}

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const res = await NotesService.putNote(note);
			await res.json();
			setOriginalNote(note);
			setColor(parseInt(note.category));
			props.listNotes();
		} catch (err) {
			console.log(err);
		}
		setEditMode(!editMode);
	}

	const handleUndo = (e) => {
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

	const setColor = (categoryId) => {
		let colorPalette;
		let backgroundColor;
		let category;
		
		category = categories.find(category => category.id === categoryId)
		colorPalette = colors.find(color => category?.color_id === color.id)

		if (colorPalette === undefined) 
		{
			backgroundColor = {
				'primary_code': '#FFA100',
				'secondary_code': '#FFB200'
			}
		}
		else
		{
			backgroundColor = {
				'primary_code': colorPalette.primary_code,
				'secondary_code': colorPalette.secondary_code
			}
		}

		setBackgroundColors(backgroundColor);
	}

	return (
		<form className={`${styles.note}`} style={{backgroundColor: `${backgroundColors.secondary_code}`}} action="">
			<div className={`${styles.messageHeader}`} style={{backgroundColor: `${backgroundColors.primary_code}`}} ref={messageHeaderDiv}>
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
				<select className={`${styles.categories}${editMode ? ` ${styles.editMode}` : ''}`} name="category" defaultValue={note.category} onChange={handleInputChange} disabled={!editMode}>
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

