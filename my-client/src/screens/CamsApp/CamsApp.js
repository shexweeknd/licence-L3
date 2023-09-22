import React, { useState, useRef } from "react";
import "./CamsApp.css";

import io from "socket.io-client";
import axios from "axios";
import Peer from "simple-peer";

// api pour l'authentification
const API = axios.create({
  baseURL: "http://localhost:4000", // Remplace cette URL par l'URL réelle de ton API
  timout: 1000,
});

let jwtToken = null
let socket = null
let peerCam = null
let mediaRecorder = null
let date = null
let recordingInterval = null

export default function CamsApp() {
  const [starting, setStarting] = useState(false);
  const [stream, setStream] = useState(null);

  const videoRef = useRef(null);

  const sendData = async (salle, newStream) => {
    
    const data = {
        salle: salle,
        key: "camera123"
    }

    const res = await API.post("/api/cams/integrate", data);

    jwtToken = res.data.camsDetails.token;

    if (res.status === 202) {
      //initie la connection socket
        socket = io("http://localhost:4000", {
        auth: {
          token: jwtToken,
        },
      });

      const verifySocketConnexion = () => {
        return new Promise((resolve) => {
          const verifier = () => {
            if (socket.connected) {
              resolve();
            } else {
              setTimeout(verifier, 1000); // Réessayez chaque seconde
            }
          };
          verifier();
        });
      };

      await verifySocketConnexion()
      
      socket.emit("webrtc-init");

      socket.on("init-accepted", data => {

        console.log("init accepted, creating peer obj and sending signals")
        const sender = data.sender;
        // creation du peer object
        peerCam = new Peer({
          initiator: true,
          config: {
            iceServers: [
              {
                urls: "stun:numb.viagenie.ca",
                username: "sultan1640@gmail.com",
                credential: "98376683",
              },
              {
                urls: "turn:numb.viagenie.ca",
                username: "sultan1640@gmail.com",
                credential: "98376683",
              },
            ],
          },
          stream: newStream,
        });

        peerCam.on("signal", (signal) => {

          if(socket.connected) {
              socket.emit("webrtc-signal", {
                signal: signal,
                receiver:  sender,
              });
              
              console.log("signal emited", signal)
          }
        });

        peerCam.on("connected", () => {
          console.log("connected successfully")
        })
      })

      socket.on("webrtc-signal", ({sender, signal}) => {
        peerCam.signal(signal);
        console.log("signaux provenant de ", sender, " enregistrés")
      });

      socket.on("connect", () => {
        console.log("successfully added to socket.io server");

        console.log(socket.id);
      });

      socket.on("emit-camslist", async (data) => {
        console.log(data);
      });

      //sauvegarde des vidéos 
      // Créez un MediaRecorder avec le MediaStream
      mediaRecorder = new MediaRecorder(newStream, { timeslice: 2000 });

      socket.emit("start-recording",{salle, date: new Date()});

      console.log("objet mediarecorder : ", mediaRecorder)

      // Événement lorsqu'un morceau de données est disponible
      mediaRecorder.ondataavailable = (event) => {
        console.log("sending blob to server....", event.data)
        if (event.data.size > 0) {
          socket.emit("recording", {
            dataSize: event.data.size,
            fragment: event.data,
          })
        }
      };

      // Commencez l'enregistrement
      mediaRecorder.start();

      // Boucler l'enregistrement
      recordingInterval = setInterval(function () {
        mediaRecorder.requestData();
      }, 2000); // 1 secondes

    }
  };

  const handleClick = () => {
    const p = document.getElementById("text-container");
    const button = document.getElementById("start");

    if (starting) {
      // Arrêt de la surveillance
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        setStream(null);
        videoRef.current.srcObject = null;

        //arrêt du mediaStream et envoi du dernier chunk
        mediaRecorder.stop();
        socket.emit("stop-recording", new Date())
        clearInterval(recordingInterval);
      }

      // envoi d'un signal d'arrêt au server node
      socket.close()

      let salleName = document.getElementById("salle");
      salleName.disabled = false;

      p.textContent = "surveillance stoppée";
      button.textContent = "commencer";
    } else {
      // Démarrage de la surveillance
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: 720,
            height: 480
          },
          audio: false,
        })
        .then(function (newStream) {
          setStream(newStream);
          let salleName = document.getElementById("salle");

          salleName.disabled = true;

          // envoi du signal d'ajout de camera dans le store du serveur node
          sendData(salleName.value, newStream);

          videoRef.current.srcObject = newStream;
          videoRef.current.play();
        })
        .catch(function (error) {
          console.error("Erreur lors de l'accès à la caméra :", error);
        });

      p.textContent = "en cours de surveillance...";
      button.textContent = "arrêter";
    }

    setStarting(!starting);
  };

  return (
    <div className="camsapp-container">
      <p id="text-container">surveillance stoppée</p>
      <input type="text" id="salle" placeholder="nom de la salle"></input>
      <video
        ref={videoRef}
        controls
        id="video"
        className="localstream-container"
      ></video>
      <div className="start-button" id="start" onClick={handleClick}>
        {starting ? "arrêter" : "commencer"}
      </div>
    </div>
  );
}