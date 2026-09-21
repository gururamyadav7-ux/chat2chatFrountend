import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // All chats
    chats: [],

    // Current chat ke messages
    messages: [],

    // Current selected chat
    selectedChat: null,

    // Loading
    loading: false,

    // Error
    error: null,

    // Typing user ID
    typingUser: null,

    // Online users IDs
    onlineUsers: [],

    // Search
    searchText: "",

    // Reply message
    replyMessage: null,

    // Edit message
    editingMessage: null,
};

const chatSlice = createSlice({
    name: "chat",

    initialState,

    reducers: {
        // =========================
        // CHATS
        // =========================

        setChats: (state, action) => {
            state.chats = action.payload;
        },

        addChat: (state, action) => {
            state.chats.unshift(action.payload);
        },

        updateChat: (state, action) => {
            const index = state.chats.findIndex(
                (chat) => chat._id === action.payload._id
            );

            if (index !== -1) {
                state.chats[index] = {
                    ...state.chats[index],
                    ...action.payload,
                };
            }
        },

        removeChat: (state, action) => {
            state.chats = state.chats.filter(
                (chat) => chat._id !== action.payload
            );
        },

        // =========================
        // SELECT CHAT
        // =========================

        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload;
            state.messages = [];
            state.typingUser = null;
        },

        clearSelectedChat: (state) => {
            state.selectedChat = null;
            state.messages = [];
        },

        // =========================
        // MESSAGES
        // =========================

        setMessages: (state, action) => {
            state.messages = action.payload;
        },

        addMessage: (state, action) => {
            state.messages.push(action.payload);

            // Chat list ka last message update
            const chatIndex = state.chats.findIndex(
                (chat) =>
                    chat._id === action.payload.chatId
            );

            if (chatIndex !== -1) {
                state.chats[chatIndex].lastMessage =
                    action.payload;

                // Latest chat ko top par lao
                const chat = state.chats.splice(
                    chatIndex,
                    1
                )[0];

                state.chats.unshift(chat);
            }
        },

        // =========================
        // UPDATE MESSAGE
        // =========================

        updateMessage: (state, action) => {
            const index = state.messages.findIndex(
                (message) =>
                    message._id === action.payload._id
            );

            if (index !== -1) {
                state.messages[index] = {
                    ...state.messages[index],
                    ...action.payload,
                };
            }
        },

        // =========================
        // DELETE MESSAGE
        // =========================

        deleteMessage: (state, action) => {
            state.messages = state.messages.filter(
                (message) =>
                    message._id !== action.payload
            );
        },

        // =========================
        // MESSAGE SEEN
        // =========================

        messageSeen: (state, action) => {
            const message = state.messages.find(
                (msg) =>
                    msg._id === action.payload
            );

            if (message) {
                message.seen = true;
            }
        },

        // =========================
        // MESSAGE DELIVERED
        // =========================

        messageDelivered: (state, action) => {
            const message = state.messages.find(
                (msg) =>
                    msg._id === action.payload
            );

            if (message) {
                message.delivered = true;
            }
        },

        // =========================
        // TYPING
        // =========================

        setTypingUser: (state, action) => {
            state.typingUser = action.payload;
        },

        clearTypingUser: (state) => {
            state.typingUser = null;
        },

        // =========================
        // ONLINE USERS
        // =========================

        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },

        // =========================
        // SEARCH
        // =========================

        setSearchText: (state, action) => {
            state.searchText = action.payload;
        },

        // =========================
        // REPLY
        // =========================

        setReplyMessage: (state, action) => {
            state.replyMessage = action.payload;
        },

        clearReplyMessage: (state) => {
            state.replyMessage = null;
        },

        // =========================
        // EDIT
        // =========================

        setEditingMessage: (state, action) => {
            state.editingMessage = action.payload;
        },

        clearEditingMessage: (state) => {
            state.editingMessage = null;
        },

        // =========================
        // LOADING
        // =========================

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        // =========================
        // ERROR
        // =========================

        setError: (state, action) => {
            state.error = action.payload;
        },

        clearError: (state) => {
            state.error = null;
        },

        // =========================
        // CLEAR EVERYTHING
        // =========================

        resetChat: () => {
            return initialState;
        },
    },
});

export const {
    setChats,
    addChat,
    updateChat,
    removeChat,

    setSelectedChat,
    clearSelectedChat,

    setMessages,
    addMessage,
    updateMessage,
    deleteMessage,

    messageSeen,
    messageDelivered,

    setTypingUser,
    clearTypingUser,

    setOnlineUsers,

    setSearchText,

    setReplyMessage,
    clearReplyMessage,

    setEditingMessage,
    clearEditingMessage,

    setLoading,

    setError,
    clearError,

    resetChat,
} = chatSlice.actions;

export default chatSlice.reducer;