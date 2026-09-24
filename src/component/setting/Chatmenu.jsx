import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const Chatmenu = () => {
  const navigate = useNavigate()
  const [OpenSlid, setOpenSlid] = useState(false)
  const [active, setactive] = useState("")
  const menuList = [
    { id: 1, name: "Add members" },
    { id: 2, name: "Group info" },
    { id: 3, name: "Group media" },
    { id: 4, name: "Search" },
    { id: 5, name: "Mute notifications" },
    { id: 6, name: "Disappearing messages" },
    { id: 7, name: "Chat theme" },
    { id: 8, name: "more" }
  ];


  const handelMenuClick = (item) => {
    switch (item.name) {
      case "New group":
        setactive("New group")
        navigate("/Newgroup");
        break;
      case "New community":
        setactive("New community")
        navigate("/Newcommunity");
        break;
      case "Brodcast lists":
        setactive("Brodcast lists")
        navigate("/Brodcastlists");
        break;
      case "Linked devices":
        setactive("Linked devices")
        navigate("/Linkeddevices");
        break;
      case "Starred":
        setactive("Starred")
        navigate("/Starred");
        break;
      case "Payments":
        setactive("Payments")
        navigate("/Payments");
        break;
      case "Read all":
        setactive("Read all")
        navigate("/Readall");
        break;
      case "Settings":
        setactive("Settings")
        navigate("/Settings");
        break;
    }

  }

  return (
    <div className=" relative">
      <i className=" cursor-pointer" onClick={() => setOpenSlid(!OpenSlid)}>
        <BsThreeDotsVertical className="text-black text-2xl" />
      </i>
      {OpenSlid ?
        <div className="text-white w-38 font-medium text-[14px] absolute top-full right-0 flex flex-col gap-2 bg-gray-950 p-5 rounded-xl">
          {menuList.map((item) => (
            <Link key={item.id} onClick={() => handelMenuClick(item)} className={`${active === item ? "text-blue-500" : "text-white"}`}>
              {item.name}
            </Link>
          ))}
        </div> : ""
      }
    </div >
  )
}

export default Chatmenu

