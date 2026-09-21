
import { HiCurrencyRupee } from "react-icons/hi2";
import { MdStars } from "react-icons/md";
import { MonitorSmartphone } from "lucide-react";
import { BsKeyFill } from "react-icons/bs";
import { FaLock } from "react-icons/fa6";
import { PiUserListFill } from "react-icons/pi";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoMdColorPalette } from "react-icons/io";
import { MdOutlineBroadcastOnHome } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { FaCircleNotch } from "react-icons/fa";
import { FaPeopleLine } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { MdOutlineSupervisedUserCircle } from "react-icons/md";
import { MdAccessibility } from "react-icons/md";
import { MdOutlineSecurityUpdateGood } from "react-icons/md";
import { FaInfinity } from "react-icons/fa6";

// heder icon 
import { IoSearchSharp } from "react-icons/io5";
import { BiQrScan } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";

const SettingsPhone = ({ onBack }) => {
    const settings = [
        {
            icon: <HiCurrencyRupee />,
            title: "Payments",
            subtitle: ""
        },
        {
            icon: <MdStars />,
            title: "Subscriptions",
            subtitle: "Explore premium benefits"
        },
        {
            icon: <MonitorSmartphone size={25} />,
            title: "Linked devices",
            subtitle: "Use WhatsApp on other devices "
        },
        {
            icon: <BsKeyFill />,
            title: "Account",
            subtitle: "Security notifications, change number",
        },
        {
            icon: <FaLock />,
            title: "Privacy",
            subtitle: "Block contacts, disappearing messages",
        },
        {
            icon: <PiUserListFill />,
            title: "Lists",
            subtitle: "Manage people and group",
        },
        {
            icon: <IoChatbubbleEllipses />,
            title: "Chats",
            subtitle: "Theme, wallpapers, chat history",
        },
        {
            icon: <IoMdColorPalette />,
            title: "Appearance",
            subtitle: "Chat theme, app icon, app theme ",
        },
        {
            icon: <MdOutlineBroadcastOnHome />,
            title: "Broadcasts",
            subtitle: "Manage lists and send broadcasts",
        },
        {
            icon: <IoIosNotifications />,
            title: "Notifications",
            subtitle: "Message, group & call tones",
        },
        {
            icon: <FaCircleNotch />,
            title: "Storage and data",
            subtitle: "Network usage, auto-download",
        },
        {
            icon: <MdOutlineSupervisedUserCircle />,
            title: "Perental controls",
            subtitle: "Settings for your family",
        },
        {
            icon: <MdAccessibility />,
            title: "Accessibility",
            subtitle: "increase contrast, animation",
        },
        {
            icon: <IoMdHelpCircleOutline />,
            title: "Help and feedback",
            subtitle: "Help center, contact us, privacy policy",
        },
        {
            icon: <FaPeopleLine />,
            title: "Invite a friend",
            subtitle: "",
        },
        {
            icon: <MdOutlineSecurityUpdateGood />,
            title: "App updates",
            subtitle: "",
        },
        {
            icon: <FaInfinity />,
            title: "Accounts Center",
            subtitle: "Control your experience across Whatsapp, Facebook, instagram and more",
        },
    ];

    return (
        <div className="min-h-screen bg-[#f7f7f7]">

            {/* Header */}
            <div className="sticky top-0 z-20 flex items-center gap-4 bg-[#008069] px-4 py-4 text-white shadow">

                <button
                    onClick={onBack}
                    className="text-2xl transition hover:scale-110"
                >
                    ←
                </button>

                <h1 className="text-xl font-semibold">
                    Settings
                </h1>
                <div className="flex gap-3 absolute right-2 items-center text-2xl">
                    <i><IoSearchSharp /></i>
                    <i><BiQrScan /></i>
                    <i><MdOutlineEdit /></i>
                </div>

            </div>

            <div className="mx-auto max-w-md">

                {/* Profile */}
                <div className="flex flex-col items-center gap-4 border-b bg-white px-5 py-5">

                    {/* Profile Image */}
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-3xl">
                        <FaUser />
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Gururam
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Available
                        </p>
                    </div>

                </div>

                {/* Settings List */}
                <div className="mt-2 bg-white">

                    {settings.map((item, index) => (
                        <button
                            key={index}
                            className="flex w-full items-center gap-5 px-5 py-4 text-left transition hover:bg-gray-50"
                        >

                            {/* Icon */}
                            <div className="flex h-10 w-10 items-center justify-center text-2xl">
                                {item.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1">

                                <h3 className="font-medium text-gray-800">
                                    {item.title}
                                </h3>

                                {item.subtitle && (
                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        {item.subtitle}
                                    </p>
                                )}

                            </div>

                            {/* Arrow */}
                            <span className="text-gray-400 text-xl">
                                ›
                            </span>

                        </button>
                    ))}

                </div>

                {/* Footer */}
                <div className="px-5 py-8 text-center">

                    <p className="text-xs text-gray-400">
                        from
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-500">
                        Meta
                    </p>

                </div>

            </div>
        </div>
    );
};

export default SettingsPhone;