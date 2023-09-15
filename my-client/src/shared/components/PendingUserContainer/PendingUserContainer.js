import React, { useEffect, useState} from 'react';
import AcceptButton from './PendingButtons/AcceptButton';
import DenyButton from './PendingButtons/DenyButton';
import './PendingUserContainer.css';

export default function PendingUserContainer({username, email, password }) {

  return (
    <div className='pending-object'>
        <p id="username" className='username'>{username}</p>
        <p id="email" className="email">{email}</p>
        <div className='buttons'>
          <AcceptButton/>
          <DenyButton/>
        </div>
    </div>
  )
}
