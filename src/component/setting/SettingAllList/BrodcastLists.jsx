
import { useState } from "react";

const BroadcastLists = ({ onClose }) => {
  const [search, setSearch] = useState("");

  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Rahul",
      phone: "9876543210",
      selected: false,
    },
    {
      id: 2,
      name: "Amit",
      phone: "9876543211",
      selected: false,
    },
    {
      id: 3,
      name: "Rohit",
      phone: "9876543212",
      selected: false,
    },
    {
      id: 4,
      name: "Vikas",
      phone: "9876543213",
      selected: false,
    },
    {
      id: 5,
      name: "Ankit",
      phone: "9876543214",
      selected: false,
    },
  ]);

  // Select / Unselect contact
  const handleSelect = (id) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id
          ? {
            ...contact,
            selected: !contact.selected,
          }
          : contact
      )
    );
  };

  // Create Broadcast
  const handleCreateBroadcast = () => {
    const selectedContacts = contacts.filter(
      (contact) => contact.selected
    );

    if (selectedContacts.length === 0) {
      alert("Please select at least one contact");
      return;
    }

    const broadcastData = {
      type: "broadcast",
      contacts: selectedContacts,
    };

    console.log("Broadcast Data:", broadcastData);

    // Backend API yahan call kar sakte ho
  };

  // Search
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedContacts = contacts.filter(
    (contact) => contact.selected
  );

  return (
    <div>

      {/* Modal */}
      <div className="flex h-[90vh] w-full max-w-md flex-col overflow-hidden bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center gap-4 bg-[#008069] px-5 py-4 text-white">

          <button
            onClick={onClose}
            className="text-2xl transition hover:scale-110"
          >
            ←
          </button>

          <div>
            <h2 className="text-lg font-semibold">
              New Broadcast
            </h2>

            <p className="text-xs text-white/80">
              Select contacts
            </p>
          </div>

        </div>

        {/* Search */}
        <div className="px-5 py-4">

          <div className="flex items-center rounded-lg bg-gray-100 px-3">

            <span className="text-gray-500">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search contacts"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent px-3 py-3 outline-none"
            />

          </div>

        </div>

        {/* Selected Contacts */}
        {selectedContacts.length > 0 && (
          <div className="border-b px-5 pb-4">

            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Selected
              </p>

              <span className="text-xs text-gray-500">
                {selectedContacts.length} selected
              </span>
            </div>

            <div className="flex gap-3 overflow-x-auto">

              {selectedContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="w-14 shrink-0 text-center"
                >

                  <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#d9fdd3] text-xl">

                    👤

                    <button
                      type="button"
                      onClick={() =>
                        handleSelect(contact.id)
                      }
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
                    >
                      ×
                    </button>

                  </div>

                  <p className="mt-1 truncate text-xs text-gray-600">
                    {contact.name}
                  </p>

                </div>
              ))}

            </div>

          </div>
        )}

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto px-3 py-2">

          <p className="px-2 py-2 text-sm font-semibold text-gray-500">
            Contacts
          </p>

          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => handleSelect(contact.id)}
              className="flex cursor-pointer items-center gap-3 rounded-xl p-3 transition hover:bg-gray-100"
            >

              {/* Avatar */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xl">
                👤
              </div>

              {/* Contact Info */}
              <div className="flex-1">

                <h3 className="font-medium text-gray-800">
                  {contact.name}
                </h3>

                <p className="text-xs text-gray-500">
                  {contact.phone}
                </p>

              </div>

              {/* Checkbox */}
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition ${contact.selected
                  ? "border-[#008069] bg-[#008069] text-white"
                  : "border-gray-400"
                  }`}
              >
                {contact.selected && "✓"}
              </div>

            </div>
          ))}

          {filteredContacts.length === 0 && (
            <p className="py-10 text-center text-gray-500">
              No contacts found
            </p>
          )}

        </div>

        {/* Bottom Button */}
        <div className="border-t bg-gray-50 p-4">

          <button
            onClick={handleCreateBroadcast}
            disabled={selectedContacts.length === 0}
            className="w-full rounded-full bg-[#008069] py-3 font-semibold text-white transition hover:bg-[#006e5c] disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Create Broadcast
          </button>

        </div>

      </div>
    </div>
  );
};

export default BroadcastLists;

