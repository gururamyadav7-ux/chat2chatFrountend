import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../features/AllUserSlice";

import { setchatProfile } from "../../features/AllUserSlice";
import { accessChat } from "../../features/chat/ChatAccsesSlice";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const nevigate = useNavigate()
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => {
    return state.user;
  });
  const Alluser = users.users;

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <section className="w-full scrollBarhaid overflow-y-scroll mt-4 flex flex-col gap-3 cursor-pointer ">
      {Alluser &&
        Alluser.map((user) => (
          <button
            onClick={() => {
              nevigate("/chatSection")
              dispatch(
                accessChat({
                  userId: user._id,
                }),
              );
              dispatch(setchatProfile(user));
            }}
            key={user._id}
            className={`flex items-center shadowbox px-2 bg-white rounded-xl cursor-pointer hover:bg-gray-200 `}
          >
            <div className="w-11 h-11 overflow-hidden rounded-full bg-blue-400 text-white font-bold  flex items-center justify-center">
              <img src={user.profilePic} alt="" />
            </div>

            <div className="w-[90%] py-3 px-2  flex flex-col">
              <div className="flex  justify-between">
                <b>{user.name}</b>
                <span>{user.time}</span>
                <span>{user.phone}</span>
              </div>
              <p className="w-full text-start">{user.chatNow}</p>
            </div>
          </button>
        ))}
    </section>
  );
};

export default Users;
