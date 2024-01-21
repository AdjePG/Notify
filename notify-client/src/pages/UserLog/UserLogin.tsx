import React, { useState } from 'react';
import styles from './UserLogin.module.scss'

export default function UserLogin() {
  const [loginForm, isLoginForm] = useState(true);

  const changeForm = (e: any) => {
		e.preventDefault();
    isLoginForm(!loginForm);
  }

  return (
    <div className={`${styles.page}`}>
      <form className={`${styles.form}`} action="">
        <span className={`${styles.title}`}>
          {loginForm ? `Iniciar sesión` : `Registrar usuario`}
        </span>
        <label className={`${styles.label}`}> Correo electrónico:
          <input className={`${styles.input}`} type="text" name="mail"/>
        </label>
        {!loginForm && 
        <>
          <label className={`${styles.label}`}> Nombre:
            <input className={`${styles.input}`} type="text" name="name"/>
          </label>
          <label className={`${styles.label}`}> Apellido:
            <input className={`${styles.input}`} type="text" name="surname"/>
          </label>
        </>
        }    
        <label className={`${styles.label}`}> Contraseña:
          <input className={`${styles.input}`} type="password" name="pass"/>
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
