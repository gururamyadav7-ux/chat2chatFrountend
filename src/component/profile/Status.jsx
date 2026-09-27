import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuCirclePlus } from "react-icons/lu";
import { FaCirclePlus } from "react-icons/fa6";

const Status = () => {
  const profileRef = useRef(null);

  const name = "Shejal kumari";
  const Time = "Today at 10:12 pm";

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
      className=" w-full lg:w-[40%] px-2 h-screen lg:h-full flex flex-col bg-gray-950 shadow-2xl"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-2">
        <h2 className="text-green-500 font-bold text-3xl">Status</h2>
        <div className="flex gap-3">
          <i className="p-2  cursor-pointer rounded-full hover:bg-gray-900">
            <BsThreeDotsVertical className="text-white text-2xl font-bold" />
          </i>
          <i className="p-2 cursor-pointer  rounded-full hover:bg-gray-900">
            <LuCirclePlus className="text-white text-2xl font-bold" />
          </i>
        </div>
      </div>

      <div className=" w-full rounded-2xl mt-5 hover:bg-gray-900 py-2 px-5">
        {/* Profile Image */}
        <div className="flex gap-2 w-full text-white">
          <div className=" mr-3 relative w-20 h-32 rounded-[5px] p-[2px] bg-gradient-to-tr from-yellow-400 via-green-500 to-purple-600 group">
            <img
              src="https://tse3.mm.bing.net/th/id/OIP.xL_BcE3-R2K48f-BBDa-cgHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="profile"
              className="
                  w-full h-full
                  rounded-[5px]
                  object-cover
                  shadow-xl
                  transition-all duration-500
                  group-hover:scale-105
                "
            />

            <i className="text-3xl absolute  -bottom-1 -right-1 bg-white rounded-full">
              <FaCirclePlus className="text-blue-600" />
            </i>
          </div>
          {/* all user story */}
          <div className=" relative w-20 h-32 rounded-[5px] p-[2px] bg-gradient-to-tr from-yellow-400 via-green-500 to-purple-600 group">
            <img
              src="https://tse3.mm.bing.net/th/id/OIP.xL_BcE3-R2K48f-BBDa-cgHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="profile"
              className="
                  w-full h-full
                  rounded-[5px]
                  object-cover
                  shadow-xl
                  transition-all duration-500
                  group-hover:scale-105
                "
            />
          </div>
          <div className=" relative w-20 h-32 rounded-[5px] p-[2px] bg-gradient-to-tr from-yellow-400 via-green-500 to-purple-600 group">
            <img
              src="https://tse3.mm.bing.net/th/id/OIP.xL_BcE3-R2K48f-BBDa-cgHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="profile"
              className="
                  w-full h-full
                  rounded-[5px]
                  object-cover
                  shadow-xl
                  transition-all duration-500
                  group-hover:scale-105
                "
            />
          </div>
          <div className=" relative w-20 h-32 rounded-[5px] p-[2px] bg-gradient-to-tr from-yellow-400 via-green-500 to-purple-600 group">
            <img
              src="https://tse3.mm.bing.net/th/id/OIP.xL_BcE3-R2K48f-BBDa-cgHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="profile"
              className="
                  w-full h-full
                  rounded-[5px]
                  object-cover
                  shadow-xl
                  transition-all duration-500
                  group-hover:scale-105
                "
            />
          </div>
          <div className=" relative w-20 h-32 rounded-[5px] p-[2px] bg-gradient-to-tr from-yellow-400 via-green-500 to-purple-600 group">
            <img
              src="https://tse3.mm.bing.net/th/id/OIP.xL_BcE3-R2K48f-BBDa-cgHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="profile"
              className="
                  w-full h-full
                  rounded-[5px]
                  object-cover
                  shadow-xl
                  transition-all duration-500
                  group-hover:scale-105
                "
            />
          </div>
        </div>
      </div>
      {/*Status story All friend*/}
      <div className="mt-5">
        <h4 className="text-gray-500 font-bold px-5">Recent</h4>
        <div className="flex flex-col mt-2 gap-2">
          <div className="rounded-2xl hover:bg-gray-900 py-2 px-5">
            {/* Profile Image */}
            <div className="flex gap-2 text-white">
              <div
                className="relative w-15 h-15
                rounded-full group"
              >
                <img
                  src="https://tse3.mm.bing.net/th/id/OIP.xL_BcE3-R2K48f-BBDa-cgHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt="profile"
                  className="
                  w-15 h-15
                  rounded-full
                  object-cover
                  border-4 border-white
                  shadow-xl
                  transition-all duration-500
                  group-hover:scale-105
                "
                />
              </div>
              <div>
                <h4>{name}</h4>
                <p>{Time}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Status;