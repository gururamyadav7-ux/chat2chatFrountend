import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../refreshTokenLogic/refreshToken";

// GET API
export const fetchAllUsers = createAsyncThunk(
    "users/fetchUsers",
    async (_, { rejectWithValue }) => {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const response = await api.get("/user/allusers", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong",
            );
        }
    },
);

const initialState = {
    users: [],
    loading: false,
    error: null,
    chatProfile: null
};

const userSlice = createSlice({
    name: "users",
    initialState,

    reducers: {
        setchatProfile: (state, action) => {
            state.chatProfile = action.payload

        }

    },

    extraReducers: (builder) => {
        builder

            // API Pending
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            // API Success
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })

            // API Failed
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setchatProfile } = userSlice.actions

export default userSlice.reducer;
