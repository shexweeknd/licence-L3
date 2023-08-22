const serverStore = require("../store/serverStore.js");

// dump camlist
const dumpActiveCams = require('./dumpCamlist.js')

const emitToEveryUsers = async (string, socket, io) => {
    try {
        const activeUsers = serverStore.getActiveUsersConnections(socket.user.userId);

        switch (string) {
            case 'emit-camslist':
                activeUsers.forEach( socketId => {
                    io.to(socketId).emit(string, dumpActiveCams);
                    console.log("message emited to socket : ", socketId)
                })
        }
    } catch (error) {
        console.log("une erreur est survenue :", error);
    }
}

module.exports = emitToEveryUsers;