import React from 'react';
import AcceptButton from './PendingButtons/AcceptButton';
import DenyButton from './PendingButtons/DenyButton';
import './PendingUserContainer.css';

export default function PendingUserContainer() {
  return (
    <div className='pending-object'>
        <p id="username" className='username'></p>
        <AcceptButton/>
        <DenyButton/>
    </div>
  )
}
