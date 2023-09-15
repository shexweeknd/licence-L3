const { queryUsers } = require("../../models/userSqlite.js")

const getUsers = async (req, res) => {
    const pending = await queryUsers();

    return res.json(pending);
};

module.exports = getUsers;