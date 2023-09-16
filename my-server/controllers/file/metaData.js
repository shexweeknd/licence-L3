const metaData = async (req, res) => {
    const file = req.body.file;

    res.send("...querying metadata");
}

module.exports = metaData;  