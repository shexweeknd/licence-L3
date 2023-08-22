import { store } from '../store/store.js';

import io from 'socket.io-client';

let  socket = null;

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

    socket.on("emit-camslist", async (data) => {
        console.log(data)
        store.dispatch({
            type: "camsSlice/setConnectedCams",
            payload: data,
          });
    })
}