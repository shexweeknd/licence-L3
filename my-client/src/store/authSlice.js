import {createSlice} from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        email: "",
        token: "",
        username: "",
    },
    reducers: {
        getUserCreds: (state, action) => {
            state = {...action.payload}
        }
    }
})