import React, { useState } from 'react';
import './Auth.css';
import VideoBackground from '../../shared/assets/animated/background.mp4'
import {useSpring, animated} from "@react-spring/web";
import Login from '../../shared/components/Login/Login.js';
import Register from '../../shared/components/Register/Register.js';

export default function Auth() {

  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => {
    setIsLogin(!isLogin)
  }

  const loginAnimation = useSpring({
    from: {
      opacity: 0,
      x: -50
    },
    to: {
      opacity: 1,
      x: 0
    },
  })

  const registerAnimation = useSpring({
    from: {
      opacity: 0,
      x: 50
    },
    to: {
      opacity: 1,
      x: 0
    },
  })

  return (
    <>
    <video muted loop autoplay>
      <source src={VideoBackground} type="video/mp4"/>
    </video>
    <div className={isLogin ? 'login-container' : 'register-container'}>
      {isLogin ? <Login setIsLogin={toggleLogin}/> : <Register setIsLogin={setIsLogin}/>}
    </div>
    </>
    
  )
}
