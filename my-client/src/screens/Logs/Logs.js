import { fetchUsersData } from '../../services/api';
import { useEffect, useState } from 'react';

export default function Logs() {

  const [ data, setData ] = useState([])

  useEffect(
    () => {
      async function fetchUsers() {
        try {
          const usersData = await fetchUsersData();
          setData(usersData)
          // Effectuer le traitement des données ici
        } catch (error) {
          // Gérer l'erreur ici
        }
      }
      fetchUsers()
    },
    []
  )

  return (
    <section>
      <p>
        id: {data[0].id}
        <br />
        name: {data[0].name}
      </p>
    </section>
  );
}
