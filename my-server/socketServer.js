const authSocket = require("./middleware/authSocket.js");

const newConnectionHandler = require("./socketHandlers/newConnectionHandler.js");
const disconnectHandler = require('./socketHandlers/disconnectHandler.js');
const webrtcSignalHandler = require ("./socketHandlers/webrtcSignalHandler.js")
const webrtcInitHandler = require ("./socketHandlers/webrtcInitHandler.js")
const webrtcStopHandler = require ("./socketHandlers/webrtcStopHandler.js")
const emitToEveryUsers = require("./socketHandlers/emitToEveryUsers.js")
const { startRecordingHandler, stopRecordingHandler } = require("./socketHandlers/recordingHandler.js")
const { recordingHandler } = require("./socketHandlers/recordingHandler.js")


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
            webrtcInitHandler({
                io: io,
                socketId: socket.id
            })
        })

        socket.on("init-accepted", ({sender, receiver}) => {
            io.to(receiver).emit("init-accepted", {
                sender: sender
            })
        })

        socket.on("webrtc-signal", data => {
            webrtcSignalHandler({
                io: io,
                sender: socket.id,
                receiver: data.receiver,
                signal: data.signal,
            })
        })

        socket.on("webrtc-stop", () => {
            webrtcStopHandler({
                io: io,
                socketId: socket.id
            })
        })

        socket.on("webrtc-stop-ack", ({receiver}) => {
            io.to(receiver).emit("webrtc-stop-ack", {
                sender: socket.id
            })
        })

        //----------------recording-------------
        socket.on("start-recording", ({salle, date}) => {
            startRecordingHandler(salle, date);
        })
        
        socket.on("recording", ({dataSize, fragment}) => {
            recordingHandler({dataSize, fragment});
        })

        socket.on("stop-recording", (date) => {
            stopRecordingHandler(date)
        })
        //----------------recording-------------

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