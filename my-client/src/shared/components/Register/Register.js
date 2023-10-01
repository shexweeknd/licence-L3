import './Register.css';
import EyePasswordHidden from "../../assets/icons/eye-password-hide.svg";
import EyePasswordShow from "../../assets/icons/eye-password-show.svg";

import React, { useEffect, useState } from 'react';

import { validateRegisterUsername, validateRegisterMail, validateRegisterPassword1, validateRegisterPassword2 } from '../../utils/registerValidator';
import { createUser } from "../../../services/api";

export default function Register({setIsLogin, toggleAlert, isLoadingPage, setIsLoadingPage}) {

  const [shown, setShown] = useState(false);

  const [username, setUsername] = useState(" ");
  const [mail, setMail] = useState(" ");
  const [password1, setPassword1] = useState(" ");
  const [password2, setPassword2] = useState(" ");

  const [usernameValidation, setUsernameValidation] = useState({message: "", state: false})
  const [mailValidation, setMailValidation] = useState({message: "", state: false})
  const [password1Validation, setPassword1Validation] = useState({message: "", state: false})
  const [password2Validation, setPassword2Validation] = useState({message: "", state: false})

  useEffect(()=>{
    setUsernameValidation(validateRegisterUsername(username));
    setMailValidation(validateRegisterMail(mail));
    setPassword1Validation(validateRegisterPassword1(password1));
    setPassword2Validation(validateRegisterPassword2(password1, password2));

  }, [username, mail, password1, password2])

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

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    setIsLoadingPage(true);

    const userData = {
      username: username,
      email: mail,
      password: password1,
    };

    await createUser(userData).then(
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

    setIsLoadingPage(false);
  }

  const errorStyle = {
    border: "2px solid red"
  }
  
  return (
    <>
      <label className="titre" type="title">
        {" "}
        S'inscrire{" "}
      </label>
      <form className="register-form" disabled={isLoadingPage} onSubmit={handleOnSubmit}>
        <label htmlFor="username">Nom d'utilisateur:</label>
        <input
          id="username"
          type="input"
          onChange={handleUsername}
          style={usernameValidation.state ? {marginBottom: "0.8em"} : errorStyle}
          placeholder="votre nom"
        />
        <p className='error-message'>{ usernameValidation.state ? "" : usernameValidation.message }</p>

        <label htmlFor="mail">Email:</label>
        <input
          id="mail"
          type="input"
          onChange={handleMail}
          style={mailValidation.state ? {marginBottom: "0.8em"} : errorStyle}
          placeholder="exemple@mail.com"
        />
        <p className='error-message'>{ mailValidation.state ? "" : mailValidation.message }</p>

        <label htmlFor="password1">Definir un mot de passe:</label>
        <div className="password-container">
          <input
            id="password1"
            type={shown ? "text" : "password"}
            onChange={handlePassword1}
            style={password1Validation.state ? {marginBottom: "0.8em"} : errorStyle}
            placeholder="********"
          />
          <img
            src={shown ? EyePasswordShow : EyePasswordHidden}
            className="revealer"
            onClick={() => setShown(!shown)}
          ></img>
        </div>
        <p className='error-message'>{ password1Validation.state ? "" : password1Validation.message }</p>

        <label htmlFor="password2">Retaper le mot de passe:</label>
        <div className="password-container">
          <input
            id="password2"
            type={shown ? "text" : "password"}
            onChange={handlePassword2}
            style={password2Validation.state ? {marginBottom: "0.8em"} : errorStyle}
            placeholder="********"
          />
          <img
            src={shown ? EyePasswordShow : EyePasswordHidden}
            className="revealer"
            onClick={() => setShown(!shown)}
          ></img>
        </div>
        <p className='error-message'>{ password2Validation.state ? "" : password2Validation.message }</p>

        <a onClick={() => {setIsLogin(true)}}>Se connecter</a>

        <span style={{ opacity: 1 }}>erreur</span>

        <div className="submit-container">
          <input
            className="submit-button"
            disabled={!(usernameValidation.state && mailValidation.state && password2Validation.state)}
            type="submit"
          />
        </div>
      </form>
    </>
  );
}
