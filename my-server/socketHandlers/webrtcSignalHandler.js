const serverStore = require("../store/serverStore.js");

const webrtcSignalHandler = (socket, signal) => {

    const usersSockets = serverStore.getUsersSocketsInstances().keys();

    for (const socketId of usersSockets) {
        socket.to(socketId).emit("webrtc-signal", {
            sender: socket.id,
            signal: signal
        })
    }

}

module.exports = webrtcSignalHandler