import { store } from '../store/store.js';
import { recordPeerObject, getPeer } from './webrtcPeersList.js';
import { renderCurrentStream } from '../shared/utils/streamUtils.js';

import io from 'socket.io-client';
import { removeSocketFromRedux } from '../shared/utils/streamUtils.js';

let socket = null;
let peer = null

export const connectToSocketServer = ( UserDetails ) => {
    const jwtToken = UserDetails.token

    socket = io("http://localhost:4000", {
        auth: {
            token: jwtToken,
        }
    });

    socket.on("connect", () => {
        console.log("successfully connected with socket.io server");
        console.log(socket.id);
    })

    socket.on("webrtc-init", ({sender}) => {
        console.log("initializing connection from camera :", sender)

        recordPeerObject(sender);

        renderCurrentStream(sender);

        //configuration du peer concerné
        peer = getPeer(sender);

        peer.on("signal", (signal) => {
            socket.emit("webrtc-signal", {
              signal: signal,
              receiver: sender,
            });
          });

        peer.on("stream", (stream) => {
            //TODO afficher le flux vidéo concerné dans l'UI
            const video = document.getElementById(sender)

            console.log("streaming sur le container :", video)
            video.srcObject = stream
        })

        peer.on("close", () => {
            console.log("close event called")
        })

        // envoi de l'event "init-accepted"
        socket.emit("init-accepted", {
            sender: socket.id,
            receiver: sender,
        });

    });
 
    socket.on("webrtc-signal", ({sender, signal}) => {
        console.log(`signal ${signal} received from : ${sender}`);
        peer.signal(signal)
    })

    socket.on("webrtc-stop", ({sender}) => {
        console.log("stoping webrtc signal received from : ", sender)

        //revome socketId from redux state
        removeSocketFromRedux({socketId: sender})

        //TODO close peer connexion

        socket.emit("webrtc-stop-ack", {receiver: sender})
    })

    socket.on("emit-camslist", async (data) => {
        console.log("update from socket connexion :", data)
        store.dispatch({
            type: "camsSlice/setConnectedCams",
            payload: data,
          });
    })
}