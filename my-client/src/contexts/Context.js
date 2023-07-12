import React, { createContext, useState } from "react";

const data = [
  {
    salle: 'amphi',
    ip: '192.168.10.2',
    src: ['192.168.10.2:3000', '192.168.10.2:3001', '192.168.10.2:3002', '192.168.10.2:3003'],
    type: "video/mp4"
  },
  {
    salle: 'salle 16',
    ip: '192.168.10.3',
    src: ['192.168.10.3:3000', '192.168.10.3:3001', '192.168.10.3:3002', '192.168.10.3:3003'],
    type: "video/mp4"
  }
];

const Contexte = createContext({
  data,
  currentSalle: data[0].salle,
  setCurrentSalle: () => {} // Fonction fictive initiale
});

export const ContexteProvider = ({ children }) => {
  const [currentSalle, setCurrentSalle] = useState(data[0].salle);

  return (
    <Contexte.Provider value={{ data, currentSalle, setCurrentSalle }}>
      {children}
    </Contexte.Provider>
  );
};

export default Contexte;
