import './IpContainer.css'
import React from 'react';

import RefreshButton from './RefreshButton';

function IpContainer() {

  return (
    <div className="IP-container" style={{display: "inline-flex"}}>
  
        <div className="IP-object">
          <div className="voyant active"></div>
          <div className="IP-label">
            <p className="room-name">Nom: Informatique</p>
            <p className="room-ip">IP: 127.0.0.1</p>
          </div>
        </div>
        
        <div className="IP-object">
          <div className="voyant"></div>
          <div className="IP-label">
            <p className="room-name">Nom: Amphithéatre</p>
            <p className="room-ip">IP: 127.0.0.1</p>
          </div>
        </div>        
        
        <div className="IP-object">
          <div className="voyant"></div>
          <div className="IP-label">
            <p className="room-name">Nom: salle 16</p>
            <p className="room-ip">IP: 127.0.0.1</p>
          </div>
        </div>        
        
        <div className="IP-object">
          <div className="voyant"></div>
          <div className="IP-label">
            <p className="room-name">Nom: Laboratoire</p>
            <p className="room-ip">IP: 127.0.0.1</p>
          </div>
        </div>
      
    </div>
  );
}

export default IpContainer;
