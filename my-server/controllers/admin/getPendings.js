const { getAll } = require("../../models/userSqlite.js")

const getPendings = async (req, res) => {
    const pending = await getAll();

    return res.json(pending);
};

module.exports = getPendings;