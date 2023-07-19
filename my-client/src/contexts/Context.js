import React, { createContext, useState, useEffect } from "react";
import { fetchData } from "../services/api";

const SurveillanceContext = createContext({
  data: [],
  currentSalle: "",
  setCurrentSalle: () => {}, // Fonction fictive initiale
});

export const SurveillanceContextProvider = ({ children }) => {

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
    <SurveillanceContext.Provider value={{ data, currentSalle, setCurrentSalle }}>
      {children}
    </SurveillanceContext.Provider>
  );
};

//ecran log datas

const LogsContext = createContext({
  data: [],
});

export const LogsContextProvider = ({ children }) => {

  const [ data, setData ] = useState([])

  useEffect(() => {
    async function fetchQuery() {
      try {
        const arrayData = await fetchData('/api/logsdata');
        setData(arrayData)
        console.log(arrayData)
        // Effectuer le traitement des données ici
      } catch (error) {
        // Gérer l'erreur ici
      }
    }
    fetchQuery()
  },
  [])

  return (
    <LogsContext.Provider value={ {...data[0]} }>
      {children}
    </LogsContext.Provider>
  );
};


export { SurveillanceContext, LogsContext };