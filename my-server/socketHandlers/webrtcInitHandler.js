const serverStore = require("../store/serverStore.js");

const webrtcInitHandler = (socket) => {

    const usersSockets = serverStore.getUsersSocketsInstances().keys();

    for (const socketId of usersSockets) {

        socket.to(socketId).emit("webrtc-init", {
            sender: socket.id,
        })
    }
}

module.exports = webrtcInitHandler