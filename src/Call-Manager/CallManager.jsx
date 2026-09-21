import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  incomingCall,
  outgoingCall,
  callAccepted,
  callRejected,
  callEnded,
  setRemoteMuted,
  setRemoteCameraEnabled,
  resetCall,
} from "../../redux/callSlice";

import { socket } from "../../socket/socket";

import IncomingCall from "./IncomingCall";
import OutgoingCall from "./OutgoingCall";
import VideoCall from "./VideoCall";

const CallManager = () => {
  const dispatch = useDispatch();

  const call = useSelector((state) => state.call);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // ======================================
    // INCOMING
    // ======================================

    const incomingHandler = (data) => {
      dispatch(incomingCall(data));
    };

    // ======================================
    // ACCEPTED
    // ======================================

    const acceptedHandler = (data) => {
      dispatch(callAccepted());
    };

    // ======================================
    // REJECTED
    // ======================================

    const rejectedHandler = (data) => {
      dispatch(callRejected());

      setTimeout(() => {
        dispatch(resetCall());
      }, 1000);
    };

    // ======================================
    // ENDED
    // ======================================

    const endedHandler = (data) => {
      dispatch(callEnded());
    };

    // ======================================
    // REMOTE MUTE
    // ======================================

    const remoteMuteHandler = ({ muted }) => {
      dispatch(setRemoteMuted(muted));
    };

    // ======================================
    // REMOTE CAMERA
    // ======================================

    const remoteCameraHandler = ({ enabled }) => {
      dispatch(setRemoteCameraEnabled(enabled));
    };

    socket.on("call:incoming", incomingHandler);

    socket.on("call:accepted", acceptedHandler);

    socket.on("call:rejected", rejectedHandler);

    socket.on("call:ended", endedHandler);

    socket.on("call:remote-mute", remoteMuteHandler);

    socket.on("call:remote-camera", remoteCameraHandler);

    return () => {
      socket.off("call:incoming", incomingHandler);

      socket.off("call:accepted", acceptedHandler);

      socket.off("call:rejected", rejectedHandler);

      socket.off("call:ended", endedHandler);

      socket.off("call:remote-mute", remoteMuteHandler);

      socket.off("call:remote-camera", remoteCameraHandler);
    };
  }, [dispatch]);

  // ========================================
  // INCOMING
  // ========================================

  if (call.incoming) {
    return <IncomingCall call={call} />;
  }

  // ========================================
  // OUTGOING
  // ========================================

  if (call.outgoing) {
    return <OutgoingCall call={call} />;
  }

  // ========================================
  // ACTIVE
  // ========================================

  if (call.active) {
    return <VideoCall call={call} />;
  }

  return null;
};

export default CallManager;
