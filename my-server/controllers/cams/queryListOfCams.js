//permet à une caméra d'intégrer la liste des caméras connectés
// const data = [
//     {
//       salle: 'amphi',
//       ip: '192.168.10.2',
//       src: ['192.168.10.2:3000', '192.168.10.2:3001', '192.168.10.2:3002', '192.168.10.2:3003'],
//       type: "video/mp4"
//     },
//     {
//       salle: 'salle 16',
//       ip: '192.168.10.3',
//       src: ['192.168.10.3:3000', '192.168.10.3:3001', '192.168.10.3:3002', '192.168.10.3:3003'],
//       type: "video/mp4"
//     },
//     {
//       salle: 'salle 26',
//       ip: '192.168.10.4',
//       src: ['192.168.10.4:3000', '192.168.10.4:3001', '192.168.10.4:3002', '192.168.10.4:3003'],
//       type: "video/mp4"
//     },
//     {
//       salle: 'salle 12',
//       ip: '192.168.10.5',
//       src: ['192.168.10.5:3000', '192.168.10.5:3001', '192.168.10.5:3002', '192.168.10.5:3003'],
//       type: "video/mp4"
//     },
//     {
//       salle: 'salle 13',
//       ip: '192.168.10.6',
//       src: ['192.168.10.6:3000', '192.168.10.6:3001', '192.168.10.6:3002', '192.168.10.6:3003'],
//       type: "video/mp4"
//     },
//     {
//       salle: 'salle 14',
//       ip: '192.168.10.7',
//       src: ['192.168.10.7:3000', '192.168.10.7:3001', '192.168.10.7:3002', '192.168.10.7:3003'],
//       type: "video/mp4"
//     },
//     {
//       salle: 'salle 11A',
//       ip: '192.168.10.8',
//       src: ['192.168.10.8:3000', '192.168.10.8:3001', '192.168.10.8:3002', '192.168.10.8:3003'],
//       type: "video/mp4"
//     },
//     {
//       salle: 'salle 11B',
//       ip: '192.168.10.9',
//       src: ['192.168.10.9:3000', '192.168.10.9:3001', '192.168.10.9:3002', '192.168.10.9:3003'],
//       type: "video/mp4"
//     },
//   ];

const serverStore = require("../../store/serverStore.js");

const queryListOfCams = async (req, res) => {
  const data = serverStore.getActiveCamsConnections();

  console.log("queryListOfCams - active cams are :", data);
  return res.send(data);
};

module.exports = queryListOfCams;
