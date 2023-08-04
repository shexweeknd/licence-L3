import React, { useEffect, useState, useRef } from "react";

import LoadingPage from "../LoadingPage/LoadingPage";

import { validateLoginForm } from "../../utils/authValidator";
import { authUser } from "../../../services/api";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import EyePasswordHidden from "../../assets/icons/eye-password-hide.svg";
import EyePasswordShow from "../../assets/icons/eye-password-show.svg";

import { passwordTextHint } from '../../assets/texts/login';

export default function Login({setIsLogin, toggleAlert, isLoadingPage, setIsLoadingPage}) {
  const navigate = useNavigate();

  const [mail, setMail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [shown, setShown] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  const userSlice = useSelector(state => state.userReducer)
  const dispatch = useDispatch()

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

    setIsLoadingPage(true)
    
    e.preventDefault();

    const userData = {
      email: mail,
      password: password,
    };

    authUser(userData).then(
      res => {
        
        localStorage.setItem("userData", JSON.stringify({...res.userDetails}));

        dispatch({
          type: "userSlice/setUserCreds",
          payload: res.userDetails,
        });

        navigate('/stream');
        }

      ).catch(err => {

        const payload = {
          isError: true,
          message: err.response.data
        }

        toggleAlert(payload)
        });
      
      setIsLoadingPage(false)
      
    }
    

  return (
    <>
      <label className="titre" type="title">
        {" "}
        Connexion{" "}
      </label>

      <form className="login-form" disabled={isLoadingPage} onSubmit={handleOnSubmit}>
        <label htmlFor="mail">Adresse email:</label>
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
