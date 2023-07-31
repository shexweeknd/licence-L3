import React, {useEffect, useState} from "react";
import "./Alert.css";
import Succeed from '../../assets/icons/succeed.png';
import Warning from '../../assets/icons/warning.png';

export default function ({toggleAlert, payload}) {

    useEffect(()=>{
        setTimeout(()=>{
            const box = document.getElementById('alert-container')
            box.style.display = 'none'
        }, 2000);
        toggleAlert()
    }, [])

  return (
      <div className={payload.isError ? "alert-container error" : "alert-container"} id='alert-container'>
        <img src={payload.isError ? Warning : Succeed }/>
        <span>{payload.message}</span>
      </div>
  );
}
