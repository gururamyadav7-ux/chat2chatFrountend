import "./App.css";

import LogoBaar from "./component/logoBaar/LogoBaar";
import UserSection from "./component/userSection/UserSection";
import Sidebaar from "./component/SideBaar/Sidebaar";
import Profile from "./component/profile/Profile";

// icon chatpus
import { RiChatNewFill } from "react-icons/ri";

//reduserce

import { useSelector } from "react-redux";

import ProfileEdit from "./component/profile/ProfileEdite";
import Status from "./component/profile/Status";
import Community from "./component/profile/Community";
import Channel from "./component/profile/Channel";
import LoadingPage from "./component/lodingPage/Loding";
import { useEffect, useState } from "react";
import Meadia from "./component/profile/Meadia";
import IncomingCall from "./IncomingCall/IncomingCall";
import { useNavigate } from "react-router-dom";

function App() {
  const Navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const {
    OpenChate,
    OpenStatus,
    OpenChanel,
    OpenCommunaty,
    OpenMeadia,
    OpenProfile,
  } = useSelector((state) => {
    return state.MenuOpen;
  });

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1200);
    };

    // Browser ka complete page load hone ka wait
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      Navigate("/")
      window.addEventListener("load", handleLoad);

    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }
  //// loding close ///******* */

  return (
    <main className="container relative bg-black mx-auto h-screen flex">
      <div className=" w-full bg-gray-950 flex items-center border-t border-gray-600 h-[8%] absolute bottom-0 left-0 p-2 z-50">
        <Sidebaar />
      </div>
      {OpenChate ? (
        <aside className=" relative bg-gray-950  lg:w-[40%] w-full h-full border  px-3">
          <LogoBaar />
          <input
            className="w-full h-[5%] pl-5 rounded-3xl outline-none shadow-2xl shadow-black bg-white focus:border-2 border-green-500"
            placeholder="Search or start new chat"
          />
          <UserSection />
          <i className=" p-2 fixed bottom-[20%] right-2 rounded-full hover:bg-gray-800 cursor-pointer">
            <img
              className="w-8"
              alt=""
              src="https://static.whatsapp.net/rsrc.php/yS/r/T_xj3a3ApC9.webp"
            ></img>
          </i>
          <i className="p-2 fixed bottom-[12%] right-2 rounded-full hover:bg-gray-800 cursor-pointer">
            <RiChatNewFill className="text-green-500 text-4xl" />
          </i>
        </aside>
      ) : (
        ""
      )}
      {OpenStatus ? <Status /> : ""}
      {OpenChanel ? <Channel /> : ""}
      {OpenCommunaty ? <Community /> : ""}
      {OpenMeadia ? <Meadia /> : ""}
      {OpenProfile ? <Profile /> : ""}

      <IncomingCall />
      <ProfileEdit />
    </main>
  );
}

export default App;
