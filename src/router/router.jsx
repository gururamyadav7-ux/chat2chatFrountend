import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../component/loginPage/Login";
import Register from "../component/register/Register";
import App from "../App";
import Profile from "../component/profile/Profile";
import Chatsection from "../component/ChateSection/Chatsection";
import NewGroup from "../component/setting/SettingAllList/NewGroup";
import NewCommunity from "../component/setting/SettingAllList/NewCommunity";
import BrodcastLists from "../component/setting/SettingAllList/BrodcastLists";
import LinkedDevices from "../component/setting/SettingAllList/LinkedDevices";
import Starred from "../component/setting/SettingAllList/Starred";
import Payments from "../component/setting/SettingAllList/Payments";
import SettingsPhone from "../component/setting/SettingAllList/SettingProfile";
import OtpVerification from "../component/register/OTP";
import LoginOtpVerification from "../component/loginPage/LoginOTP";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  // login Otp
  {
    path: "/Login-OtpVerification",
    element: <LoginOtpVerification/>,
  },

  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register-OtpVerification",
    element: <OtpVerification />,
  },

  {
    path: "/chat",
    element: <App />,
  },
  {
    path: "/chatSection",
    element: <Chatsection />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
  // menu Heder user route
  {
    path: "/Newgroup",
    element: <NewGroup />,
  },
  {
    path: "/Newcommunity",
    element: <NewCommunity />,
  },
  {
    path: "/Brodcastlists",
    element: <BrodcastLists />,
  },
  {
    path: "/Linkeddevices",
    element: <LinkedDevices />,
  },
  {
    path: "/Starred",
    element: <Starred />,
  },
  {
    path: "/Payments",
    element: <Payments />,
  },
  {
    path: "/Readall",
    element: <Profile />,
  },
  {
    path: "/Settings",
    element: <SettingsPhone />,
  },


]);
