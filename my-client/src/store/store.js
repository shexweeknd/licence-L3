import { userSlice } from "./userSlice.js";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        userReducer: userSlice.reducer,
    }
})