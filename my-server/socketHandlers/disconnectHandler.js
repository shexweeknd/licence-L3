const serverStore = require("../store/serverStore");

const disconnectHandler = (socket) => {
    serverStore.removeConnected(socket.id)
}

module.exports = disconnectHandler;