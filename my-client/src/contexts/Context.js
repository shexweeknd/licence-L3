import React, { createContext, useState, useEffect } from "react";
import { fetchData } from "../services/api";

const Contexte = createContext({
  data: [],
  currentSalle: "",
  setCurrentSalle: () => {}, // Fonction fictive initiale
});

export const ContexteProvider = ({ children }) => {

  const [ data, setData ] = useState([])
  const [ currentSalle, setCurrentSalle ] = useState('');

  useEffect(() => {
    async function fetchQuery() {
      try {
        const arrayData = await fetchData('/api/rooms');
        setData(arrayData)
        setCurrentSalle(arrayData[0].salle)
        // Effectuer le traitement des données ici
      } catch (error) {
        // Gérer l'erreur ici
      }
    }
    fetchQuery()
  },
  [])

  return (
    <Contexte.Provider value={{ data, currentSalle, setCurrentSalle }}>
      {children}
    </Contexte.Provider>
  );
};

export default Contexte;
