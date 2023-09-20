const webrtcSignalHandler = ({io, sender, receiver, signal}) => {

    //conditionne pour que l'émetteur ne reçoit pas ses propres siganaux
    io.to(receiver).emit("webrtc-signal", {
        sender: sender,
        signal: signal,
    })

    console.log(`signaux de : ${sender} envoyés à : ${receiver}`)
}

module.exports = webrtcSignalHandler