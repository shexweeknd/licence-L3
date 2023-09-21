const serverStore = require("../store/serverStore.js");

const webrtcInitHandler = ({io, socketId}) => {

    const usersSockets = serverStore.getUsersSocketsInstances().keys();

    for (const socketUser of usersSockets) {

        io.to(socketUser).emit("webrtc-init", {
            sender: socketId,
        })
    }
}

module.exports = webrtcInitHandler