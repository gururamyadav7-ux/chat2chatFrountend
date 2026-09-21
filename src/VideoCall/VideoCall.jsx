import { useEffect, useRef, useState } from "react";

import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";

import { useDispatch } from "react-redux";

import {
  endCall,
  callEnded,
  setMuted,
  setCameraEnabled,
} from "../../redux/callSlice";

import socket from "../WebSocket/Socket";

import { useWebRTC } from "../../hooks/useWebRTC";

const VideoCall = ({ call }) => {
  const dispatch = useDispatch();

  const localVideoRef = useRef(null);

  const remoteVideoRef = useRef(null);

  const userId = localStorage.getItem("userId");

  const [seconds, setSeconds] = useState(0);

  const { localStream, remoteStream, getMedia, createOffer, cleanup } =
    useWebRTC({
      callId: call.callId,

      localUserId: userId,

      remoteUserId: call.callerId === userId ? call.receiverId : call.callerId,

      active: true,

      type: call.type,
    });

  // ========================================
  // START MEDIA
  // ========================================

  useEffect(() => {
    let mounted = true;

    const start = async () => {
      try {
        await getMedia();

        // Caller creates offer

        if (String(call.callerId) === String(userId)) {
          setTimeout(() => {
            if (mounted) {
              createOffer();
            }
          }, 500);
        }
      } catch (error) {
        console.error("Media error:", error);
      }
    };

    start();

    return () => {
      mounted = false;
    };
  }, []);

  // ========================================
  // VIDEO ELEMENTS
  // ========================================

  useEffect(() => {
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStream || null;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream || null;
    }
  }, [remoteStream]);

  // ========================================
  // TIMER
  // ========================================

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const min = Math.floor(seconds / 60);

    const sec = seconds % 60;

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  // ========================================
  // MUTE
  // ========================================

  const toggleMute = () => {
    if (!localStream) return;

    const audioTrack = localStream.getAudioTracks()[0];

    if (!audioTrack) return;

    audioTrack.enabled = !audioTrack.enabled;

    const muted = !audioTrack.enabled;

    dispatch(setMuted(muted));

    socket.emit("call:mute", {
      targetUserId: call.callerId === userId ? call.receiverId : call.callerId,

      muted,
    });
  };

  // ========================================
  // CAMERA
  // ========================================

  const toggleCamera = () => {
    if (!localStream) return;

    const videoTrack = localStream.getVideoTracks()[0];

    if (!videoTrack) return;

    videoTrack.enabled = !videoTrack.enabled;

    const enabled = videoTrack.enabled;

    dispatch(setCameraEnabled(enabled));

    socket.emit("call:camera", {
      targetUserId: call.callerId === userId ? call.receiverId : call.callerId,

      enabled,
    });
  };

  // ========================================
  // END
  // ========================================

  const handleEnd = async () => {
    await dispatch(endCall(call.callId));

    socket.emit("call:ended", {
      callId: call.callId,

      callerId: call.callerId,

      receiverId: call.receiverId,
    });

    cleanup();

    dispatch(callEnded());
  };

  return (
    <div className="fixed inset-0 z-[90] bg-black">
      {/* REMOTE VIDEO */}

      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />

      {/* AUDIO CALL */}

      {call.type === "audio" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="w-32 h-32 rounded-full bg-gray-700 mx-auto flex items-center justify-center text-4xl">
              👤
            </div>

            <h2 className="text-2xl mt-5">{call.caller?.name || "Calling"}</h2>

            <p className="text-gray-300 mt-2">{formatTime()}</p>
          </div>
        </div>
      )}

      {/* LOCAL VIDEO */}

      {call.type === "video" && (
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="absolute right-4 top-4 w-32 md:w-48 aspect-video rounded-xl object-cover border-2 border-white"
        />
      )}

      {/* TIMER */}

      <div className="absolute top-5 left-5 text-white">{formatTime()}</div>

      {/* CONTROLS */}

      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-5">
        <button
          onClick={toggleMute}
          className="w-14 h-14 rounded-full bg-white/20 text-white flex items-center justify-center"
        >
          {localStream?.getAudioTracks()[0]?.enabled ? <Mic /> : <MicOff />}
        </button>

        {call.type === "video" && (
          <button
            onClick={toggleCamera}
            className="w-14 h-14 rounded-full bg-white/20 text-white flex items-center justify-center"
          >
            {localStream?.getVideoTracks()[0]?.enabled ? (
              <Video />
            ) : (
              <VideoOff />
            )}
          </button>
        )}

        <button
          onClick={handleEnd}
          className="w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center"
        >
          <PhoneOff />
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
