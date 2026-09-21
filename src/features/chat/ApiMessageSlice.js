import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import API from "../../refreshTokenLogic/refreshToken";

const initialState = {
    messages: [],
    loading: false,
    error: null,
    sending: false,
};

// ==============================
// GET MESSAGES
// GET /api/message/:chatId
// ==============================

export const getMessages = createAsyncThunk(
    "message/getMessages",
    async (chatId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${API}/${chatId}`,
                {
                    withCredentials: true,
                }
            );

            return response.data.messages;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Messages get nahi ho paye"
            );
        }
    }
);

// ==============================
// SEND MESSAGE
// POST /api/message
// ==============================

export const sendMessageData = createAsyncThunk(
    "message/sendMessage",
    async (messageData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                API,
                messageData,
                {
                    withCredentials: true,
                }
            );

            console.log(messageData);

            return response.data.message;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Message send nahi hua"
            );
        }
    }
);

// ==============================
// DELETE MESSAGE
// DELETE /api/message/:messageId
// ==============================

export const deleteMessage = createAsyncThunk(
    "message/deleteMessage",
    async (messageId, { rejectWithValue }) => {
        try {
            await axios.delete(
                `${API}/${messageId}`,
                {
                    withCredentials: true,
                }
            );

            return messageId;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Message delete nahi hua"
            );
        }
    }
);

// ==============================
// EDIT MESSAGE
// PUT /api/message/:messageId
// ==============================

export const editMessage = createAsyncThunk(
    "message/editMessage",
    async (
        { messageId, text },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.put(
                `${API}/${messageId}`,
                { text },
                {
                    withCredentials: true,
                }
            );

            return response.data.message;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Message update nahi hua"
            );
        }
    }
);

// ==============================
// SLICE
// ==============================

const messageSlice = createSlice({
    name: "message",

    initialState,

    reducers: {
        // Socket se new message
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },

        // Socket se message update
        updateMessage: (state, action) => {
            const index = state.messages.findIndex(
                (msg) =>
                    msg._id === action.payload._id
            );

            if (index !== -1) {
                state.messages[index] =
                    action.payload;
            }
        },

        // Socket se message delete
        removeMessage: (state, action) => {
            state.messages =
                state.messages.filter(
                    (msg) =>
                        msg._id !== action.payload
                );
        },

        clearMessages: (state) => {
            state.messages = [];
        },

        clearError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        // =========================
        // GET
        // =========================

        builder
            .addCase(
                getMessages.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                getMessages.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.messages =
                        action.payload || [];
                }
            )

            .addCase(
                getMessages.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );

        // =========================
        // SEND
        // =========================

        builder
            .addCase(
                sendMessageData.pending,
                (state) => {
                    state.sending = true;
                    state.error = null;
                }
            )

            .addCase(
                sendMessageData.fulfilled,
                (state, action) => {
                    state.sending = false;

                    state.messages.push(
                        action.payload
                    );
                }
            )

            .addCase(
                sendMessageData.rejected,
                (state, action) => {
                    state.sending = false;
                    state.error = action.payload;
                }
            );

        // =========================
        // DELETE
        // =========================

        builder
            .addCase(
                deleteMessage.fulfilled,
                (state, action) => {
                    state.messages =
                        state.messages.filter(
                            (msg) =>
                                msg._id !== action.payload
                        );
                }
            )

            .addCase(
                deleteMessage.rejected,
                (state, action) => {
                    state.error = action.payload;
                }
            );

        // =========================
        // EDIT
        // =========================

        builder
            .addCase(
                editMessage.fulfilled,
                (state, action) => {
                    const index =
                        state.messages.findIndex(
                            (msg) =>
                                msg._id ===
                                action.payload._id
                        );

                    if (index !== -1) {
                        state.messages[index] =
                            action.payload;
                    }
                }
            )

            .addCase(
                editMessage.rejected,
                (state, action) => {
                    state.error = action.payload;
                }
            );
    },
});

export const {
    addMessage,
    updateMessage,
    removeMessage,
    clearMessages,
    clearError,
} = messageSlice.actions;

export default messageSlice.reducer;