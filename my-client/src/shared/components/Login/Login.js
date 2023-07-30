import React, { useEffect, useState, useRef } from "react";
import { validateLoginForm } from "../../utils/authValidator";
import { authUser } from "../../../services/api";
import { useSelector, useDispatch } from "react-redux";

import "./Login.css";
import EyePasswordHidden from "../../assets/icons/eye-password-hide.svg";
import EyePasswordShow from "../../assets/icons/eye-password-show.svg";

import { passwordTextHint } from '../../assets/texts/login';

export default function Login({setIsLogin}) {
  const [mail, setMail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [shown, setShown] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  const authSlice = useSelector(state => state.authSlice)
  const dispatch = useDispatch()

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
    
    authUser(userData).then(
      res => {
        console.log(res)
        if(res.error) {
          //affichage d'une erreur sur l'ecran
        } else {
        localStorage.setItem("userData", JSON.stringify({...res.userDetails}));

        dispatch({
          type: "authSlice/setUserCreds",
          payload: res,
        });
        }
      })

  
    }
    

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

        <a onClick={setIsLogin}>S'inscrire</a>

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
