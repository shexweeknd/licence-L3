import { store } from "../store/store.js";
import { recordPeerObject, getPeer, closePeer } from "./webrtcPeersList.js";
import {
  renderCurrentStream,
  removeStreamFromScreen,
} from "../shared/utils/streamUtils.js";

import io from "socket.io-client";

let socket = null;
let peer = null;

export const connectToSocketServer = (UserDetails) => {
  const jwtToken = UserDetails.token;

  socket = io("http://localhost:4000", {
    auth: {
      token: jwtToken,
    },
  });

  socket.on("connect", () => {
    console.log("successfully connected with socket.io server");
    console.log(socket.id);
  });

  socket.on("webrtc-init", ({ sender }) => {
    console.log("initializing connection from camera :", sender);

    recordPeerObject(sender);

    //configuration du peer concerné
    peer = getPeer(sender);

    peer.on("signal", (signal) => {
      socket.emit("webrtc-signal", {
        signal: signal,
        receiver: sender,
      });
    });

    peer.on("stream", (stream) => {
      console.log(`peer connexion  from ${sender} sucess, now streaming...`)

      // afficher le flux vidéo concerné dans l'UI
      renderCurrentStream(sender, stream).then(response => {
        console.log(response)
      });
    });

    peer.on("close", async () => {
      //todo remove srcObject stream
      await removeStreamFromScreen(sender).then((success) => {
        console.log(success);
        //delete peer object from list
        closePeer(sender);
        peer = null
      });
    });

    peer.on("error", async () => {
      console.error("Une erreur est soudainement survenue");
      await removeStreamFromScreen(sender).then((success) => {
        console.log("sucess... : " , success)
      });
    });

    // envoi de l'event "init-accepted"
    socket.emit("init-accepted", {
      sender: socket.id,
      receiver: sender,
    });
  });

  socket.on("webrtc-signal", ({ sender, signal }) => {
    console.log(`signal ${signal} received from : ${sender}`);
    peer.signal(signal);
  });

  socket.on("webrtc-stop", async ({sender}) => {
    console.log(`...stopping signal received from : ${sender} , destroying peer`)
    closePeer(sender)
    peer = null

    await removeStreamFromScreen({socketId: sender}).then(() => {
      socket.emit("webrtc-stop-ack", {
        receiver: sender
      })
    })
  })

  socket.on("emit-camslist", async (data) => {
    console.log("update from socket connexion :", data);
    store.dispatch({
      type: "camsSlice/setConnectedCams",
      payload: data,
    });
  });
};
