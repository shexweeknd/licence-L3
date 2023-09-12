document.querySelector("#start").addEventListener("click", (e) => {
    let p = new SimplePeer({
        initiator: false,
        config: {
            iceServers: [
                {
                    urls: "stun:stun.l.google.com:19302"
                }
            ],
        }
    })

    p.on("signal", signal => {
    })

    p.signal(document.querySelector("#text-area").value)

    p.on("stream", stream => {
        document.querySelector("#video-container").srcObject = stream
    })
} ) 