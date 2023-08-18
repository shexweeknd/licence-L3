import React, { createContext, useState, useEffect, useContext } from "react";
import { fetchData } from "../services/api.js";

const NavContext = createContext({
  listed: true,
  setListed: () => {},
})

export const NavContextProvider = ({ children }) => {
  const [listed, setListed] = useState(true);

  return (
    <NavContext.Provider value={{ listed, setListed }}>
      {children}
    </NavContext.Provider>
  )
}

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
        const arrayData = await fetchData('/api/cams/getcams');
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

  const [ metaData, setMetaData ] = useState([])

  useEffect(() => {
    async function fetchQuery() {
      try {

        const arrayMetaData = await fetchData('/api/logs/metadata/video');
        setMetaData(arrayMetaData)

      } catch (error) {
        // Gérer l'erreur ici
      }
    }
    fetchQuery()
  },
  [])

  return (
    <LogsContext.Provider value={ {...metaData[0]} }>
      {children}
    </LogsContext.Provider>
  );
};

const LogsTreeContext = createContext({
  data: [],
});

export const LogsTreeContextProvider = ({ children }) => {

  const [ treeData, setTreeData ] = useState([])

  useEffect(() => {
    async function fetchQuery() {
      try {
        const arrayTreeData = await fetchData('/api/logs/treedata');
        setTreeData(arrayTreeData)

      } catch (error) {
        // Gérer l'erreur ici
      }
    }
    fetchQuery()
  },
  [])

  return (
    <LogsTreeContext.Provider value={ {...treeData[0]} }>
      {children}
    </LogsTreeContext.Provider>
  );
};



export { SurveillanceContext, LogsContext, NavContext };