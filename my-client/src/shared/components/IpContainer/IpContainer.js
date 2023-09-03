import './IpContainer.css'
import { SurveillanceContext, NavContext } from '../../../contexts/Context.js';
import { fetchData } from "../../../services/api.js";
import React, { useContext, useEffect } from 'react';
import { useSelector } from "react-redux";

import RefreshButton from './RefreshButton';

function IpContainer() {
  const { data, setData, currentSalle, setCurrentSalle } = useContext(SurveillanceContext);

  const arrayData = useSelector(state => state.camsReducer).connectedCams

  const handleClick = (salle) => {
    setCurrentSalle(salle);
  };

  const callApiForCams = async () => {
    const temp = await fetchData("/api/cams/getcams");
    console.log("apiCalledFor cameras", temp)

    if (temp.length >> 0) {
      setData(temp);
      setCurrentSalle(temp[0].salle)
    }
  };

  setInterval(callApiForCams, 5000)

  return (
    <div className="IP-container" style={{display: "inline-flex"}}>
      {data.length >> 0 ? data.map((raspberry) => (
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
      )) : <RefreshButton callApiForCams ={callApiForCams}/> }
    </div>
  );
}

export default IpContainer;
