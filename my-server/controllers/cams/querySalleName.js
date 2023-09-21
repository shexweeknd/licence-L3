const { response } = require("express");
const { getCamsNameFromSocket } = require("../../store/serverStore.js");

const querySalleName = async (req, res) => {
    const socketId = req.body.socketId || req.query.socketId || req.params.socketId

    await getCamsNameFromSocket(socketId).then(response => {
        return res.send(response)
    }).catch(e => {
        return res.status(404).send(e)
    })
}

module.exports = querySalleName