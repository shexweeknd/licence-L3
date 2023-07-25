import React from 'react';
import './Login.css'

export default function Login() {
  return (
    <>
        <label className="titre" type="title"> Connexion </label>
        <form className='login-form'>
            <label htmlFor='mail'>Identifiant:</label>
            <input id='mail' type='input' placeholder='exemple@mail.com'/>

            <label htmlFor='password'>Mot de passe:</label>
            <input id='pasword' type='input' placeholder='********'/>

            <a href='Register'>S'inscrire</a>

            <span style={{opacity: 1}}>erreur</span>

            <div className='submit-container'>
                <input className="submit-button" type='submit'/>
            </div>
        </form>
    </>
  )
}
