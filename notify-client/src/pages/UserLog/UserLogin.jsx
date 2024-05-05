import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../services/userService';
import User from '../../models/user';
import styles from './UserLogin.module.scss'

export default function UserLogin() {
  const [loginForm, isLoginForm] = useState(true);
  const [user, setUser] = useState(new User());
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
		e.preventDefault();

    if (fieldValdiations()) {
      try {
        let res;
        let data;
        
        if (!loginForm) {
          res = await UserService.signUp(user)
          data = await res.json()
        }

        if ((data?.retcode === 0) || loginForm) {
          res = await UserService.logIn(user);
          data = await res.json();

          if (data?.retcode === 0) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify({
              "id": data.user.user_id,
              "username": data.user.username
            }));
            localStorage.setItem('dkmode', 0);
            navigate("/")
          } else {
            alert("El usuario y contraseña son incorrectos");
            console.error(data.message);
          }
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  const fieldValdiations = () => {
    if (user.username === "") {
      alert("Debes añadir un usuario");
      return false;
    }

    if (user.pass === "") {
      alert("Debes añadir una contraseña");
      return false;
    }

    return true;
  }

  const handleInputChange = (e) => {
		const property = e.target.name;
		const value = e.target.value;

		setUser({...user, [property]: value});
	}

  const changeForm = (e) => {
		e.preventDefault();
    isLoginForm(!loginForm);
  }

  return (
    <div className={`${styles.page}`}>
      <form className={`${styles.form}`} action="" onSubmit={handleSubmit}>
        <span className={`${styles.title}`}>
          {loginForm ? `Iniciar sesión` : `Registrar usuario`}
        </span>
        <label className={`${styles.label}`}> Usuario*:
          <input className={`${styles.input}`} type="text" name="username" onChange={handleInputChange}/>
        </label>
        {!loginForm && 
        <>
          <label className={`${styles.label}`}> Nombre:
            <input className={`${styles.input}`} type="text" name="name" onChange={handleInputChange}/>
          </label>
          <label className={`${styles.label}`}> Apellido:
            <input className={`${styles.input}`} type="text" name="surname" onChange={handleInputChange}/>
          </label>
          <label className={`${styles.label}`}> Correo electrónico:
            <input className={`${styles.input}`} type="email" name="mail" onChange={handleInputChange}/>
          </label>
        </>
        }    
        <label className={`${styles.label}`}> Contraseña*:
          <input className={`${styles.input}`} type="password" name="pass" onChange={handleInputChange}/>
        </label>
        <button className={`${styles.btn}`} type="submit">
          {loginForm ? `Entrar` : `Registrarme`}
        </button>
        <hr className={`${styles.separator}`} />
        <button className={`${styles.btn}`} onClick={changeForm}>
          {loginForm ? `Quiero registrarme` : `Volver atrás`}
        </button>
      </form>
    </div>
  )
}
