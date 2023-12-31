import React, { useEffect, useState} from 'react';
import AcceptButton from './PendingButtons/AcceptButton';
import DenyButton from './PendingButtons/DenyButton';
import './PendingUserContainer.css';

import { approveUser, denyUser } from '../../../services/api';

export default function PendingUserContainer({username, email, refresh}) {

  const accept = async () => {
    await approveUser({email}).then(response => {
      refresh();
    })
  }

  const deny = async () => {
    await denyUser({email}).then(response => {
      refresh();
    })
  }

  return (
    <div className='pending-object'>
        <p id="username" className='username'>{username}</p>
        <p id="email" className="email">{email}</p>
        <div className='buttons'>
          <AcceptButton onClick={()=>{
            accept()
          }}/>
          <DenyButton onClick={()=>{
            deny()
            }}/>
        </div>
    </div>
  )
}
