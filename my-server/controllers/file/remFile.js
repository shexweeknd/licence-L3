const fs = require("fs");

const remFile = async (req, res) => {
    const filePath = req.body.filePath || req.query.filePath

    fs.unlink(filePath, () => {
        return res.json({"removed": "ok"})
    });
}

module.exports = remFile;