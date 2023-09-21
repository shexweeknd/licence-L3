import Peer from "simple-peer";

let peers = new Map();

export const recordPeerObject = (sender) => {
    peers.set(sender, new Peer({
        initiator: false,
        config: {
          iceServers: [
            {
              urls: "stun:stun.l.google.com:19302",
            },
            {
              url: 'turn:turn.anyfirewall.com:443?transport=tcp',
              credential: 'webrtc',
              username: 'webrtc'
          }
          ],
        },
    }))
}

export const closePeer = (socketId) => {
  //suppression de l'objet peer
  const peer = getPeer(socketId)
  // peer.destroy() se fait du côté de l'initiateur

  //remove peer from list
  peers.delete(socketId)
}

export const getPeer = (socketId) => {
    return peers.get(socketId)
}