import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuCirclePlus } from "react-icons/lu";

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
      {/*Status story*/}
      <div className="rounded-2xl mt-5 hover:bg-gray-900 py-2 px-5">
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

            {/* Camera Button */}
            <label
              htmlFor="profileImage"
              className="
                  absolute top-9 -right-1
                  w-5 h-5
                  border-2 border-black
                  rounded-full
                  bg-[#00a884]
                  text-black
                  font-bold
                  flex items-center justify-center
                  cursor-pointer
                  shadow-lg
                  transition-all duration-300
                  hover:scale-110
                  hover:bg-[#008f72]
                "
            >
              +
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>
          <div>
            <h4>{name}</h4>
            <p>{Time}</p>
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
    </div>
  );
};

export default Status;