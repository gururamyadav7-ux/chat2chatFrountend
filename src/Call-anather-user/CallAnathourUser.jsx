import { useDispatch } from "react-redux";

import { createCall, outgoingCall } from "../../redux/callSlice";

import { socket } from "../../socket/socket";

const dispatch = useDispatch();

const userId = localStorage.getItem("userId");

const startCall = async (receiver, type) => {
  const result = await dispatch(
    createCall({
      receiverId: receiver._id,
      type,
    }),
  );

  if (createCall.fulfilled.match(result)) {
    const call = result.payload;

    dispatch(
      outgoingCall({
        callId: call._id,

        callerId: userId,

        receiverId: receiver._id,

        caller: {
          _id: userId,
          name: "My Name",
        },

        type,
      }),
    );

    socket.emit("call:user", {
      callId: call._id,

      callerId: userId,

      receiverId: receiver._id,

      caller: {
        _id: userId,
        name: "My Name",
      },

      type,
    });
  }
};

export default startCall;
