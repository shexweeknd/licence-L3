const authSocket = require("./middleware/authSocket.js");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler.js");
const disconnectHandler = require('./socketHandlers/disconnectHandler.js');
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

    io.use((socket, next) => {
        authSocket(socket, next);
    })

    io.on("connection", (socket) => {
        console.log("user connected");
        console.log(socket.id);

        //fonctions pour enregistrer les ids de la connection socket entrante
        newConnectionHandler(socket, io);

        //fonction appelé lors de la déconnexion d'un socket
        socket.on('disconnect', () => {
            disconnectHandler(socket);
        })
    })
}

module.exports = {
    registerSocketServer,
}