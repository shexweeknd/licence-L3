import React from 'react';
import "./style.css";

export default function AcceptButton({onClick}) {
  return (
    <div onClick={onClick} className='icon-container'>✔️</div>
  )
}
