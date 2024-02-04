import User from "../models/user";

const API_MAIN_URL ="http://localhost:8000/api/"
const API_USER = "users/"
const API_USER_SIGNUP = "signup/"
const API_USER_LOGIN = "login/"
const API_USER_LOGOUT = "logout/"
const API_USER_GETSESSION = "session/"

export const getSession = async (token: string | null) => {
	return await fetch(`${API_MAIN_URL}${API_USER}${API_USER_GETSESSION}${token}`);
}

export const logIn = async (user: User) => {
	return await fetch(`${API_MAIN_URL}${API_USER}${API_USER_LOGIN}`,
	{
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			"username": user.username.trim(),
			"pass": user.pass
		})
	});
}

export const logOut = async () => {
	return await fetch(`${API_MAIN_URL}${API_USER}${API_USER_LOGOUT}`,
	{
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			'Authorization': `Bearer ${localStorage.getItem("token")}`, 
		}
	});
}

export const signUp = async (user: User) => {
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
			"pass": user.pass
		})
	});
}