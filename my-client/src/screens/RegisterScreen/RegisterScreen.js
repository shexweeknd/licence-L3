import React from 'react';
import './RegisterScreen.css';
import VideoBackground from '../../shared/assets/animated/background.mp4'
import { useSpring, animated } from '@react-spring/web';
import Register from '../../shared/components/Register/Register.js';

export default function RegisterScreen() {
  const animation = useSpring({
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
    <animated.div style={animation} className='auth-container'>
      <Register />
    </animated.div>
    </>
  )
}