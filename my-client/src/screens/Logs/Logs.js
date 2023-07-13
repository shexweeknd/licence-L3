import { fetchData } from '../../services/api';
import { useEffect, useState } from 'react';

export default function Logs() {

  const [ data, setData ] = useState([])

  useEffect(
    () => {
      async function fetchUsers() {
        try {
          const usersData = await fetchData('/api/users');
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
        id: {}
        <br />
        name: {}
      </p>
    </section>
  )
}
