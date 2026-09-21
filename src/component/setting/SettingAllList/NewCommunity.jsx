import { useState } from "react";


const NewCommunity = ({ onClose }) => {
  const [communityName, setCommunityName] = useState("");
  const [description, setDescription] = useState("");

  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Family Group",
      members: "12 members",
      selected: true,
    },
    {
      id: 2,
      name: "Friends",
      members: "25 members",
      selected: false,
    },
    {
      id: 3,
      name: "Office Team",
      members: "18 members",
      selected: false,
    },
  ]);

  const toggleGroup = (id) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === id
          ? { ...group, selected: !group.selected }
          : group
      )
    );
  };

  const handleCreateCommunity = (e) => {
    e.preventDefault();

    const selectedGroups = groups.filter((group) => group.selected);

    const communityData = {
      name: communityName,
      description,
      groups: selectedGroups,
    };

    console.log("Community Data:", communityData);

    // API call yahan kar sakte ho
  };

  return (
    <div>

      {/* Main Modal */}
      <div className="w-full max-w-lg overflow-hidden bg-white shadow-2xl">

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
              New Community
            </h2>

            <p className="text-sm text-white/80">
              Create a community
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleCreateCommunity}
          className="max-h-[80vh] overflow-y-auto"
        >

          {/* Community Icon */}
          <div className="flex justify-center py-6">

            <div className="flex h-28 w-28 cursor-pointer items-center justify-center rounded-full bg-gray-200 text-5xl text-gray-500 transition hover:bg-gray-300">
              👥
            </div>

          </div>

          {/* Inputs */}
          <div className="space-y-5 px-6">

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-600">
                Community name
              </label>

              <input
                type="text"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                placeholder="Enter community name"
                required
                className="w-full border-b-2 border-gray-300 px-1 py-2 text-base outline-none transition focus:border-[#008069]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-600">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Community description"
                rows="3"
                className="w-full resize-none rounded-lg border border-gray-300 p-3 outline-none transition focus:border-[#008069]"
              />
            </div>

            {/* Groups */}
            <div>

              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-gray-700">
                  Add groups
                </h3>

                <span className="text-sm text-gray-500">
                  {groups.filter((g) => g.selected).length} selected
                </span>
              </div>

              <div className="space-y-2">

                {groups.map((group) => (
                  <div
                    key={group.id}
                    onClick={() => toggleGroup(group.id)}
                    className="flex cursor-pointer items-center gap-3 rounded-xl p-3 transition hover:bg-gray-100"
                  >

                    {/* Avatar */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d9fdd3] text-xl">
                      👥
                    </div>

                    {/* Group Info */}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">
                        {group.name}
                      </h4>

                      <p className="text-xs text-gray-500">
                        {group.members}
                      </p>
                    </div>

                    {/* Checkbox */}
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${group.selected
                        ? "border-[#008069] bg-[#008069] text-white"
                        : "border-gray-400"
                        }`}
                    >
                      {group.selected && "✓"}
                    </div>

                  </div>
                ))}

              </div>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="mt-6 border-t bg-gray-50 px-6 py-4">

            <button
              type="submit"
              disabled={!communityName.trim()}
              className="w-full rounded-full bg-[#008069] py-3 font-semibold text-white transition hover:bg-[#006e5c] disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Create Community
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default NewCommunity;