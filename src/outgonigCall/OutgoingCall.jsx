import React from "react";

import { PhoneOff, Video, Phone } from "lucide-react";

import { useDispatch } from "react-redux";

import { endCall, callEnded } from "../../redux/callSlice";

import { socket } from "../../socket/socket";

const OutgoingCall = ({ call }) => {
  const dispatch = useDispatch();

  const userId = localStorage.getItem("userId");

  const handleCancel = async () => {
    await dispatch(endCall(call.callId));

    socket.emit("call:ended", {
      callId: call.callId,

      callerId: userId,

      receiverId: call.receiverId,
    });

    dispatch(callEnded());
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center">
      <div className="bg-white rounded-3xl w-[320px] p-7 text-center">
        <img
          src={call.caller?.profilePic || "https://i.pravatar.cc/150"}
          className="w-24 h-24 rounded-full mx-auto"
          alt="user"
        />

        <h2 className="font-bold text-xl mt-4">
          {call.caller?.name || "Calling..."}
        </h2>

        <p className="text-gray-500">Calling...</p>

        <button
          onClick={handleCancel}
          className="mt-8 w-14 h-14 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto"
        >
          <PhoneOff />
        </button>
      </div>
    </div>
  );
};

export default OutgoingCall;
