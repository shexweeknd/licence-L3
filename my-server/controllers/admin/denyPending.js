const { deny } = require("../../models/userSqlite.js")

const denyPending = async (req, res) => {

    const { email } = req.body

    const message = await deny({email})

    return res.send({message : `${email} was removed from pendings`});
};

module.exports = denyPending;