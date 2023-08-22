import './IpContainer.css'
import { SurveillanceContext, NavContext } from '../../../contexts/Context.js'
import React, { useContext, useEffect } from 'react'

function IpContainer() {
  const { data, currentSalle, setCurrentSalle } = useContext(SurveillanceContext);

  const { listed, setListed } = useContext(NavContext);

  const handleClick = (salle) => {
    setCurrentSalle(salle);
  };

  // a corriger car le useState ne marche pas pour le display

  return (
    <div className="IP-container" style={listed ? {display: "inline-flex"} : {display: "none"}}>
      {data.map((raspberry) => (
        <div
          className="IP-object"
          onClick={() => handleClick(raspberry.salle)}
          key={raspberry.salle}
        >
          <div className={raspberry.salle === currentSalle ? "voyant active" : "voyant"}></div>
          <div className="IP-label">
            <p className="room-name">Nom: {raspberry.salle}</p>
            <p className="room-ip">IP: {raspberry.ip}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default IpContainer;
