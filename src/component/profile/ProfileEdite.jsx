// Api import
import api from "../../refreshTokenLogic/refreshToken";

// icon image import
import { Camera, Check, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const ProfileEdit = ({ isOpen, onClose }) => {
  // user Server
  const { users } = useSelector((state) => {
    return state.user;
  });
  console.log(users);

  // object FormData 
  const [profile, setProfile] = useState({
    name: users?.user?.name,
    about: users?.user?.about,
    phone: users?.user?.phone,
    profilePic: users?.user?.profilePic
  })
  const [IsSaving, setIsSaving] = useState(false)

  const [Preview, setPreview] = useState(profile.profilePic)
  // Image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setProfile((prev) => ({
      ...prev,
      profilePic: file,
    }));

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    })

    );
  };


  // save and backend send Data

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const formData = new FormData();

      formData.append("name", profile.name);
      formData.append("about", profile.about);

      if (profile.profilePic) {
        formData.append("image", profile.profilePic);
      }

      console.log(profile.profilePic);

      const res = await api.put(
        "/user/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Content-Type manually mat lagao
          },
          withCredentials: true,
        }
      );

      console.log("Updated Profile:", res.data);
      // Save is backend
      setIsSaving(true);

      setTimeout(() => {
        setProfile((prev) => ({
          ...prev,
          image: Preview,
        })),
          setIsSaving(false);
        onClose();
      }, 800);

    } catch (error) {
      console.log(error.response?.data || error);
    }
  };



  return (
    <div
      className={`
        fixed inset-0 z-50 bg-black/50
        flex items-center justify-center
        transition-all duration-500
        ${isOpen ? "visible opacity-100" : "invisible opacity-0"}
      `}
    >
      <div
        className={`
          w-full max-w-md
          h-full sm:h-auto
          bg-white
          sm:rounded-2xl
          shadow-2xl
          overflow-hidden
          transform transition-all duration-500
          ${isOpen ? "translate-y-0 scale-100" : "translate-y-10 scale-95"}
        `}
      >
        {/* Header */}
        <div className="h-16 bg-[#008069] text-white flex items-center px-4 gap-4">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h2 className="text-lg font-semibold">Edit Profile</h2>

            <p className="text-xs text-white/80">
              Change your profile information
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-64px)]">
          {/* Profile Image */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <img
                src={Preview || "https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"}
                alt="profile"
                className="
                  w-32 h-32
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
                  absolute bottom-1 right-1
                  w-11 h-11
                  rounded-full
                  bg-[#00a884]
                  text-white
                  flex items-center justify-center
                  cursor-pointer
                  shadow-lg
                  transition-all duration-300
                  hover:scale-110
                  hover:bg-[#008f72]
                "
              >
                <Camera size={20} />

                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          {/* Name */}
          <div className="mb-6">
            <label className="block text-sm text-gray-500 mb-2">Name</label>

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="
                w-full
                border-b-2 border-gray-200
                focus:border-[#00a884]
                outline-none
                py-2
                text-gray-800
                transition-all duration-300
              "
              placeholder="Enter your name"
            />
          </div>

          {/* About */}
          <div className="mb-6">
            <label className="block text-sm text-gray-500 mb-2">About</label>

            <textarea
              name="about"
              value={profile.about}
              onChange={handleChange}
              rows="3"
              className="
                w-full
                border-b-2 border-gray-200
                focus:border-[#00a884]
                outline-none
                py-2
                resize-none
                text-gray-800
                transition-all duration-300
              "
              placeholder="Write something about yourself"
            />
          </div>

          {/* Phone */}
          <div className="mb-8">
            <label className="block text-sm text-gray-500 mb-2">Phone</label>

            <div className="py-2 text-gray-700">{profile.phone}</div>

            <p className="text-xs text-gray-400 mt-1">
              Your phone number cannot be changed here.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            {/* Cancel */}
            <button
              onClick={onClose}
              className="
                flex-1
                py-3
                rounded-xl
                border border-gray-300
                text-gray-600
                hover:bg-gray-100
                transition-all duration-300
              "
            >
              Cancel
            </button>

            {/* Save */}
            <button
              onClick={handleUpdateProfile}
              disabled={IsSaving}
              className="
                flex-1
                py-3
                rounded-xl
                bg-[#00a884]
                text-white
                flex items-center justify-center gap-2
                hover:bg-[#008f72]
                active:scale-95
                transition-all duration-300
                disabled:opacity-60
              "
            >
              {IsSaving ? (
                <>
                  <span
                    className="
                      w-5 h-5
                      border-2 border-white/40
                      border-t-white
                      rounded-full
                      animate-spin
                    "
                  />
                  Saving...
                </>
              ) : (
                <>
                  <Check size={19} />
                  Save
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;

// import { useEffect } from "react";
// import { Camera, Check, ArrowLeft } from "lucide-react";
// ////
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUsers } from "../../features/userslice";
// //
// import {
//   setIsSaving,
//   setPreview,
//   setProfile,
//   setClose,
// } from "../../features/profileUpdate";

// const ProfileEdit = () => {
//   ///************ */
//   const dispatch = useDispatch();
//   const { users, loading, error } = useSelector((state) => {
//     return state.user;
//   });
//   const {
//     user,
//     ProfileLoading,
//     ProfileError,
//     ProfileSuccess,
//     isOpen,
//     preview,
//     isSaving,
//     Onclose,
//   } = useSelector((state) => {
//     return state.profileUpdate;
//   });

//   const Profile = users?.user;

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   if (loading) {
//     return <h2>Loading...</h2>;
//   }

//   if (error) {
//     return <h2>Error: {error}</h2>;
//   }

//   // Image change
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];

//     if (!file) return;

//     const imageUrl = URL.createObjectURL(file);
//     dispatch(setPreview(imageUrl));
//   };

//   // Input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     dispatch(
//       setProfile((prev) => ({
//         ...prev,
//         [name]: value,
//       })),
//     );
//   };

//   //Save;
//   const handleSave = () => {
//     dispatch(setIsSaving(true));

//     setTimeout(() => {
//       dispatch(
//         setProfile((prev) => ({
//           ...prev,
//           image: preview,
//         })),
//       );

//       dispatch(setIsSaving(false));
//     }, 800);
//   };

//   return (
//     <div
//       className={`
//         fixed inset-0 z-50 bg-black/50
//         flex items-center justify-center
//         transition-all duration-500
//         ${isOpen ? "visible opacity-100" : "invisible opacity-0"}
//       `}
//     >
//       <div
//         className={`
//           w-full max-w-md
//           h-full sm:h-auto
//           bg-white
//           sm:rounded-2xl
//           shadow-2xl
//           overflow-hidden
//           transform transition-all duration-500
//           ${isOpen ? "translate-y-0 scale-100" : "translate-y-10 scale-95"}
//         `}
//       >
//         {/* Header */}
//         <div className="h-16 bg-[#008069] text-white flex items-center px-4 gap-4">
//           <button
//             onClick={dispatch(setClose(true))}
//             className="p-2 rounded-full hover:bg-white/10 transition"
//           >
//             <ArrowLeft size={22} />
//           </button>

//           <div>
//             <h2 className="text-lg font-semibold">Edit Profile</h2>

//             <p className="text-xs text-white/80">
//               Change your profile information
//             </p>
//           </div>
//         </div>

//         {/* Body */}
//         <div className="p-6 overflow-y-auto max-h-[calc(100vh-64px)]">
//           {/* Profile Image */}
//           <div className="flex justify-center mb-8">
//             <div className="relative group">
//               <img
//                 src={preview}
//                 alt="profile"
//                 className="
//                   w-32 h-32
//                   rounded-full
//                   object-cover
//                   border-4 border-white
//                   shadow-xl
//                   transition-all duration-500
//                   group-hover:scale-105
//                 "
//               />

//               {/* Camera Button */}
//               <label
//                 htmlFor="profileImage"
//                 className="
//                   absolute bottom-1 right-1
//                   w-11 h-11
//                   rounded-full
//                   bg-[#00a884]
//                   text-white
//                   flex items-center justify-center
//                   cursor-pointer
//                   shadow-lg
//                   transition-all duration-300
//                   hover:scale-110
//                   hover:bg-[#008f72]
//                 "
//               >
//                 <Camera size={20} />

//                 <input
//                   id="profileImage"
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleImageChange}
//                 />
//               </label>
//             </div>
//           </div>

//           {/* Name */}
//           <div className="mb-6">
//             <label className="block text-sm text-gray-500 mb-2">Name</label>

//             <input
//               type="text"
//               name="name"
//               value={Profile?.name}
//               onChange={handleChange}
//               className="
//                 w-full
//                 border-b-2 border-gray-200
//                 focus:border-[#00a884]
//                 outline-none
//                 py-2
//                 text-gray-800
//                 transition-all duration-300
//               "
//               placeholder="Enter your name"
//             />
//           </div>

//           {/* About */}
//           <div className="mb-6">
//             <label className="block text-sm text-gray-500 mb-2">About</label>

//             <textarea
//               name="about"
//               value={Profile?.about}
//               onChange={handleChange}
//               rows="3"
//               className="
//                 w-full
//                 border-b-2 border-gray-200
//                 focus:border-[#00a884]
//                 outline-none
//                 py-2
//                 resize-none
//                 text-gray-800
//                 transition-all duration-300
//               "
//               placeholder="Write something about yourself"
//             />
//           </div>

//           {/* Phone */}
//           <div className="mb-8">
//             <label className="block text-sm text-gray-500 mb-2">Phone</label>

//             <div className="py-2 text-gray-700">{Profile?.phone}</div>

//             <p className="text-xs text-gray-400 mt-1">
//               Your phone number cannot be changed here.
//             </p>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3">
//             {/* Cancel */}
//             <button
//               onClick={dispatch(setClose(true))}
//               className="
//                 flex-1
//                 py-3
//                 rounded-xl
//                 border border-gray-300
//                 text-gray-600
//                 hover:bg-gray-100
//                 transition-all duration-300
//               "
//             >
//               Cancel
//             </button>

//             {/* Save */}
//             <button
//               onClick={handleSave}
//               disabled={isSaving}
//               className="
//                 flex-1
//                 py-3
//                 rounded-xl
//                 bg-[#00a884]
//                 text-white
//                 flex items-center justify-center gap-2
//                 hover:bg-[#008f72]
//                 active:scale-95
//                 transition-all duration-300
//                 disabled:opacity-60
//               "
//             >
//               {isSaving ? (
//                 <>
//                   <span
//                     className="
//                       w-5 h-5
//                       border-2 border-white/40
//                       border-t-white
//                       rounded-full
//                       animate-spin
//                     "
//                   />
//                   Saving...
//                 </>
//               ) : (
//                 <>
//                   <Check size={19} />
//                   Save
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileEdit;
