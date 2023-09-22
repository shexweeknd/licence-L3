export const configurePeer = (peer) => {

    const videoRef = document.getElementById("video")

    peer.on("stream", console.log("stream available"))

    peer.on("close", () => {
    //todo remove srcObject localStream
    console.log("on close event called")
    videoRef.current.srcObject = {}
    });

    peer.on("error", () => {
    console.error("Une erreur est soudainement survenue");
    videoRef.current.srcObject = {}
    });

}