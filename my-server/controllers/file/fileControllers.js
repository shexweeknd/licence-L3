const streamFile = require('./stream.js');
const downloadFile = require("./download.js");
const listFolder = require('./listFolder.js');
const metaData = require('./metaData.js');

exports.controllers = {
  streamFile,
  downloadFile,
  listFolder,
  metaData
};