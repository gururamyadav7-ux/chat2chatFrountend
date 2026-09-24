import { RiMoneyRupeeCircleLine } from "react-icons/ri";

import { CiCamera } from "react-icons/ci";

import LongMenu from "../setting/Setting";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import CameraComponent from "../userSection/Camra";

const LogoBaar = () => {
  const Nevigate = useNavigate()
  const [openCamera, setOpenCamera] = useState(false);
  const [image, setImage] = useState(null);
  const handleCapture = (photo) => {
    setImage(photo);
    console.log("Captured Image:", photo);
  };
  return (
    <header className="h-[8%] flex justify-between  items-center">
      <h1 className="text-green-500 text-3xl font-bold">Wordwav</h1>
      <div className="flex gap-4">
        <RiMoneyRupeeCircleLine onClick={() => Nevigate("/Payments")} className="text-white text-2xl" />
        <div>

          <button
            onClick={() => setOpenCamera(true)}
          >
            <CiCamera className="text-white text-2xl" />
          </button>

          {image && (
            <img
              src={image}
              alt="profile"
              className="mt-5 w-40 h-40 object-cover rounded-lg"
            />
          )}

          {openCamera && (
            <CameraComponent
              onClose={() => setOpenCamera(false)}
              onCapture={handleCapture}
            />
          )}

        </div>
        <LongMenu />
      </div>

    </header>
  );
};

export default LogoBaar;
