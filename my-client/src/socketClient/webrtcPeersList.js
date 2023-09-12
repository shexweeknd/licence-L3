import Peer from "simple-peer";

let peers = new Map();

export const recordPeerObject = (sender) => {
    peers.set(sender, new Peer())
}

export const getPeer = (socketId) => {
    return peers.get(socketId)
}