import React, { useEffect, useState } from 'react';
import "./UserListContainer.css";

import { getUsers } from "../../../services/api.js";
import { deleteFromRecord } from "../../../services/api.js";

export default function UserListContainer() {
  const [values, setValues] = useState([])
  const [isReady, setIsReady] = useState(false);

  const changeValue = (entry) => {
    setValues(entry);
    setIsReady(true);
  }

  //mise à jour des states 
  const remove = async (user) => {
    deleteFromRecord(user);
    await getUsers().then(response => changeValue(response));
  }

  useEffect(() => {
    async function queryRegisteredUsers() {

      return await getUsers()
    };

    queryRegisteredUsers().then(response => {
      changeValue(response);
    })
  }, [])

  return (
    <>
        <div className='table-container'>
          <div className='table-header'>
              <p>_id</p>
              <p>username</p>
              <p>email</p>
              <p>last connected</p>
          </div>

          <div className='table-body'>
             {isReady && values.length >= 1 ?
              values.map((item) => (
                <div key={item._id} className='table-row'>
                  <p>{item._id}</p>
                  <p>{item.username}</p>
                  <p>{item.email}</p>
                  <p>{item.connected}</p>
                  <span onClick={() => remove(item)}>🗑️</span>
                </div>
              )):
              <></>
              }
          </div>
        </div>
    </>
  )
}
