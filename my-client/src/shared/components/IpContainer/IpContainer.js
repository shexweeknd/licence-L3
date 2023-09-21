import './IpContainer.css'
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from "react-redux";

import RefreshButton from './RefreshButton';

function IpContainer() {

  const [currentSalle, setCurrentSalle] = useState("")

  const arrayData = useSelector(state => state.webrtcReducer.salles)

  const handleClick = (salle) => {
    setCurrentSalle(currentSalle)
  }

  return (
    <div className="IP-container" style={{display: "inline-flex"}}>
      {arrayData.length >> 0 ? arrayData.map((raspberry) => (
        <div
          className="IP-object"
          onClick={() => handleClick(raspberry.salle)}
          key={raspberry.salle}
        >
          <div className={raspberry.salle === currentSalle ? "voyant active" : "voyant"}></div>
          <div className="IP-label">
            <p className="room-name">Nom: {raspberry.salle}</p>
            <p className="room-ip">IP: 127.0.0.1</p>
          </div>
        </div>
      )) : <></> }
    </div>
  );
}

export default IpContainer;
