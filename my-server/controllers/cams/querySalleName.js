const { getCamsNameFromSocket } = require("../../store/serverStore.js");

let socketId = null

const querySalleName = async (req, res) => {
    socketId = req.body.socketId || req.query.socketId || req.params.socketId

    console.log(`request for salle name calling one time: ${socketId}`)

    await getCamsNameFromSocket(socketId).then(response => {
        return res.send(response)
    }).catch(e => {
        return res.status(404).send(e)
    })
}

module.exports = querySalleName