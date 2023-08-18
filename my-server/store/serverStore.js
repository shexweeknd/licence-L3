// store pour les utilisateurs sockets
const connectedUsers = new Map();

// obtenir le socket.io obj de manière globale dans tout le projet
let io = null;

const setSocketServerInstance = (ioInstance) => {
    io = ioInstance;
}

const getSocketServerInstance = () => {
    return io;
}

const addNewConnectedUser = ({socketId, userId}) => {
    connectedUsers.set(socketId, {userId});
    console.log("actual connected users are: ", connectedUsers)
}

const removeConnectedUser = (socketId) => {
    if (connectedUsers.has(socketId)) {
        connectedUsers.delete(socketId)
    }

    console.log("actual connected users are: ", connectedUsers)
};

const getActiveConnections = (userId) => {
    const activeConnections = [];

    connectedUsers.forEach( function (key, value) {
        if (value.userId === userId) {
            activeConnections.push(key);
        }
    })

    return activeConnections;
}

module.exports = {
    addNewConnectedUser,
    removeConnectedUser,
    getActiveConnections,
    setSocketServerInstance,
    getSocketServerInstance
}