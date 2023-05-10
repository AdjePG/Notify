import React, { ReactNode, useState } from 'react';
import * as dateUtil from '../../utils/dateUtil';
import Notes from '../../models/notes';
import styles from './ExistingNoteForm.module.scss'

interface Props {
  note: Notes;
}

export default function NoteRead(props : Props) {
	const [editMode, setEditMode] = useState<boolean>(false);
	const [subject, setSubject] = useState<string>(props.note.subject);
	const [message, setMessage] = useState<string>(props.note.message);

	const handleEdit = async (e : any) => {
		e.preventDefault();
		setEditMode(!editMode);
		// try {
		// 	setNote(new Notes(note.id, note.subject, note.message, new Date(Date.now())));
		// 	const res = await NotesService.postNote(note);
		// 	const data = await res.json();
		// } catch (err) {
		// 	console.log(err);
		// }
	}

	const handleDelete = async (e : any) => {
		e.preventDefault();
		// try {
		// 	setNote(new Notes(note.id, note.subject, note.message, new Date(Date.now())));
		// 	const res = await NotesService.postNote(note);
		// 	const data = await res.json();
		// } catch (err) {
		// 	console.log(err);
		// }
	}

  return (
    <div>
			<form className={`${styles.note}`} action="">
				<div className={`${styles.header}`}>
					<input className={`${styles.subject}${editMode ? ` ${styles.editMode}` : ''}`} type="text" name="subject" defaultValue={subject} onChange={e => setSubject(e.target.value)} disabled={!editMode} maxLength={40}></input>
					<div className={`${styles.notesButtons}${editMode ? ` ${styles.editMode}` : ''}`}>
						<button className={`${styles.edit}`} onClick={handleEdit}>E</button>
						<button className={`${styles.delete}`} onClick={handleDelete}>D</button>
					</div>
					<div className={`${styles.notesButtonsEdit}${editMode ? ` ${styles.editMode}` : ''}`}>
						<button className={`${styles.update}`} onClick={handleEdit}>Up</button>
						<button className={`${styles.undo}`} onClick={handleDelete}>Un</button>
					</div>
				</div>
				<div className={`${styles.body}`}>
					<textarea className={`${styles.message}${editMode ? ` ${styles.editMode}` : ''}`} name="message" defaultValue={message} onChange={e => setMessage(e.target.value)} disabled={!editMode}></textarea>
					<hr className={`${styles.separator}`} />
				</div>
				<div className={`${styles.footer}`}>
					<select className={`${styles.categoryBox}${editMode ? ` ${styles.editMode}` : ''}`} name="category" disabled={!editMode}>
							<option value="" selected>Ninguna</option>
							<option value="value2">Value 2</option>
							<option value="value3">Value 3</option>
					</select>
					<p className={`${styles.date}`}>{dateUtil.getDateFormat(props.note.post_date)}</p>
				</div>
			</form>
		</div>
  )
}
