import './Register.css';
import EyePasswordHidden from "../../assets/icons/eye-password-hide.svg";
import EyePasswordShow from "../../assets/icons/eye-password-show.svg";

import React, { useEffect, useState } from 'react';

import { validateRegisterForm } from '../../utils/registerValidator';
import { createUser } from "../../../services/api";

export default function Register({setIsLogin, toggleAlert}) {

  const [username, setUsername] = useState(" ");
  const [mail, setMail] = useState(" ");
  const [shown, setShown] = useState(false);
  const [password1, setPassword1] = useState(" ");
  const [password2, setPassword2] = useState(" ");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(()=>{
    setIsFormValid(validateRegisterForm({username, mail, password1, password2}))
  }, [username, mail, password1, password2, setIsFormValid])

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }
  const handleMail = (e) => {
    setMail(e.target.value)
  }
  const handlePassword1 = (e) => {
    setPassword1(e.target.value)
  }
  const handlePassword2 = (e) => {
    setPassword2(e.target.value)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    const userData = {
      username: username,
      email: mail,
      password: password1,
    };

    createUser(userData).then(
      res => {
        console.log(res)
        const payload = {
          isError: false,
          message: res
        }

        toggleAlert(payload)
        setIsLogin(true)
        
      }).catch (err => {
          const payload = {
            isError: true,
            message: err.response.data
          }
  
          toggleAlert(payload)
          })
      }

  return (
    <>
      <label className="titre" type="title">
        {" "}
        S'inscrire{" "}
      </label>
      <form className="register-form" onSubmit={handleOnSubmit}>
        <label htmlFor="username">Nom d'utilisateur:</label>
        <input
          id="username"
          type="input"
          onChange={handleUsername}
          placeholder="votre nom"
        />

        <label htmlFor="mail">Email:</label>
        <input
          id="mail"
          type="input"
          onChange={handleMail}
          placeholder="exemple@mail.com"
        />

        <label htmlFor="password1">Definir un mot de passe:</label>
        <div className="password-container">
          <input
            id="password1"
            type={shown ? "text" : "password"}
            onChange={handlePassword1}
            placeholder="********"
          />
          <img
            src={shown ? EyePasswordShow : EyePasswordHidden}
            className="revealer"
            onClick={() => setShown(!shown)}
          ></img>
        </div>

        <label htmlFor="password2">Retaper le mot de passe:</label>
        <div className="password-container">
          <input
            id="password2"
            type={shown ? "text" : "password"}
            onChange={handlePassword2}
            placeholder="********"
          />
          <img
            src={shown ? EyePasswordShow : EyePasswordHidden}
            className="revealer"
            onClick={() => setShown(!shown)}
          ></img>
        </div>

        <a onClick={() => {setIsLogin(true)}}>Se connecter</a>

        <span style={{ opacity: 1 }}>erreur</span>

        <div className="submit-container">
          <input
            className="submit-button"
            disabled={!isFormValid}
            type="submit"
          />
        </div>
      </form>
    </>
  );
}
