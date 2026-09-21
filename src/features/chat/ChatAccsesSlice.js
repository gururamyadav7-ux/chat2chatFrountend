import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


import api from "../../refreshTokenLogic/refreshToken";

// Access / Create Chat
export const accessChat = createAsyncThunk(
    "chat/accessChat",
    async (UserId, { rejectWithValue }) => {
        try {
            console.log(UserId);
            const response = await api.get("/accseschat", UserId);

            console.log(response)
            return response.data.chat;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Chat access failed"
            );
        }
    }
);

const initialState = {
    chats: [],
    selectedChat: null,
    loadingAccses: false,
    error: null
};

const chatSlice = createSlice({
    name: "chat",

    initialState,

    reducers: {
        clearSelectedChat: (state) => {
            state.selectedChat = null;
        }
    },

    extraReducers: (builder) => {
        builder

            // pending
            .addCase(accessChat.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            // success
            .addCase(accessChat.fulfilled, (state, action) => {
                state.loading = false;

                state.selectedChat = action.payload;

                // Chat ko list me add karo agar already nahi hai
                const exists = state.chats.find(
                    (chat) => chat._id === action.payload._id
                );

                if (!exists) {
                    state.chats.unshift(action.payload);
                }
            })

            // error
            .addCase(accessChat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearSelectedChat } = chatSlice.actions;

export default chatSlice.reducer;