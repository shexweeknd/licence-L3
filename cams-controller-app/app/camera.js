document.querySelector("#start").addEventListener('click', (e) => {
    navigator.getUserMedia({
        video: true,
        audio: false
    }, function (stream) {
        let p = new SimplePeer({
            initiator: true,
            config: {
                iceServers: [
                    {
                        urls: "stun:stun.l.google.com:19302"
                    }
                ],
            stream: stream
            }
        })

        p.on("signal", signal => {
            if (signal.type === "offer") {
                document.querySelector("#text-area").value = signal.sdp
            }
        })

    }, function () {})
})