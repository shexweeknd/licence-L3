const db = require("../../db");

const approve = async (req, res) => {
    return res.send("approved")
}

const deny = async (req, res) => {
    return res.send("denied");
}

const getPendings = async (req, res) => {
    return res.send("list of pendings available");
}

const deleteRecord = async (req, res) => {
    return res.send("deleted");
}

module.exports = {
    approve,
    deny,
    getPendings,
    deleteRecord
}