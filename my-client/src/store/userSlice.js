import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        email: "",
        token: "",
        username: "",
    },
    reducers: {
        setUserCreds: (state, action) => {
            Object.assign(state, action.payload);
        },
    }
})