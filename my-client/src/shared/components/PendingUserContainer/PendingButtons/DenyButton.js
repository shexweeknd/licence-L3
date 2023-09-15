import React from 'react';
import './style.css';

export default function DenyButton({onClick}) {
  return (
    <div onClick={onClick} className='icon-container'>❌</div>
  )
}
