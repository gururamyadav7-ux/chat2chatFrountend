import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { acceptCall, rejectCall } from "../features/Call/CallSlice";

import socket from "../WebSocket/Socket";

function IncomingCall() {
  const dispatch = useDispatch();

  const ringtoneRef = useRef(null);

  const { incomingCall, callType } = useSelector((state) => {
    return state.call;
  });

  // =========================
  // RINGTONE
  // =========================

  useEffect(() => {
    if (!incomingCall) return;

    ringtoneRef.current = new Audio("/ringtone.mp3");

    ringtoneRef.current.loop = true;

    ringtoneRef.current.play().catch(() => {
      console.log("Browser blocked autoplay");
    });

    return () => {
      if (ringtoneRef.current) {
        ringtoneRef.current.pause();

        ringtoneRef.current.currentTime = 0;
      }
    };
  }, [incomingCall]);

  // =========================
  // NO INCOMING CALL
  // =========================

  if (!incomingCall) {
    return null;
  }

  const caller = incomingCall?.caller;

  // =========================
  // ACCEPT CALL
  // =========================

  const handleAccept = () => {
    if (ringtoneRef.current) {
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0;
    }

    dispatch(acceptCall());
  };

  // =========================
  // REJECT CALL
  // =========================

  const handleReject = () => {
    if (ringtoneRef.current) {
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0;
    }

    socket.emit("reject-call", {
      to: caller?._id,
    });

    dispatch(rejectCall());
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        overflow-hidden
        bg-slate-950
        p-4
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          -top-40
          -left-40
          h-96
          w-96
          rounded-full
          bg-emerald-500/20
          blur-[120px]
        "
      />

      <div
        className="
          absolute
          -bottom-40
          -right-40
          h-96
          w-96
          rounded-full
          bg-green-400/20
          blur-[120px]
        "
      />

      {/* Main Card */}

      <div
        className="
          relative
          flex
          h-[680px]
          w-full
          max-w-md
          flex-col
          items-center
          justify-between
          overflow-hidden
          rounded-[40px]
          border
          border-white/10
          bg-slate-900/80
          px-8
          py-10
          shadow-2xl
          backdrop-blur-xl
        "
      >
        {/* =====================
            TOP SECTION
        ====================== */}

        <div
          className="
            flex
            w-full
            items-center
            justify-between
          "
        >
          <div>
            <p
              className="
                text-sm
                font-medium
                tracking-wide
                text-slate-400
              "
            >
              INCOMING CALL
            </p>
          </div>

          <div
            className="
              rounded-full
              border
              border-white/10
              bg-white/5
              px-4
              py-2
              text-xs
              text-slate-300
            "
          >
            {callType === "video" ? "📹 Video Call" : "📞 Audio Call"}
          </div>
        </div>

        {/* =====================
            CALLER PROFILE
        ====================== */}

        <div
          className="
            relative
            flex
            items-center
            justify-center
          "
        >
          {/* Animated Rings */}

          <div
            className="
              absolute
              h-40
              w-40
              animate-ping
              rounded-full
              border
              border-emerald-400/30
            "
          />

          <div
            className="
              absolute
              h-52
              w-52
              animate-pulse
              rounded-full
              border
              border-emerald-400/20
            "
          />

          <div
            className="
              absolute
              h-64
              w-64
              animate-pulse
              rounded-full
              border
              border-emerald-400/10
            "
          />

          {/* Profile */}

          {caller?.profilePic ? (
            <img
              src={caller.profilePic}
              alt={caller?.name}
              className="
                relative
                z-10
                h-36
                w-36
                rounded-full
                border-4
                border-white/10
                object-cover
                shadow-2xl
              "
            />
          ) : (
            <div
              className="
                relative
                z-10
                flex
                h-36
                w-36
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-emerald-400
                to-green-600
                text-5xl
                font-bold
                text-white
                shadow-2xl
              "
            >
              {caller?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}
        </div>

        {/* =====================
            CALLER INFO
        ====================== */}

        <div className="text-center">
          <h1
            className="
              text-3xl
              font-semibold
              tracking-tight
              text-white
            "
          >
            {caller?.name || "Unknown User"}
          </h1>

          <p
            className="
              mt-3
              text-sm
              text-slate-400
            "
          >
            {callType === "video"
              ? "Incoming video call..."
              : "Incoming audio call..."}
          </p>

          {/* Ringing Dots */}

          <div
            className="
              mt-5
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <span
              className="
                h-2
                w-2
                animate-bounce
                rounded-full
                bg-emerald-400
              "
            />

            <span
              className="
                h-2
                w-2
                animate-bounce
                rounded-full
                bg-emerald-400
                [animation-delay:150ms]
              "
            />

            <span
              className="
                h-2
                w-2
                animate-bounce
                rounded-full
                bg-emerald-400
                [animation-delay:300ms]
              "
            />
          </div>
        </div>

        {/* =====================
            ACTION BUTTONS
        ====================== */}

        <div
          className="
            flex
            w-full
            items-center
            justify-around
          "
        >
          {/* DECLINE */}

          <div
            className="
              flex
              flex-col
              items-center
              gap-3
            "
          >
            <button
              onClick={handleReject}
              className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-red-500
                text-3xl
                text-white
                shadow-lg
                shadow-red-500/30
                transition-all
                duration-300
                hover:scale-110
                hover:bg-red-600
                active:scale-95
              "
              aria-label="Decline Call"
            >
              ✕
            </button>

            <span
              className="
                text-sm
                font-medium
                text-slate-300
              "
            >
              Decline
            </span>
          </div>

          {/* ACCEPT */}

          <div
            className="
              flex
              flex-col
              items-center
              gap-3
            "
          >
            <button
              onClick={handleAccept}
              className="
                flex
                h-20
                w-20
                animate-pulse
                items-center
                justify-center
                rounded-full
                bg-emerald-500
                text-3xl
                text-white
                shadow-lg
                shadow-emerald-500/40
                transition-all
                duration-300
                hover:scale-110
                hover:bg-emerald-600
                active:scale-95
              "
              aria-label="Accept Call"
            >
              {callType === "video" ? "📹" : "📞"}
            </button>

            <span
              className="
                text-sm
                font-medium
                text-slate-300
              "
            >
              Accept
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomingCall;
