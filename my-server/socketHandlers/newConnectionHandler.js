const serverStore = require("../store/serverStore.js");

const newConnectionHandler = async (socket, io) => {

    // console.log("le socket : ", socket)

    const userDetails = socket.user;

    console.log(userDetails)

    //verification si on a une camera pour la demande de newConnectionHandler
    if (userDetails.salle) {
        serverStore.addNewConnectedCams({
            socketId: socket.id,
            camsDetails: userDetails
        })
        return null // à décommenter après les phases de test du cam-controller
    }

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