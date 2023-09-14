import React, { useReducer } from 'react';
import "./Admin.css";

import Loading from '../../shared/components/Loading/Loading';
import PendingUserContainer from '../../shared/components/PendingUserContainer/PendingUserContainer';

import { useState, useEffect } from 'react';

import fetchData from '../../services/api';

export default function Admin() {

  const [tableData, setTableData] = useState(null)

  useEffect(() => {
    async function queryAdminData () {
      const data = await fetchData("/admin/get-all");
      return data
    };
    setTableData(queryAdminData());
  }, [])

  return (
    <>
      <section className='admin-section'>
        <p>Demandes d'inscription en attente:</p>
        <div className='pending-list-container'>
          <PendingUserContainer list={tableData.pendingList}/>
        </div>
        <p>Liste des utilisateurs:</p>
        <table className='table-container'>
          <thead>
            <tr>
              <th>_id</th>
              <th>username</th>
              <th>email</th>
              <th>connected</th>

            </tr>
          </thead>

          <tbody>
            if (tableData.users.length()) {
              tableData.users.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.connected}</td>
                </tr>
              ))
            } else {
              <Loading/>
            }
          
          </tbody>
        </table>
      </section>
    </>
  )
}

// params {users} array , params {pendingList} array