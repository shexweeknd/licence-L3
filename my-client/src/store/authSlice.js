import {createSlice} from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        email: "",
        token: "",
        username: "",
    },
    reducers: {
        setUserCreds: (state, action) => {
            state = {...action.payload}
        },
    }
})