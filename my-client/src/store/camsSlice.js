import { createSlice } from "@reduxjs/toolkit";

export const camsSlice = createSlice({
  name: "camsSlice",
  initialState: {
    connectedCams: [],
  },
  reducers: {
    setConnectedCams: (state, action) => {
      const newConnectedCams = action.payload.filter((objetSource) => {
        return !state.connectedCams.some(
          (objetDest) => objetDest.salle === objetSource.salle
        );
      });

      state.connectedCams = [...state.connectedCams, ...newConnectedCams];

    },
  },
});
