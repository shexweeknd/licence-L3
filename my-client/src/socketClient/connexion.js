import { store } from '../store/store.js';
import { recordPeerObject, getPeer } from './webrtcPeersList.js';
import { renderCurrentStream } from '../shared/utils/streamUtils.js';

import io from 'socket.io-client';

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

    socket.on("webrtc-init", data => {
        console.log("initializing connection from camera :", data.sender)

        recordPeerObject(data.sender);

        //configuration du peer concerné
        peer = getPeer(data.sender);
        peer.on("stream", (stream) => {
            //TODO afficher le flux vidéo concerné dans l'UI
            renderCurrentStream(data.sender, stream)

        })

        socket.emit("init-accepted", {
            sender: socket.id,
            receiver: data.sender
        })
    });
 
    socket.on("webrtc-signal", ({sender, signal}) => { 
        peer.signal(signal)
    })

    socket.on("emit-camslist", async (data) => {
        console.log("update from socket connexion :", data)
        store.dispatch({
            type: "camsSlice/setConnectedCams",
            payload: data,
          });
    })
}