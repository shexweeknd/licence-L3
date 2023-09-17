// store pour les utilisateurs sockets
const connectedUsers = new Map();
const connectedCams = new Map();

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
    console.log("new connected users added: ", connectedUsers)
}

const addNewConnectedCams = ({socketId, camsDetails}) => {
    connectedCams.set(socketId, camsDetails);
    console.log("new connected cams added: ", connectedCams)
}

const removeConnected = (socketId) => {
    if (connectedCams.has(socketId)) {
        connectedCams.delete(socketId)
    };

    if (connectedUsers.has(socketId)) {
        connectedUsers.delete(socketId)
    };

    console.log("connected users left: ", connectedUsers)
    console.log("connected cams left: ", connectedCams)
};

// renvoie tous les sockets utilisateurs présents
const getUsersSocketsInstances = () => {
    return connectedUsers
}

// renvoie tous les sockets cameras présents
const getCamsSocketsInstances = () => {
    return connectedCams
}

// renvoie les connections actives des utilisateurs parmi  les sockets présents
const getActiveUsersConnections = (userId) => {
    const activeConnections = [];

    connectedUsers.forEach( function (value, key) {
        if (value.userId === userId) {
            activeConnections.push(key);
        }
    })

    return activeConnections;
}

const getActiveCamsConnections = () => {
    const activeCams = [];

    connectedCams.forEach((value, key) => {
        activeCams.push(value)
    })

    return  activeCams;
}

const getCamsNameFromSocket = (socket) => {
    const socketId = socket.id;

    connectedCams.forEach((value, key) => {
        if(key == socketId){
            return value;
        }
    })
}

module.exports = {
    addNewConnectedUser,
    addNewConnectedCams,
    removeConnected,
    getUsersSocketsInstances,
    getCamsSocketsInstances,
    getActiveUsersConnections,
    getActiveCamsConnections,
    setSocketServerInstance,
    getSocketServerInstance,
    getCamsNameFromSocket
}