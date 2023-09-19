import './NotFound.css';
import NotFoundGif from './gifs/snake.gif';
import React from 'react';

export default function NotFound() {
  return (
    <div className='notfound-container'>
      <div className="image-container">
        <img src = {NotFoundGif} />
      </div>
      <p><strong>Aucune caméra connectée</strong><br/>
        Veuillez patienter ou rafraichir la page</p>
    </div>
  )
}
