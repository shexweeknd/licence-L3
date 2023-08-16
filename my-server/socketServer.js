const authSocket = require("./middleware/authSocket.js");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler.js");

const registerSocketServer = (server) => {
    const io = require("socket.io")(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        }
    });

    io.use((socket, next) => {
        authSocket(socket, next);
    })

    io.on("connection", (socket) => {
        console.log("user connected");
        console.log(socket.id);

        //fonctions pour enregistrer les ids de la connection socket entrante
        newConnectionHandler(socket, io);
    })
}

module.exports = {
    registerSocketServer,
}