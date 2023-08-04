import io from 'socket.io-client';

let  socket = null;

export const connectToSocketServer = () => {
    socket = io("http://localhost:4000");

    socket.on("connect", ()=> {
        console.log("successfully connected with socket.io server");
        console.log(socket.id);
    })
}