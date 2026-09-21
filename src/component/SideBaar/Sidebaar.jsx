import { useDispatch } from "react-redux";
import {
  setOpenChate,
  setOpenStatus,
  setOpenChanel,
  setOpenCommunaty,
  setOpenMeadia,
  setOpenProfile,
} from "../../features/MenuStatus";

const Sidebaar = () => {
  const disPetch = useDispatch();
  return (
    <div className="w-20 h-full lg:h-full bg-gray-950 border-r border-gray-600 relative">
      <div className="text-white flex items-center gap-3 flex-col">
        <i
          onClick={() => {
            disPetch(setOpenChate());
          }}
          className=" p-2 rounded-full hover:bg-gray-800 cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            fill="currentColor"
          >
            <title>wds-ic-chat-filled</title>
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M22 6.67C22 5.19 20.8 4 19.33 4H1.8a1 1 0 0 0-.85 1.53L3 9v8.33C3 18.81 4.2 20 5.67 20h13.66c1.48 0 2.67-1.2 2.67-2.67V6.67ZM7 10a1 1 0 0 1 1-1h9a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H8Z"
              clipRule="evenodd"
            ></path>
          </svg>
        </i>
        <i
          onClick={() => {
            disPetch(setOpenStatus());
          }}
          className=" p-2 rounded-full hover:bg-gray-800 cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            fill="currentColor"
          >
            <title>wds-ic-status</title>
            <path
              fill="currentColor"
              d="M13.56 3.14c.1-.55.62-.92 1.15-.77a10 10 0 0 1 6.98 12.1.91.91 0 0 1-1.23.6c-.52-.18-.78-.75-.66-1.3a8 8 0 0 0-5.44-9.41c-.53-.17-.9-.68-.8-1.22Zm5.34 14.65c.42.35.48.98.08 1.37a10 10 0 0 1-13.96 0c-.4-.39-.34-1.02.08-1.38a1.11 1.11 0 0 1 1.46.09 8 8 0 0 0 10.88 0c.4-.38 1.03-.44 1.45-.09ZM3.54 15.08c-.52.19-1.1-.08-1.23-.62A10 10 0 0 1 9.29 2.37c.53-.15 1.05.22 1.15.77.1.54-.27 1.05-.8 1.22a8 8 0 0 0-5.44 9.42c.12.54-.14 1.1-.66 1.3Z"
            ></path>
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
              clipRule="evenodd"
            ></path>
          </svg>
        </i>

        <i
          onClick={() => {
            disPetch(setOpenChanel());
          }}
          className=" p-2 rounded-full hover:bg-gray-800 cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            fill="currentColor"
          >
            <title>wds-ic-channels</title>
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M15.83 8.63A1 1 0 0 1 17.2 9a5.98 5.98 0 0 1 0 6 1 1 0 0 1-1.73-1 3.98 3.98 0 0 0 0-4 1 1 0 0 1 .36-1.37Zm-7.66 0A1 1 0 0 1 8.53 10a3.98 3.98 0 0 0 0 4 1 1 0 0 1-1.73 1 5.98 5.98 0 0 1 0-6 1 1 0 0 1 1.37-.37Z"
              clipRule="evenodd"
            ></path>
            <path
              fill="currentColor"
              d="M13.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
            ></path>
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="m5.33 16.48-.23.8c-.24.77-.48 1.6-.68 2.3.7-.2 1.53-.44 2.3-.68l.8-.23.72.39a8 8 0 1 0-3.3-3.3l.4.72Zm-2.15.22A48.91 48.91 0 0 0 2 21a1 1 0 0 0 1 1c.31 0 2.46-.63 4.3-1.18a10 10 0 1 0-4.12-4.12Z"
              clipRule="evenodd"
            ></path>
          </svg>
        </i>
        <i
          onClick={() => {
            disPetch(setOpenCommunaty());
          }}
          className=" p-2 rounded-full hover:bg-gray-800 cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            fill="currentColor"
          >
            <title>wds-ic-communities</title>
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M6.37 18.67a1.81 1.81 0 0 1-.58-1.24c-.01-.5-.03-1.5.03-1.94a2.7 2.7 0 0 1 .4-1.1 2.84 2.84 0 0 1 .9-.82c.46-.28.98-.46 1.4-.58A12.2 12.2 0 0 1 12 12.5a12.69 12.69 0 0 1 3.47.49 5.76 5.76 0 0 1 1.52.65c.28.19.56.44.78.76a2.41 2.41 0 0 1 .41 1.1c.06.43.04 1.43.03 1.93a1.9 1.9 0 0 1-.58 1.24c-.22.2-.48.33-.75.33H7.12c-.27 0-.53-.13-.75-.33Zm13.6-3.27c.04.6.03.86.02 1.6v.49a4.58 4.58 0 0 1-.3 1.51h2.97c.72 0 1.31-1.85 1.33-2.58.01-.4.02-.13-.02-.46a2.34 2.34 0 0 0-.95-1.6 4.27 4.27 0 0 0-1.41-.68h-.02v-.01a7.72 7.72 0 0 0-2.35-.27 4.18 4.18 0 0 1 .72 2Zm-2.04-3.95a2.65 2.65 0 0 0 3.16.06 2.67 2.67 0 1 0-3.16-.06ZM14.9 9.62A3.54 3.54 0 0 0 15.5 7a3.56 3.56 0 1 0-.61 2.62Zm-7.88.4a2.67 2.67 0 1 0-5.16-1.38 2.67 2.67 0 0 0 5.16 1.38Zm-4.42 3.6-.18.05h-.03a4.3 4.3 0 0 0-1.41.69 2.3 2.3 0 0 0-.95 1.6c-.04.33-.03 1.06-.02 1.46.02.73.61 1.58 1.33 1.58H4.3a4.58 4.58 0 0 1-.3-1.51V17c-.01-.74-.02-1 .03-1.6 0-.05 0-.1.02-.15a4.48 4.48 0 0 1 .7-1.85 7.22 7.22 0 0 0-2.16.22Zm9.4.88c-1.21 0-2.22.2-2.92.4-.37.12-.68.23-.91.38-.23.13-.3.25-.34.34a.7.7 0 0 0-.03.14s0-.01 0 0L7.79 17h8.42v-1.24c-.01-.01 0 .01 0 0a.7.7 0 0 0-.04-.14c-.03-.09-.11-.2-.34-.34a3.84 3.84 0 0 0-.91-.37c-.7-.2-1.7-.41-2.92-.41ZM12 6a1.55 1.55 0 1 0 0 3.11c.86 0 1.56-.7 1.56-1.55C13.56 6.7 12.86 6 12 6Z"
              clipRule="evenodd"
            ></path>
          </svg>
        </i>
        <div className="w-4/5 h-[0.2px] bg-gray-400"></div>
        <i className=" p-2 rounded-full hover:bg-gray-800 cursor-pointer">
          <img
            className="w-8"
            alt=""
            src="https://static.whatsapp.net/rsrc.php/yS/r/T_xj3a3ApC9.webp"
          ></img>
        </i>
      </div>
      <div className="w-full flex flex-col gap-3 items-center absolute bottom-3 left-0">
        <div className="text-white">
          <i
            onClick={() => {
              disPetch(setOpenMeadia());
            }}
            className="p-2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-800 cursor-pointer"
          >
            <svg
              viewBox="0 0 24 24"
              height="24"
              width="24"
              preserveAspectRatio="xMidYMid meet"
              fill="currentColor"
            >
              <title>ic-filter</title>
              <path
                fill="currentColor"
                d="M13.25 12.5 12.1 11a.48.48 0 0 0-.4-.2c-.17 0-.3.07-.4.2l-1.68 2.2a.47.47 0 0 0-.06.53c.1.18.25.27.46.27h7.96c.21 0 .37-.1.46-.28.09-.18.07-.35-.07-.52l-2.42-3.17a.48.48 0 0 0-.4-.2c-.17 0-.3.06-.4.2l-1.9 2.47ZM8 18c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41V4c0-.55.2-1.02.59-1.41C6.98 2.19 7.45 2 8 2h12c.55 0 1.02.2 1.41.59.4.39.59.86.59 1.41v12c0 .55-.2 1.02-.59 1.41-.39.4-.86.59-1.41.59H8Zm0-2h12V4H8v12Zm-4 6c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41V7c0-.28.1-.52.29-.71.19-.2.43-.29.71-.29.28 0 .52.1.71.29.2.19.29.43.29.71v13h13c.28 0 .52.1.71.29.2.19.29.43.29.71 0 .28-.1.52-.29.71A.94.94 0 0 1 17 22H4Z"
              ></path>
            </svg>
          </i>
        </div>

        <img
          onClick={() => {
            disPetch(setOpenProfile());
          }}
          className="w-[60%] rounded-full cursor-pointer"
          src="https://img.lovepik.com/png/20231125/man-avatar-image-for-profile-child-diverse-guy_693690_wh860.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Sidebaar;
