import { createSlice } from "@reduxjs/toolkit";
import Peer from "simple-peer";

export const webrtcSlice = createSlice({
  name: "webrtcSlice",
  initialState: {
    peers: []
  },
  reducers: {
    recordPeerObject: (state, action) => {
      // Ajoutez l'objet peer au tableau
      state.peers.push({ id: action.payload, peer: new Peer() });
    },
  },
});
