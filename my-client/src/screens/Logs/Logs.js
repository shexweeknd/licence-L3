import "./Logs.css";
import React, { useEffect } from "react";

import LogsVideoContainer from "../../shared/components/LogsVideoContainer/LogsVideoContainer";
import LogsTreeContainer from "../../shared/components/LogsTreeContainer/LogsTreeContainer";

export default function Logs() {
  useEffect(() => {
    //ajoute une fonctionnalité qui verifie le token vers le côté serveur
  }, []);

  return (
    <section>
      <LogsVideoContainer />
      <LogsTreeContainer />
    </section>
  );
}
