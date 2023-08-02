import "./Logs.css";
import React, { useState } from "react";

import LogsVideoContainer from "../../shared/components/LogsVideoContainer/LogsVideoContainer";
import LogsTreeContainer from "../../shared/components/LogsTreeContainer/LogsTreeContainer";

export default function Logs() {

  return (
    <section>
      <LogsVideoContainer/>
      <LogsTreeContainer/>
    </section>
  )
}
