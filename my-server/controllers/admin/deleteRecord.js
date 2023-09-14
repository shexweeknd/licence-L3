const { deleteUser } = require("../../models/userSqlite.js")

const deleteRecord = async (req, res) => {
    
    const {email} = req.body

    const message = await deleteUser({email})

    return res.send({message: `${email} was removed from users`});
};

module.exports = deleteRecord;