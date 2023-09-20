import Peer from "simple-peer";

let peers = new Map();

export const recordPeerObject = (sender) => {
    peers.set(sender, new Peer({
        initiator: false,
        config: {
          iceServers: [
            {
              urls: "stun:numb.viagenie.ca",
              username: "sultan1640@gmail.com",
              credential: "98376683",
            },
            {
              urls: "turn:numb.viagenie.ca",
              username: "sultan1640@gmail.com",
              credential: "98376683",
            },
          ],
        },
    }))
}

export const getPeer = (socketId) => {
    return peers.get(socketId)
}