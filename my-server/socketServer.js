const authSocket = require("./middleware/authSocket.js");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler.js");
const disconnectHandler = require('./socketHandlers/disconnectHandler.js');
const webrtcSignalHandler = require ("./socketHandlers/webrtcSignalHandler.js")
const webrtcInitHandler = require ("./socketHandlers/webrtcInitHandler.js")

const emitToEveryUsers = require("./socketHandlers/emitToEveryUsers.js")
const serverStore = require("./store/serverStore.js")

const registerSocketServer = (server) => {
    const io = require("socket.io")(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        }
    });

    // stocker le io objet dans le store
    serverStore.setSocketServerInstance(io)

    //utilisation de middleware pour authentification avant de créer le socket
    io.use((socket, next) => {
        authSocket(socket, next);
    })

    io.on("connection", (socket) => {
        console.log("calling for connection");
        console.log(socket.id);

        //fonctions pour enregistrer les ids de la connection socket des users entrants
        newConnectionHandler(socket, io);

        emitToEveryUsers('emit-camslist', socket, io)

        //fonctions appelés pour le webrtc
        socket.on("webrtc-init", () => {
            webrtcInitHandler(socket)
        })

        socket.on("init-accepted", ({sender, receiver}) => {
            socket.to(receiver).emit("init-accepted", {
                sender: sender
            })
        })

        socket.on("webrtc-signal", data => {
            webrtcSignalHandler(socket, data.signal)
        })

        //fonction appelé lors de la déconnexion d'un socket user/cams
        socket.on('disconnect', () => {
            disconnectHandler(socket);
            emitToEveryUsers('emit-camslist', socket, io)
        })
    });

}

module.exports = {
    registerSocketServer,
}