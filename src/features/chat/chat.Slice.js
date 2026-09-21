import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: "",
    messages: [],
};

const chatSlice = createSlice({
    name: "chat",

    initialState,

    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        },

        setMessages: (state, action) => {
            state.messages.push(action.payload)
        },
    },
});

export const {
    setMessage,
    setMessages
} = chatSlice.actions;

export default chatSlice.reducer;