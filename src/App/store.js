
// This file is used to configure the Redux store for the application. It imports the necessary reducers and combines them into a single store.
import { configureStore } from "@reduxjs/toolkit";
// Importing register reducer from the features folder to manage user registration state
import userReducerRegister from "../features/register";
// Importing login reducer from the features folder to manage user login state
import userReducerLogin from "../features/loginslice";
// Importing user reducer from the features folder to manage user state
import userReducerUser from "../features/userslice";
// Importing AlluserReducer from the features folder to manage all users state
import AlluserReducer from "../features/AllUserSlice";
// Importing MenuStatus from the features folder to manage menu open/close state
import MenuStatus from "../features/MenuStatus"
// Importing chatSlice from the features folder to manage chat state
import chatSlice from "../features/chat/chat.Slice";
// Iporting callSlice from the features folder to manage call state
import callSlice from "../features/Call/CallSlice"
// chatAccses get api

import ChateAccsesReducer from "../features//chat/ChatAccsesSlice"

export const store = configureStore({
  reducer: {
    register: userReducerRegister,
    login: userReducerLogin,
    user: userReducerUser,
    MenuOpen: MenuStatus,
    AllUser: AlluserReducer,
    chat: chatSlice,
    call: callSlice,
    ChatAccses: ChateAccsesReducer
  },
});
