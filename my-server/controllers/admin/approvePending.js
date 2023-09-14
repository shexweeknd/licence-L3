const { approve } = require("../../models/userSqlite.js")

const approvePending = async (req, res) => {

    const { email } = req.body

    const message = await approve({email})

    return res.send({message: `${email} was approved from pending`})
};

module.exports = approvePending;