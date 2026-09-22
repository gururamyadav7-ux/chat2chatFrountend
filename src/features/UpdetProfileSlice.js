// redux/profileSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../refreshTokenLogic/refreshToken";

export const updateProfile = createAsyncThunk(
    "profile/updateProfile",

    async (profileData, thunkAPI) => {
        try {

            const token =
                localStorage.getItem("accessToken");

            const response = await api.put("/user/profile", profileData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            return response.data.user;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Profile update failed"
            );

        }
    }
);


const profileSlice = createSlice({

    name: "profile",

    initialState: {
        user: null,
        loading: false,
        error: null,
        success: false,
    },

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(
                updateProfile.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                    state.success = false;
                }
            )

            .addCase(
                updateProfile.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.user = action.payload;

                    state.success = true;
                }
            )

            .addCase(
                updateProfile.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error = action.payload;
                }
            );

    },
});

export default profileSlice.reducer;