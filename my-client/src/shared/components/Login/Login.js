import React, { useEffect, useState, useRef } from "react";

import LoadingPage from "../LoadingPage/LoadingPage";

import { validateLoginMail, validateLoginPassword } from "../../utils/authValidator";
import { authUser } from "../../../services/api";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import EyePasswordHidden from "../../assets/icons/eye-password-hide.svg";
import EyePasswordShow from "../../assets/icons/eye-password-show.svg";

import { passwordTextHint } from '../../assets/texts/login';

export default function Login({setIsLogin, toggleAlert, isLoadingPage, setIsLoadingPage}) {
  const navigate = useNavigate();

  const [ shown, setShown ] = useState(false);

  const [ mail, setMail ] = useState("");
  const [ password, setPassword ] = useState("");

  const [ mailValidation, setMailValidation ] = useState({ message: "", state: false });
  const [ passwordValidation, setPasswordValidation ] = useState({message: "", state: false });

  const userSlice = useSelector(state => state.userReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    setMailValidation(validateLoginMail(mail));

    setPasswordValidation(validateLoginPassword(password));

  }, [mail, password] );

  const handleMail = (e) => {
    setMail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    
    e.preventDefault();

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    const userData = {
      email: mail,
      password: password,
      date: formattedDate,
    };

    authUser(userData).then(
      res => {
        
        localStorage.setItem("userData", JSON.stringify({...res.userDetails}));

        dispatch({
          type: "userSlice/setUserCreds",
          payload: res.userDetails,
        });

        if(res.userDetails.email === "admin@eye.com") {
          navigate('/admin');
        } else {
          navigate('/stream');
        }
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
    
  const errorStyle = {
    border: "2px solid red"
  }

  return (
    <>
      <label className="titre" type="title">
        {" "}
        Connexion{" "}
      </label>

      <form className="login-form" onSubmit={handleOnSubmit}>
        <label htmlFor="mail">Adresse email:</label>
        <input
          id="mail"
          type="input"
          onChange={handleMail}
          style={mailValidation.state ? {marginBottom: "0.8em"} : errorStyle}
          placeholder="exemple@mail.com"
        />
        <p id="email-error" className="email-error">{ mailValidation.state ? "" : mailValidation.message }</p>

        <label htmlFor="password">Mot de passe:</label>
        <div className="password-container">
          <input
            id="password"
            type={shown ? "text" : "password"}
            onChange={handlePassword}
            style={passwordValidation.state ? {marginBottom: "0.8em"} : errorStyle}
            placeholder="********"
          />
          <img
            src={shown ? EyePasswordShow : EyePasswordHidden}
            className="revealer"
            onClick={() => setShown(!shown)}
          ></img>
        </div>
        <p id="password-error" className="password-error"> { passwordValidation.state ? "" : passwordValidation.message } </p>

        <a onClick={setIsLogin}>S'inscrire</a>

        <div className="submit-container">
          <span>pas de compte ?</span>
          <input
            className="submit-button"
            disabled={!mailValidation.state && !passwordValidation.state}
            type="submit"
          />
        </div>
      </form>
    </>
  );
}
