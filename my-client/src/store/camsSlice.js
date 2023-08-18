import {createSlice} from "@reduxjs/toolkit";

export const camsSlice = createSlice({
    name: "camsSlice",
    initialState: {
        connectedCams: []
    },
    reducers: {
        setConnectedCams: (state, action) => {
            state.connectedCams.push(action.payload)
        },
    }
})