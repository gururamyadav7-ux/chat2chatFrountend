import { useState } from "react";

const LinkedDevices = () => {
  const [showQR, setShowQR] = useState(false);

  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "Chrome • Windows",
      location: "Last active today at 4:20 PM",
      icon: "💻",
    },
    {
      id: 2,
      name: "Microsoft Edge • Windows",
      location: "Last active yesterday",
      icon: "💻",
    },
  ]);

  const logoutDevice = (id) => {
    setDevices((prev) => prev.filter((device) => device.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7]">

      {/* Header */}
      <div className="flex items-center gap-4 bg-[#008069] px-4 py-4 text-white">
        <button className="text-2xl">←</button>

        <div>
          <h1 className="text-lg font-semibold">Linked devices</h1>
          <p className="text-xs text-white/80">
            Manage your linked devices
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto max-w-md">

        {/* Link Device */}
        <button
          onClick={() => setShowQR(true)}
          className="flex w-full items-center gap-4 border-b bg-white px-5 py-5 text-left transition hover:bg-gray-50"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d9fdd3] text-2xl">
            🔗
          </div>

          <div>
            <h2 className="font-medium text-gray-900">
              Link a device
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Scan QR code to link a new device
            </p>
          </div>
        </button>

        {/* Info */}
        <div className="px-5 py-6 text-center">
          <div className="mx-auto mb-3 text-5xl">📱</div>

          <h2 className="font-medium text-gray-800">
            Use WhatsApp on your computer
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Link your phone to your computer or other devices
            to use WhatsApp on them.
          </p>
        </div>

        {/* Device Heading */}
        <div className="bg-[#f0f2f5] px-5 py-3">
          <p className="text-sm font-medium text-gray-600">
            Linked devices
          </p>
        </div>

        {/* Devices */}
        <div className="bg-white">

          {devices.length === 0 ? (
            <div className="px-5 py-8 text-center text-gray-500">
              No linked devices
            </div>
          ) : (
            devices.map((device) => (
              <div
                key={device.id}
                className="flex items-center gap-4 border-b px-5 py-4"
              >
                {/* Device Icon */}
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-2xl">
                  {device.icon}
                </div>

                {/* Device Info */}
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">
                    {device.name}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {device.location}
                  </p>
                </div>

                {/* Logout */}
                <button
                  onClick={() => logoutDevice(device.id)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            ))
          )}

        </div>

        {/* Security Info */}
        <div className="px-5 py-6 text-center">
          <p className="text-xs leading-5 text-gray-500">
            Your messages are end-to-end encrypted. Devices you
            link will have access to your WhatsApp account.
          </p>
        </div>
      </div>

      {/* QR Modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">

          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">

            {/* Modal Header */}
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Link a device
              </h2>

              <button
                onClick={() => setShowQR(false)}
                className="text-2xl text-gray-500 hover:text-gray-800"
              >
                ×
              </button>
            </div>

            {/* QR Demo */}
            <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-lg border-4 border-gray-200 bg-gray-100">
              <div className="text-center">
                <div className="text-7xl">▦</div>
                <p className="mt-2 text-xs text-gray-500">
                  QR Code
                </p>
              </div>
            </div>

            <p className="mt-5 text-center text-sm text-gray-600">
              Open WhatsApp on your phone and scan this QR code
              to link this device.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowQR(false)}
                className="flex-1 rounded-lg border border-gray-300 py-3 font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={() => setShowQR(false)}
                className="flex-1 rounded-lg bg-[#008069] py-3 font-medium text-white hover:bg-[#006e5c]"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default LinkedDevices;