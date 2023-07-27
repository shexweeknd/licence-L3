import { authSlice } from "./authSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    }
})