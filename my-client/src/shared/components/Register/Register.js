import React from 'react';
import { Navigate } from 'react-router-dom';
import './Register.css'

export default function Register() {
  return (
    <>
        <label className="titre" type="title"> S'inscrire </label>
        <form className='register-form'>
            <label htmlFor='username'>Nom d'utilisateur:</label>
            <input id='username' type='input' placeholder='votre nom'/>


            <label htmlFor='mail'>Email:</label>
            <input id='mail' type='input' placeholder='exemple@mail.com'/>

            <label htmlFor='password1'>Definir un mot de passe:</label>
            <input id='pasword1' type='input' placeholder='********'/>

            <label htmlFor='password2'>retaper le mot de passe:</label>
            <input id='pasword2' type='input' placeholder='********'/>

            <a href='auth'>Se Connecter</a>

            <span style={{opacity: 1}}>erreur</span>

            <div className='submit-container'>
                <input className="submit-button" type='submit'/>
            </div>
        </form>
    </>
  )
}
