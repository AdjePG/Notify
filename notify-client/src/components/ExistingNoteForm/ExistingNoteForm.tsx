import React, { ReactNode } from 'react';
import * as dateUtil from '../../utils/dateUtil';
import Notes from '../../models/notes';
import styles from './ExistingNoteForm.module.scss'

interface Props {
  note: Notes;
}
  
export default function NoteRead(props : Props) {
  return (
    <div>
			<form className={`${styles.note}`} action="">
				<div className={`${styles.header}`}>
					<input className={`${styles.subject}`} type="text" name="subject" value={props.note.subject}></input>
					<button className={`${styles.edit}`}>Editar</button>
					<button className={`${styles.delete}`}>Eiminar</button>
				</div>
				<div className={`${styles.message}`}>
					<textarea name="message">{props.note.message}</textarea>
				</div>
				<div className={`${styles.footer}`}>
					<select name="category">
							<option value="">Ninguna</option>
							<option value="value2">Value 2</option>
							<option value="value3">Value 3</option>
					</select>
					<p>{dateUtil.getDateFormat(props.note.post_date)}</p>
				</div>
			</form>
		</div>
  )
}
