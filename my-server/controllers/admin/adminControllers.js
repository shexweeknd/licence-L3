const approvePending = require('./approvePending.js');
const denyPending = require('./denyPending.js');
const getPendings = require('./getPendings.js');
const getUsers = require('./getUsers.js');
const deleteRecord = require('./deleteRecord.js');

exports.controllers = {
    approvePending,
    denyPending,
    getPendings,
    getUsers,
    deleteRecord
}