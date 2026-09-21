import { RiMoneyRupeeCircleLine } from "react-icons/ri";

import { CiCamera } from "react-icons/ci";

import LongMenu from "../setting/Setting";

const LogoBaar = () => {
  return (
    <header className="h-16 flex justify-between  items-center">
      <h1 className="text-green-500 text-3xl font-bold">WhatsApp</h1>
      <div className="flex gap-4">
        <RiMoneyRupeeCircleLine className="text-white text-2xl" />
        <CiCamera className="text-white text-2xl" />
        <LongMenu />
      </div>
    </header>
  );
};

export default LogoBaar;
