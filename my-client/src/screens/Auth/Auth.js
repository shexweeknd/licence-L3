import React from 'react';
import './Auth.css';
import {useSpring, animated} from "@react-spring/web";
import Login from '../../shared/components/Login/Login.js';

export default function Auth() {
  const animation = useSpring({
    from: {
      opacity: 0,
      x: -50
    },
    to: {
      opacity: 1,
      x: 0
    },
  })

  return (
    <animated.div style={animation} className='auth-container'>
      <Login />
    </animated.div>
  )
}
