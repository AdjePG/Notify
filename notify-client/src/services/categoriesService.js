const API_MAIN_URL ="http://localhost:8000/api/"
const API_CATEGORY = "categories/"

const TOKEN = localStorage.getItem("token")

export const getCategories = async () => {
  	return await fetch(`${API_MAIN_URL}${API_CATEGORY}`,
	{
		method: "GET",
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Token ${TOKEN}`
		}
	});
}

export const postCategory = async (category) => {
  	return await fetch(`${API_MAIN_URL}${API_CATEGORY}`,
	{
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Token ${TOKEN}`
		},
		body: JSON.stringify({
			"name": category.name.trim(),
			"info": category.info.trim(),
			"color_id": category.color_id,
		})
	});
}

export const putCategory = async (category) => {
  	return await fetch(`${API_MAIN_URL}${API_CATEGORY}${category.id}`,
	{
		method: "PUT",
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Token ${TOKEN}`
		},
		body: JSON.stringify({
				"name": category.name.trim(),
				"info": category.info.trim(),
				"color_id": category.color_id,
		})
	});
}

export const deleteCategory = async (category_id) => {
  	return await fetch(`${API_MAIN_URL}${API_CATEGORY}${category_id}`,
	{
		method: "DELETE",
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Token ${TOKEN}`
		}
	});
}