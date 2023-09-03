import './RefreshButton.css';
import RefreshIcon from './icons/refresh-icon-removed.png';
import React from 'react';

export default function RefreshButton({callApiForCams}) {
  return (
    <div className="refresh-button-container">
        <div className="refresh-button">
            <img style = {{cursor: "pointer"}} onClick={ callApiForCams } className="refresh-button-icon" src = {RefreshIcon}/>
        </div>
        <p>raffraichir</p>
    </div>
  )
}
