const serverStore = require("../../store/serverStore.js");

const queryListOfCams = async (req, res) => {
  const data = serverStore.getActiveCamsConnections();

  console.log("queryListOfCams - active cams are :", data);
  return res.send(data);
};

module.exports = queryListOfCams;
