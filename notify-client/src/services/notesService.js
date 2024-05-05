const API_MAIN_URL ="http://localhost:8000/api/"
const API_NOTES = "notes/"

const TOKEN = localStorage.getItem("token")

export const getNotes = async () => {
 	return await fetch(`${API_MAIN_URL}${API_NOTES}`,
	{
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Token ${TOKEN}`
		}
	});
}

export const postNote = async (note) => {
	return await fetch(`${API_MAIN_URL}${API_NOTES}`,
	{
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			'Authorization': `Token ${TOKEN}`
		},
		body: JSON.stringify({
			"subject": note.subject.trim(),
			"message": note.message.trim(),
			"post_date": note.post_date.toJSON(),
			"category": note.category ?? 0
		})
	});
}

export const putNote = async (note) => {
 	return await fetch(`${API_MAIN_URL}${API_NOTES}${note.id}`,
	{
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			'Authorization': `Token ${TOKEN}`
		},
		body: JSON.stringify({
			"subject": note.subject.trim(),
			"message": note.message.trim(),
			"update_date": new Date().toJSON(),
			"category": parseInt(note.category) ?? 0
		})
	});
}

export const deleteNote = async (id_note) => {
 	return await fetch(`${API_MAIN_URL}${API_NOTES}${id_note}`,
	{
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			'Authorization': `Token ${TOKEN}`
		}
	});
}