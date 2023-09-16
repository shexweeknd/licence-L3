export const renderCurrentStream = (sender, stream) => {
    //TODO GET details of current cam socket.id from NodeServer: salle name

    //TODO arrange & render cam details + stream for current 
    const video = document.querySelector("#stream-container")

    video.srcObject = stream

    video.play()
}