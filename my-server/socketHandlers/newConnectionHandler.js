const serverStore = require("../store/serverStore.js");

const newConnectionHandler = async (socket, io) => {
    // console.log(socket)

    const userDetails = socket.user;

    console.log(userDetails)

    serverStore.addNewConnectedUser({
        socketId: socket.id,
        userId: userDetails.userId
        }
    );

    // verifier si le socket.id ne correspond pas à celle d'une caméra puis envoie la liste des caméras connectés vers l'utilisateur
    // if (userDetails.email) {
    //     io.to(socket.id).emit('update-cam-list', {camsList: camsList ? camsList : []})
    // }
}

module.exports = newConnectionHandler;