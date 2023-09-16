const metaData = async (req, res) => {
    const file = req.body.file;

    //TODO create real metaData for response

    const metaData = {
        name: "background720.mp4",
        date: "2023-09-16T16:39:00.644Z",
        hour: "00h:00m:18s",
        room: "informatique",
        ip: "127.0.0.1",
        taille: "15Mb",
        resolution: "720x640p",
    }

    res.send(metaData);
}

module.exports = metaData;  