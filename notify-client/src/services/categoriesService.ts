import Category from "../models/category";

const API_MAIN_URL ="http://localhost:8000/api/"
const API_CATEGORY = "categories/"

export const getCategories = async () => {
  return await fetch(`${API_MAIN_URL}${API_CATEGORY}`);
}

export const postCategory = async (category: Category) => {
	console.log(category)
  	return await fetch(`${API_MAIN_URL}${API_CATEGORY}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"name": category.name.trim(),
				"info": category.info.trim(),
				"color_id": category.color_id,
			})
		});
}

export const putCategory = async (category: Category) => {
  return await fetch(`${API_MAIN_URL}${API_CATEGORY}${category.id}`,
		{
			method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
				"name": category.name.trim(),
				"info": category.info.trim(),
				"color_id": category.color_id,
			})
		});
}

export const deleteCategory = async (category_id: number) => {
  return await fetch(`${API_MAIN_URL}${API_CATEGORY}${category_id}`,
		{
			method: "DELETE",
		});
}