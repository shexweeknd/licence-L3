import React from 'react';
import "./Admin.css"

export default function Hello() {
  return (
    <>
      <section className='admin-section'>
        <p>Demandes d'inscription en attente:</p>
        <div className='pending-list-container'></div>
        <p>Liste des utilisateurs:</p>
        <div className='table-container'></div>
      </section>
    </>
  )
}
