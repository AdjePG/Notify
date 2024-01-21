import Note from "../models/note";

const API_MAIN_URL ="http://localhost:8000/api/"
const API_NOTES = "notes/"
const API_NOTESBYCATEGORY ="notesByCategory/"

export const getNotes = async () => {
 	return await fetch(`${API_MAIN_URL}${API_NOTES}`);
}

export const postNote = async (note: Note) => {
	console.log(note.category_id);
	
  	return await fetch(`${API_MAIN_URL}${API_NOTES}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"subject": note.subject.trim(),
				"message": note.message.trim(),
				"post_date": note.post_date.toJSON(),
				"category_id": note.category_id
			})
		});
}

export const putNote = async (note: Note) => {
 	return await fetch(`${API_MAIN_URL}${API_NOTES}${note.id}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"subject": note.subject.trim(),
				"message": note.message.trim(),
				"post_date": note.post_date.toJSON(),
				"category_id": note.category_id
			})
		});
}

export const deleteNote = async (id_note: number) => {
 	return await fetch(`${API_MAIN_URL}${API_NOTES}${id_note}`,
		{
			method: "DELETE",
		});
}