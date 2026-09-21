import { useState } from "react";

const Messageresiving = () => {
  const [message, setmessage] = useState([]);
  return (
    <div className="w-full flex flex-col items-start p-3">
      {message.map((message) => (
        <div className=" bg-gray-200 shadowbox rounded-xl w-[50%] text-start p-3 mt-2">
          <div key={message.id} className={`${message.sender}`}>
            {message.text}
          </div>
          <span>10:30 AM</span>
        </div>
      ))}
    </div>
  );
};

export default Messageresiving;
