import { useRef, useEffect } from "react";
import gsap from "gsap";
import { LuCirclePlus } from "react-icons/lu";

const Channel = () => {
  const profileRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      profileRef.current,
      {
        opacity: 0,
        x: -100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "power3.out",
      },
    );
  }, []);

  return (
    <div
      ref={profileRef}
      className=" w-full lg:w-[40%] h-screen lg:h-full bg-gray-950 shadow-2xl px-2"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-2">
        <h2 className="text-green-500 font-bold text-3xl">Chanels</h2>
        <div className="flex gap-3">
          <i className="p-2 cursor-pointer  rounded-full hover:bg-gray-900">
            <LuCirclePlus className="text-white text-2xl font-bold" />
          </i>
        </div>
      </div>
      <section className="w-full scrollBarhaid overflow-y-scroll  flex flex-col gap-3 cursor-pointer ">
        <button
          className={`flex items-center  px-2 rounded-xl cursor-pointer hover:bg-gray-900 text-white `}
        >
          <div className="w-11 h-11 overflow-hidden rounded-full bg-blue-400 text-white font-bold  flex items-center justify-center">
            <img src="" alt="" />
          </div>

          <div className="w-[90%] py-3 px-2  flex flex-col">
            <div className="flex  justify-between">
              <b>user.name</b>
              <span>user.time</span>
            </div>
            <p className="w-full text-start">user.chatNow</p>
          </div>
        </button>
      </section>
      <div className="mt-3">
        <h4 className="text-gray-400 font-bold">Find Chanels Follow</h4>
        <div className="flex gap-3 flex-col">
          <button
            className={`flex text-white items-center px-2 rounded-xl cursor-pointer hover:bg-gray-900 `}
          >
            <div className="w-11 h-11 overflow-hidden rounded-full bg-blue-400 text-white font-bold  flex items-center justify-center">
              <img src="" alt="" />
            </div>

            <div className="w-[90%] py-3 px-2  flex flex-col">
              <div className="flex  justify-between">
                <b>user.name</b>
                <span>user.time</span>
              </div>
              <p className="w-full text-start">user.chatNow</p>
            </div>
          </button>
          <button
            className={`flex text-white items-center  px-2  rounded-xl cursor-pointer hover:bg-gray-900 `}
          >
            <div className="w-11 h-11 overflow-hidden rounded-full bg-blue-400 text-white font-bold  flex items-center justify-center">
              <img src="" alt="" />
            </div>

            <div className="w-[90%] py-3 px-2  flex flex-col">
              <div className="flex  justify-between">
                <b>user.name</b>
                <span>user.time</span>
              </div>
              <p className="w-full text-start">user.chatNow</p>
            </div>
          </button>
          <button
            className={`flex text-white items-center  px-2 rounded-xl cursor-pointer hover:bg-gray-900 `}
          >
            <div className="w-11 h-11 overflow-hidden rounded-full bg-blue-400 text-white font-bold  flex items-center justify-center">
              <img src="" alt="" />
            </div>

            <div className="w-[90%] py-3 px-2  flex flex-col">
              <div className="flex  justify-between">
                <b>user.name</b>
                <span>user.time</span>
              </div>
              <p className="w-full text-start">user.chatNow</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Channel;
