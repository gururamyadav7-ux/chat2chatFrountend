import "./App.css";

import LogoBaar from "./component/logoBaar/LogoBaar";
import UserSection from "./component/userSection/UserSection";
import Sidebaar from "./component/SideBaar/Sidebaar";
import Profile from "./component/profile/Profile";

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

function App() {
  // loding///******** */
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
    <main className="container relative bg-red-200 mx-auto h-screen flex">
      <Sidebaar />

      {OpenChate ? (
        <aside className=" relative bg-gray-950  lg:w-[40%] w-full h-full border  px-3">
          <LogoBaar />

          <input
            className="w-full h-10 pl-5 rounded-3xl outline-none shadow-2xl shadow-black bg-white focus:border-2 border-green-500"
            placeholder="Search or start new chat"
          />

          <UserSection />
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
