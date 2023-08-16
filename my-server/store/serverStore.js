// store pour les utilisateurs sockets
const connectedUsers = new Map();

const addNewConnectedUser = ({socketId, userId}) => {
    connectedUsers.set(socketId, {userId});
    console.log("actual connected users are: ", connectedUsers)
}

const removeConnectedUser = (socketId) => {
    if (connectedUsers.has(socketId)) {
        connectedUsers.delete(socketId)
    }

    console.log("actual connected users are: ", connectedUsers)

}

module.exports = {
    addNewConnectedUser,
    removeConnectedUser
}