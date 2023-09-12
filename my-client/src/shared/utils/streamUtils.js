export const renderCurrentStream = (sender, stream) => {
    //TODO GET details of current cam socket.id from NodeServer: salle name

    //TODO arrange & render cam details + stream for current 
    const video = document.getElementById("cam-stream")
    video.srcObject = stream

    video.play()
}