import React, { useEffect, useState, useRef } from "react";
import { validateLoginForm } from "../../utils/authValidator";
import { authUser } from "../../../services/api";
import axios from 'axios';

import "./Login.css";
import EyePasswordHidden from "../../assets/icons/eye-password-hide.svg";
import EyePasswordShow from "../../assets/icons/eye-password-show.svg";

import { passwordTextHint } from '../../assets/texts/login';

export default function Login() {
  const [mail, setMail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [shown, setShown] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  const span = useRef();

  useEffect(() => {
    setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);

  const handleMail = (e) => {
    setMail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: mail,
      password: password,
    };
    let res = authUser(userData)

    console.log(res)
  };

  return (
    <>
      <label className="titre" type="title">
        {" "}
        Connexion{" "}
      </label>
      <form className="login-form" onSubmit={handleOnSubmit}>
        <label htmlFor="mail">Identifiant:</label>
        <input
          id="mail"
          type="input"
          onChange={handleMail}
          placeholder="exemple@mail.com"
        />

        <label htmlFor="password">Mot de passe:</label>
        <div className="password-container">
          <input
            id="password"
            type={shown ? "text" : "password"}
            onChange={handlePassword}
            placeholder="********"
          />
          <img
            src={shown ? EyePasswordShow : EyePasswordHidden}
            className="revealer"
            onClick={() => setShown(!shown)}
          ></img>
        </div>

        <a href="Register">S'inscrire</a>

        <span style={{ opacity: 1 }} ref={span}></span>

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
