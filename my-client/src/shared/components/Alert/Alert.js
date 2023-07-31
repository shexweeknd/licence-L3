import React, {useEffect, useState} from "react";
import "./Alert.css";
import Succeed from '../../assets/icons/succeed.png';
import Warning from '../../assets/icons/warning.png';

export default function ({setIsAlert, payload}) {

    useEffect(()=>{
        setTimeout(async  () => {
            const box = document.getElementById('alert-container')
            box.style.opacity = 0
            box.style.display = 'none'
            await setIsAlert(false)
        }, 2000);
    }, [])

  return (
      <div className={payload.isError ? "alert-container error" : "alert-container"} id='alert-container'>
        <img src={payload.isError ? Warning : Succeed }/>
        <span>{payload.message}</span>
      </div>
  );
}
