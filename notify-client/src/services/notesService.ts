import Notes from "../models/notes";

const API_URL ="http://localhost:8000/api/notes/"

export const getNotes = async () => {
  return await fetch(API_URL);
}

export const postNote = async (note: Notes) => {
  return await fetch(API_URL,
		{
			method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
				"subject": note.subject.trim(),
				"message": note.message.trim(),
				"post_date": note.post_date.toJSON(),
				"category": note.category_id,
			})
		});
}