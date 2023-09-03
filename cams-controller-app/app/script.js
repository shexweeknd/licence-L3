document.querySelector("#start").addEventListener('click', (e) => {
    navigator.getUserMedia({
        video: true,
        audio: false
    }, function (stream) {
        let video = document.querySelector("#video-container")
        video.srcObject = stream
        video.play()
        console.log(video.srcObject)
    }, function () {})
})