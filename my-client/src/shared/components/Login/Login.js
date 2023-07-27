import React, { useEffect, useState } from 'react';
import { validateLoginForm } from '../../utils/authValidator';

import './Login.css'

export default function Login() {

  const [mail, setMail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(()=>{
    setIsFormValid(validateLoginForm({ mail, password}))
  }, [mail, password, setIsFormValid])

  const handleMail = (e) => {
    setMail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    console.log(mail)
    console.log(password)
  }

  return (
    <>
        <label className="titre" type="title"> Connexion </label>
        <form className='login-form' onSubmit={handleOnSubmit}>
            <label htmlFor='mail'>Identifiant:</label>
            <input id='mail' type='input' onChange={handleMail} placeholder='exemple@mail.com'/>

            <label htmlFor='password'>Mot de passe:</label>
            <input id='password' type='input' onChange={handlePassword} placeholder='********'/>

            <a href='Register'>S'inscrire</a>

            <span style={{opacity: 1}}>erreur</span>

            <div className='submit-container'>
                <input className="submit-button" disabled={!isFormValid} type='submit'/>
            </div>
        </form>
    </>
  )
}
