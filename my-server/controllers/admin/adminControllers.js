const approvePending = require('./approvePending.js');
const denyPending = require('./denyPending.js');
const getPendings = require('./getPendings.js');
const deleteRecord = require('./deleteRecord.js');

exports.controllers = {
    approvePending,
    denyPending,
    getPendings,
    deleteRecord
}