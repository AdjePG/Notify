import React, {useState } from 'react';
import * as NotesService from '../../services/notesService';
import Notes from '../../models/notes';

export default function NoteForm() {
	const [note, setNote] = useState<Notes>(new Notes(0, "", "",  new Date()));

	const handleInputChange = (e : any) => {
		let property: string = e.target.name;
		let value = e.target.value === '' ? null : e.target.value;

		setNote({...note, [property]: value});
	}

	const handleSubmit = async (e : any) => {
		e.preventDefault();
		try {
			setNote(new Notes(note.id, note.subject, note.message, new Date(Date.now())));
			const res = await NotesService.postNote(note);
			const data = await res.json();
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div style={{position: "relative"}}>
			<form action="" onSubmit={handleSubmit}>
				<input type="text" name="subject" onChange={handleInputChange} placeholder="Título"/>
				<input type="text" name="message" onChange={handleInputChange} placeholder="Mensaje"/>
				<select name="category" onChange={handleInputChange}>
						<option value="">Ninguna</option>
						<option value="value2">Value 2</option>
						<option value="value3">Value 3</option>
				</select>
				<button type="submit">Crear nota</button>
			</form>
    </div>
  )
}
