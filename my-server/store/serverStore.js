// store pour les utilisateurs sockets
const connectedUsers = new Map();

const addNewConnectedUser = ({socketId, userId}) => {
    connectedUsers.set(socketId, {userId});
    // console.log(connectedUsers)
}

module.exports = {
    addNewConnectedUser
}