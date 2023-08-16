const serverStore = require("../store/serverStore.js");

const newConnectionHandler = async (socket, io) => {
    // console.log(socket)

    const userDetails = socket.user;

    serverStore.addNewConnectedUser({
        socketId: socket.id,
        userId: userDetails.userId
        }
    )
}

module.exports = newConnectionHandler;