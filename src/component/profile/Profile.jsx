import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
// reduser set
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/userslice";
import ProfileEdit from "./ProfileEdite";
const Profile = () => {
  const profileRef = useRef(null);
  const imageRef = useRef(null);
  const plusRef = useRef(null);
  const contentRef = useRef(null);
  ///
  const [showEdit, setShowEdit] = useState(false);

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

    tl.fromTo(
      imageRef.current,
      {
        scale: 0,
        rotation: -20,
      },
      {
        scale: 1,
        rotation: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      "-=0.2",
    );
    tl.fromTo(
      plusRef.current,
      {
        scale: 0,
        rotation: -20,
      },
      {
        scale: 1,
        rotation: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      "-=0.2",
    );

    tl.fromTo(
      contentRef.current.children,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.1,
      },
      "-=0.2",
    );
  }, []);

  //*****************//
  //Profile
  //*****************//

  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => {
    return state.user;
  });

  const Profile = users?.user;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div ref={profileRef} className=" w-full lg:w-[40%] h-screen lg:h-full bg-white shadow-2xl">
      {/* Header */}
      <div className="h-13 bg-[#001780] flex items-center justify-between px-2 text-white">
        <div className="flex items-center">
          <button className="text-2xl mr-2 hover:scale-110 transition">
            ←
          </button>
          <h2 className="text-lg font-semibold">Profile</h2>
        </div>
        <div className=" flex items-center justify-center">
          <button
            onClick={() => setShowEdit(true)}
            className="
            px-6 py-2
            bg-[#00a884]
            text-white
            rounded-xl
            hover:bg-[#008f72]
            active:scale-95
            transition-all
          "
          >
            Edit Profile
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center mt-10">
        <label className="relative cursor-pointer">
          <img
            ref={imageRef}
            src=""
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-green-500"
          />

          <div
            ref={plusRef}
            className="absolute bottom-0 right-0 bg-green-500 text-white w-9 h-9 rounded-full flex items-center justify-center"
          >
            +
          </div>
          <input type="file" accept="image/*" className="hidden" />
        </label>
        <p className="text-sm text-gray-500 mt-2">Change profile photo</p>
      </div>

      {/* User Information */}
      <div ref={contentRef} className="px-6 py-6">
        <div className="mb-6">
          <p className="text-sm text-gray-500">Name</p>
          <p className="text-lg font-medium ">{Profile?.name || "User Name"}</p>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500">About</p>
          <p className="text-gray-800">
            {Profile?.about || "Hey there! I am using WhatsApp."}
          </p>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500">Phone</p>
          <p className="text-gray-800">{Profile?.phone || "+91 XXXXX XXXXX"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-gray-800 ">
            {Profile?.email || "example@gmail.com"}
          </p>
        </div>
      </div>
      <ProfileEdit
        isOpen={showEdit}
        user={Profile}
        onClose={() => setShowEdit(false)}
      />
    </div>
  );
};

export default Profile;
