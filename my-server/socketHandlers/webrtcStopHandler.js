const serverStore = require("../store/serverStore.js");

let io = null

const webrtcStopHandler = ({io, socketId}) => {
    console.log(`stopping connexion from ${socketId} to everyone`)
    const usersSockets = serverStore.getUsersSocketsInstances().keys();

    for (const userSocket of usersSockets) {
        io.to(userSocket).emit("webrtc-stop", {
            sender: socketId,
        })
    }
}

module.exports = webrtcStopHandler;