import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../refreshTokenLogic/refreshToken";

// GET API
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {

    try {
      const response = await api.get("/user/profile", {
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
};

const userSlice = createSlice({
  name: "users",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // API Pending
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // API Success
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })

      // API Failed
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
