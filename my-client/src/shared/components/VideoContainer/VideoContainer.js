import "./VideoContainer.css";
import { useTrail, animated } from "react-spring";
import NotFound from "./NotFound.js";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";

function VideoContainer({ currentSalle, containerIds }) {
  //animation
  const trail = useTrail(4, {
    from: {
      opacity: 0,
      x: 20,
      y: 20,
    },
    to: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  });

  let salles = useSelector((state) => state.webrtcReducer.salles);

  return (
    <div className="videos-container">
      {salles.length >> 0 ? (
        salles.map((element, index) => (
          <div id={element.salle} style={{ width: "100%", height: "100%", display: currentSalle === element.salle ? "grid" : "none"}}>
            {element.socketId.map((socket, index) => (
              // <animated.div
              //   className="item"
              //   key={uuidv4()}
              //   style={trail[index]}
              // >
              //   <video id={socket} ></video>
              // </animated.div>

              <div className="item">
                <video id={socket}></video>
              </div>
            ))}
          </div>
        ))
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default VideoContainer;
