import { useRef, useEffect } from "react";
import gsap from "gsap";

import { LuCirclePlus } from "react-icons/lu";

const Community = () => {
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
    <div ref={profileRef} className=" w-full lg:w-[40%] h-screen lg:h-full bg-gray-950 shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-2">
        <h2 className="text-green-500 font-bold text-3xl">Communities</h2>
        <div className="flex gap-3">
          <i className="p-2 cursor-pointer  rounded-full hover:bg-gray-900">
            <LuCirclePlus className="text-white text-2xl font-bold" />
          </i>
        </div>
      </div>
    </div>
  );
};

export default Community;
