import React, { useState } from "react";
import "./Auth.css";
import VideoBackground from "../../shared/assets/animated/backgroundOrig.mp4";
import Login from "../../shared/components/Login/Login.js";
import Register from "../../shared/components/Register/Register.js";
import Alert from "../../shared/components/Alert/Alert.js";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAlert, setIsAlert] = useState(false);
  const [payload, setPayload] = useState({
    isError: false,
    message: ''
  })

  const toggleAlert = async (payload) => {
    if (payload) {
      setPayload(payload);
      setIsAlert(!isAlert);
      
      setTimeout(()=> {
        setIsAlert(!isAlert);
      }, 2000)
    }
  };

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <video muted loop autoPlay>
        <source src={VideoBackground} type="video/mp4" />
      </video>
      <div className={isLogin ? "login-container" : "register-container"}>
        {isLogin ? (
          <Login setIsLogin={toggleLogin} toggleAlert={toggleAlert} />
        ) : (
          <Register setIsLogin={setIsLogin} toggleAlert={toggleAlert}/>
        )}
      </div>
      {isAlert ? <Alert payload={{ ...payload }} setIsAlert={setIsAlert}/> : <></>}
    </>
  );
}
