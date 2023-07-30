import React, { useState } from 'react';
import './Auth.css';
import VideoBackground from '../../shared/assets/animated/background.mp4'
import Login from '../../shared/components/Login/Login.js';
import Register from '../../shared/components/Register/Register.js';

export default function Auth() {

  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => {
    setIsLogin(!isLogin)
  }

  return (
    <>
    <video muted loop autoPlay>
      <source src={VideoBackground} type="video/mp4"/>
    </video>
    <div className={isLogin ? 'login-container' : 'register-container'}>
      {isLogin ? <Login setIsLogin={toggleLogin}/> : <Register setIsLogin={setIsLogin}/>}
    </div>
    </>
    
  )
}
