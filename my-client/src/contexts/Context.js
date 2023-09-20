import React, { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
  setCurrentSalle: () => {},
});

export const SurveillanceContextProvider = ({ children }) => {

  const [ data, setData ] = useState([])
  const [ currentSalle, setCurrentSalle ] = useState('');

  const arrayData = useSelector(state => state.camsReducer).connectedCams

  console.log("arrayData reçu du contexte:" ,arrayData , "avec la taille :", arrayData.length)

  useEffect ( () => {
    async function firstApiCall() {
      if (data.length === 0) {
        //Appel API une seule fois
        const temp = await fetchData("/api/cams/getcams");
        console.log("premier appel API", data)

        if (temp.length >> 0) {
          setData(temp);
          setCurrentSalle(temp[0].salle)
        }
      }
    }
    firstApiCall();
  }, [])

  setInterval(() => {
    if (data.length !== 0 && arrayData.length !== 0) {
      try {
        setData(arrayData);
      } catch (error) {
        console.log("erreur de gestion des camlist", error)
      }
    }
    
  }, 5000)


  return (
    <SurveillanceContext.Provider value={{ data, setData,
    currentSalle, setCurrentSalle }}>
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

  async function setQuery() {
    try {
      const url = document.getElementsById("video-player").src;

      const regex = /=([^&]+)$/;
      const match = url.match(regex);

      await fetchData('/api/journaux/metadata', {file: match ? match[1] : ""}).then(response => {
        console.log("metaData reçu: ", metaData)
        setMetaData(response.data)
      })

    } catch (error) {
      // Gérer l'erreur ici
    }
  }

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
    async function setQuery() {
      try {
        const arrayTreeData = await fetchData('/api/logs/treedata');
        setTreeData(arrayTreeData)

      } catch (error) {
        // Gérer l'erreur ici
      }
    }
    setQuery()
  },
  [])

  return (
    <LogsTreeContext.Provider value={ {...treeData[0]} }>
      {children}
    </LogsTreeContext.Provider>
  );
};



export { SurveillanceContext, LogsContext, NavContext };