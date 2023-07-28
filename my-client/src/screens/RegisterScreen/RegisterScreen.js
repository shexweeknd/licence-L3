import React from 'react';
import './RegisterScreen.css'
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
    <animated.div style={animation} className='auth-container'>
      <Register />
    </animated.div>
  )
}