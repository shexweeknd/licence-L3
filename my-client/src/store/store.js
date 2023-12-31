import { userSlice } from "./userSlice.js";
import { camsSlice } from "./camsSlice.js";
import { webrtcSlice } from "./webrtcSlice.js";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        userReducer: userSlice.reducer,
        camsReducer: camsSlice.reducer,
        webrtcReducer: webrtcSlice.reducer
    }
})