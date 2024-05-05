const API_MAIN_URL ="http://localhost:8000/api/"
const API_USER = "users/"
const API_USER_SIGNUP = "signup/"
const API_USER_LOGIN = "login/"
const API_USER_GETSESSION = "session/"

const TOKEN = localStorage.getItem("token")

export const getSession = async () => {
	return await fetch(`${API_MAIN_URL}${API_USER}${API_USER_GETSESSION}`,
	{
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Token ${TOKEN}`
		},
	});
}

export const logIn = async (user) => {
	return await fetch(`${API_MAIN_URL}${API_USER}${API_USER_LOGIN}`,
	{
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			"username": user.username.trim(),
			"password": user.pass
		})
	});
}

export const signUp = async (user) => {
	return await fetch(`${API_MAIN_URL}${API_USER}${API_USER_SIGNUP}`,
	{
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			"mail": user.mail.trim(),
			"username": user.username.trim(),
			"name": user.name.trim(),
			"surname": user.surname.trim(),
			"password": user.pass
		})
	});
}
