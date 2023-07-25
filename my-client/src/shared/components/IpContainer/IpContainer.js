import './IpContainer.css'
import { SurveillanceContext } from '../../../contexts/Context.js'
import React, { useContext } from 'react'

function IpContainer() {
  const { data, currentSalle, setCurrentSalle } = useContext(SurveillanceContext);

  const handleClick = (salle) => {
    setCurrentSalle(salle);
  };

  return (
    <div className="IP-container">
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
