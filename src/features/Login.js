import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const apiUrl = import.meta.env.VITE_API_URL
import axios from "axios";
const api = axios.create({
    baseURL: apiUrl,
    withCredentials: true, // refreshToken cookie bhejne ke liye
    headers: { "Content-Type": "application/json" }
});

export const LoginVeryfai = createAsyncThunk(
    "auth/login",
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/user/verify-login-otp", formData);
            // JWT token save
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("UserId", data.user._id);

            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    },
);

const loginSlice = createSlice({
    name: "auth",

    initialState: {
        user: null,
        token: localStorage.getItem("token"),
        loading: false,
        error: null,
    },

    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(LoginVeryfai.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(LoginVeryfai.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })

            .addCase(LoginVeryfai.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },

});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
