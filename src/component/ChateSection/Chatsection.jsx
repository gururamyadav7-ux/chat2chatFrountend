import Chatmenu from "../setting/Chatmenu";
import { useEffect, useRef, useState } from "react";

// socket message

import socket from "../../WebSocket/Socket";

// icon
import { IoIosCall } from "react-icons/io";
import { FaVideo } from "react-icons/fa6";
import { LuPaperclip } from "react-icons/lu";
import { TbCoinRupee } from "react-icons/tb";
import { HiOutlineCamera } from "react-icons/hi";
import { TiMicrophone } from "react-icons/ti";
import { IoMdArrowRoundBack } from "react-icons/io";
// Hook 
import { useDispatch, useSelector } from "react-redux";

import { setMessage, setMessages } from "../../features/chat/chat.Slice";
import { useNavigate } from "react-router-dom";

const Chatsection = () => {
  const nevigate = useNavigate()
  const Dispetch = useDispatch();
  const { chatProfile } = useSelector((state) => {
    return state.AllUser;
  });
  const { message, messages } = useSelector((state) => {
    return state.chat;
  });
  // Send Icon 
  const [SendIcon, setSendIcon] = useState(false)

  // localStorage se user ko get karna
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  // massge ko get karne ke liye current user id aur selected user id
  const SenderUserId = userId;
  const ResiverUserId = chatProfile?._id;
  const messagesEndRef = useRef(null);

  // animation for call
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // =====================================
  // 1. SOCKET IO SERVER
  // =====================================
  useEffect(() => {
    if (!SenderUserId) return;
    socket.connect();

    socket.emit("register", SenderUserId);

    socket.on("onlineUsers", (data) => {
      console.log(data);
    });
  }, [SenderUserId]);

  /// send message
  const sendMessage = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const newMessage = {
      text: message,
      senderId: SenderUserId,
      receiverId: ResiverUserId,
      createdAt: new Date().toISOString(),
    };
    // Array me message add
    Dispetch(setMessages(newMessage));

    // Socket se send
    socket.emit("sendmessage", newMessage);

    socket.on("resivmessage", (data) => {
      Dispetch(setMessages(data));
    });

    // Input clear
    Dispetch(setMessage(""))
    setSendIcon(false)
  };

  return (
    <section className=" lg:w-[60%] h-screen border relative from-slate-900 via-slate-800 to-slate-900">
      {chatProfile ? (
        <header className=" relative h-[8%] w-full flex items-center gap-2 p-2 bg-gray-200">
          <i onClick={() => nevigate("/chat")}>
            <IoMdArrowRoundBack />
          </i>
          <div className="flex gap-2">
            <div className="w-11 h-11 rounded-full overflow-hidden bg-blue-600 text-white font-bold  flex items-center justify-center">
              <img
                src={
                  chatProfile?.profilePic ||
                  "https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                }
                alt=""
              />
            </div>
            <div>
              <b>{chatProfile?.name}</b>
              <p>{chatProfile?.isOnline ? "Online" : "Offline"}</p>
            </div>
          </div>
          <div className="flex  absolute right-0 items-center gap-2">
            <FaVideo className="text-xl" />
            <IoIosCall className="text-2xl" />
            <Chatmenu />
          </div>
        </header>
      ) : (
        ""
      )}

      <div
        className={`flex-1 overflow-y-scroll [&::-webkit-scrollbar]:hidden ${chatProfile ? "h-[86%]" : "h-[93%]"} space-y-4  bg-slate-950/50 p-6`}
      >
        <div className="flex justify-center">
          <span className="rounded-full bg-slate-800 px-4 py-2 text-xs text-slate-400">
            Today
          </span>
        </div>

        {messages.length === 0 && (
          <div className="flex h-3/4 items-center justify-center">
            <div className="text-center">
              <div className="text-5xl">👋</div>

              <h2 className="mt-4 text-xl font-semibold text-white">
                Start a conversation
              </h2>

              <p className="mt-2 text-slate-400">
                Send a message to start chatting
              </p>
            </div>
          </div>
        )}

        {messages.map((item) => {
          const isMe = item.senderId === userId;

          return (
            <div
              key={item.id}
              className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-lg ${isMe
                  ? "rounded-br-sm bg-green-500 text-white"
                  : "rounded-bl-sm bg-slate-800 text-slate-100"
                  }`}
              >
                <p className="wrap-break-word">{item.text}</p>
                <div
                  className={`mt-1 flex justify-end text-[10px] ${isMe ? "text-green-100" : "text-slate-400"
                    }`}
                >
                  {item.createdAt}

                  {isMe && <span className="ml-1">✓✓</span>}
                </div>
              </div>
            </div>
          );
        })}

        {/* <div ref={messagesEndRef} /> */}
      </div>

      <form className=" h-[7%] bg-amber-900 absolute flex items-center justify-center gap-2 bottom-0 w-full right-0">
        <div className=" h-9 w-[80%] relative">
          <span className="text-xl cursor-pointer absolute top-[50%] -translate-y-[50%] left-2 ">😊</span>
          <div className=" flex gap-3 absolute top-[50%] -translate-y-[50%] right-4">
            <i><LuPaperclip className=" cursor-pointer text-xl text-gray-500 -rotate-45" /></i>
            <i><TbCoinRupee className="text-xl cursor-pointer text-gray-500" /></i>
            <i><HiOutlineCamera className="text-xl cursor-pointer text-gray-500" /></i>
          </div>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => {
              Dispetch(setMessage(e.target.value))
              setSendIcon(true)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className=" h-full w-full bg-white pl-10 rounded-3xl focus:border-2 shadowbox border-green-500 outline-none "
          />

        </div>

        {SendIcon ? <button
          onClick={sendMessage}
          className="ml-2 text-3xl text-green-500 cursor-pointer
           "
          type="submit"
        >
          ➤
        </button> : <i><TiMicrophone className=" rounded-full text-green-500
         cursor-pointer text-3xl " /> </i>}

      </form>
    </section>
  );
};

export default Chatsection;
